create or replace function pad13(n NUMBER)
    return varchar
    is
begin
    return lpad(n, 13, '0');
end pad13;
/
create or replace function current_tmin
    return varchar
    is
ret NUMBER(4);
begin
    select extract(hour from current_timestamp)*60+extract(minute from current_timestamp) into ret from dual;
    return ret;
end current_tmin;
/

create or replace function ListaAutorow
(iIsbn Publikacje.isbn%TYPE) 
return varchar2 is
lista varchar2(256);
begin
    select listagg(
    decode(tytul_naukowy, NULL, '', tytul_naukowy||' ')||
    nazwisko||
    decode(imie, NULL, '', ' '||substr(imie, 1, 1)||'.'), ', ')
    within group(order by nazwisko) into lista 
    from Autorstwo s join Autorzy r on s.id_autora=r.id_autora
    group by isbn having isbn=iIsbn;
    return lista;
end;
/

CREATE OR REPLACE PROCEDURE WypozyczEgzemplarz(isbn Publikacje.isbn%TYPE,
                                               id_e Egzemplarze.id_egzemplarza%TYPE,
                                               id_u Uzytkownicy.id_uzytkownika%TYPE)
IS
    cw NUMBER(1);
BEGIN
    SELECT czy_wypozyczony INTO cw FROM Egzemplarze WHERE id_egzemplarza=id_e;
    IF cw=1 THEN
        dbms_output.put_line('Egzemplarz już wypożyczony');
    ELSE 
        insert into Wypozyczenia(isbn, id_egzemplarza, id_uzytkownika, data_startu, deadline)
        values (isbn, id_e, id_u, CURRENT_DATE, CURRENT_DATE + INTERVAL '14' DAY);
        update Egzemplarze e set czy_wypozyczony=1 where e.id_egzemplarza = id_e;
    END IF;
END WypozyczEgzemplarz;
/
CREATE OR REPLACE PROCEDURE OddajEgzemplarz(isbn Publikacje.isbn%TYPE,
                                            id_e Egzemplarze.id_egzemplarza%TYPE,
                                            id_u Uzytkownicy.id_uzytkownika%TYPE)
IS
    cw NUMBER(1);
BEGIN
    SELECT czy_wypozyczony INTO cw FROM Egzemplarze WHERE id_egzemplarza=id_e;
    IF cw=0 THEN
        dbms_output.put_line('Egzemplarz nie był wypożyczony');
    ELSE 
        update wypozyczenia w
        set DATA_ODDANIA = CURRENT_DATE,
        w.wartosc_kary = ObliczKare(w.data_startu, CURRENT_DATE)
        where w.id_uzytkownika = id_u 
        and w.isbn=isbn
        and w.id_egzemplarza = id_e 
        and w.data_oddania IS NULL;

        update Egzemplarze e set czy_wypozyczony=0 where e.id_egzemplarza = id_egzemplarza;
    END IF;
END OddajEgzemplarz;
/

CREATE OR REPLACE FUNCTION ObliczKare(data_startu DATE, data_konca DATE)
RETURN NUMBER
    IS
    vResult NUMBER(4,2);
BEGIN
SELECT data_konca - data_startu DAYS into vResult FROM DUAL;
if vResult <= 14 then
    return 0;
else
    return (vResult-14) * 0.20;
end if;
END;
/

CREATE OR REPLACE PROCEDURE WynajmijSale(id_s Sale.id_sali%TYPE,
                                         id_u Uzytkownicy.id_uzytkownika%TYPE,
                                         n_godz NUMBER)
IS
    cw NUMBER(1);
    tmin NUMBER(4);
    tmin_end NUMBER(4);
BEGIN
    SELECT count(*) INTO cw FROM Wynajem w WHERE w.id_sali = id_s AND godz_zakonczenia IS NULL;
    IF cw>0 THEN
        dbms_output.put_line('Sala jest aktualnie zajęta');
    ELSE
        tmin := current_tmin();
        tmin_end := tmin + n_godz*60;
        if tmin_end > 1439 then
            dbms_output.put_line('Żądany okres przekracza czas otwacia biblioteki');
        else
            insert into Wynajem(id_sali, id_uzytkownika, data, godz_rozpoczecia, deadline)
            values (id_s, id_u, CURRENT_DATE, tmin, tmin_end);
        end if;
    END IF;
END WynajmijSale;
/

CREATE OR REPLACE PROCEDURE OddajSale(id_s Sale.id_sali%TYPE,
                                      id_u Uzytkownicy.id_uzytkownika%TYPE)
IS
    cw NUMBER(1);
    tmin NUMBER(4);
    tmin_beg NUMBER(4);
    tmin_end NUMBER(4);
    data_wynajmu DATE;
    data DATE;
BEGIN
    SELECT count(*) INTO cw FROM Wynajem w 
    WHERE w.id_sali = id_s 
    AND godz_zakonczenia IS NULL
    AND id_uzytkownika=id_u;
    IF cw < 1 THEN
        dbms_output.put_line('Sala nie jest aktualnie zajęta przez tego klienta');
    ELSE
        tmin := current_tmin();
        select godz_rozpoczecia, deadline, w.data 
        into tmin_beg, tmin_end, data_wynajmu from Wynajem w
        where 
        w.id_sali=id_s and w.id_uzytkownika=id_u and godz_zakonczenia IS NULL;
        
        select TRUNC(CURRENT_DATE) into data from dual;
        
        if tmin > tmin_end or data > data_wynajmu then
            dbms_output.put_line('Uwaga. Czas wynajmu był przekroczony. ');
            if tmin < tmin_beg then
                tmin := 1439;
            end if;
        end if;
        
        update Wynajem w
        set godz_zakonczenia=tmin
        where 
        w.id_sali=id_s and w.id_uzytkownika=id_u and godz_zakonczenia IS NULL;
    END IF;
END OddajSale;
/

CREATE or replace TRIGGER SprawdzWejscie
   BEFORE INSERT
   ON Publikacje
   FOR EACH ROW
DECLARE
   exception_name EXCEPTION;
   PRAGMA EXCEPTION_INIT (exception_name, -20001);

BEGIN
   if :NEW.typ = 'K' then

       if :NEW.gatunek is NULL then
           raise_application_error(-20001, 'Nie podano gatunku');
       else
           :NEW.temat := null;
           :NEW.id_czasopisma := null;
       end if;
   elsif :NEW.typ = 'C' and :NEW.temat is null then
       if :NEW.temat is null then
           raise_application_error(-20001, 'Nie podano tematu');
       else
           :NEW.gatunek := null;
       end if;
   elsif :NEW.typ = 'A' then
       :NEW.gatunek := null;
   end if;
END;
/

delete from Wypozyczenia;
delete from Autorstwo;
delete from Autorzy;
delete from Egzemplarze;
delete from Publikacje;
delete from Wynajem;
delete from Uzytkownicy;
delete from Sale;

insert into Autorzy(id_autora, nazwisko, imie)
values (1, 'Mickiewicz', NULL);
insert into Autorzy(id_autora, nazwisko, imie, tytul_naukowy)
values (2, 'Slowacki', 'Juliusz', 'prof.');
insert into Publikacje(isbn, typ, tytul, gatunek)
values (pad13(1), 'K', 'Ksiazka', 'fantastyka');
insert into Egzemplarze(id_egzemplarza, isbn)
values (1, pad13(1));
insert into Autorstwo
values (1, pad13(1));
insert into Autorstwo
values (2, pad13(1));
insert into Uzytkownicy
values ('user1', 'Adam', 'Nowak');
insert into Sale(id_sali) values (1);

set serveroutput on;
declare
lista varchar2(256);
begin
    lista := ListaAutorow(pad13(1));
    dbms_output.put_line(lista);
end;
/
exec WypozyczEgzemplarz(pad13(1), 1, 'user1');
update Wypozyczenia set data_startu=(CURRENT_DATE - 20);
exec OddajEgzemplarz(pad13(1), 1, 'user1');