
drop table Wynajem;
drop table Wypozyczenia;
drop table Sale cascade constraints;
drop table Uzytkownicy;
drop table Egzemplarze;
drop table Polki;
drop table Regaly;
drop table Autorstwo;
drop table Publikacje;
drop table Autorzy;

CREATE TABLE Autorzy(
   id_autora NUMBER(6) GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
   nazwisko VARCHAR(50) check(length(nazwisko)>0) NOT NULL,
   imie VARCHAR(50) check(length(imie)>0),
   tytul_naukowy VARCHAR(50) check(length(tytul_naukowy)>0)
);

create TABLE Publikacje (
   isbn varchar(13) PRIMARY KEY check(length(isbn)=13),
   typ VARCHAR(1) NOT NULL,
   tytul VARCHAR(100) NOT NULL CHECK(LENGTH(tytul) > 0),
   gatunek VARCHAR(100),
   temat VARCHAR(50),
   id_czasopisma varchar(13)  constraint fk_czasopismo_artykul references Publikacje(isbn),
   CHECK(typ in ('A', 'C', 'K')) -- Artykuł/Czasopismo/Książka
);

CREATE TABLE Autorstwo(
   id_autora NOT NULL REFERENCES Autorzy(id_autora),
   isbn NOT NULL REFERENCES Publikacje(isbn),
   PRIMARY KEY (id_autora, isbn)
);

CREATE TABLE Regaly (
  kod_regalu VARCHAR2(3) PRIMARY KEY
);

CREATE TABLE Polki(
  nr_polki NUMBER(3, 0) PRIMARY KEY,
  kod_regalu VARCHAR2(3) NOT NULL REFERENCES Regaly(kod_regalu)
);

CREATE TABLE Egzemplarze(
  id_egzemplarza NUMBER(6, 0) GENERATED BY DEFAULT ON NULL AS IDENTITY,
  isbn varchar(13) NOT NULL REFERENCES Publikacje(isbn),
  czy_wypozyczony NUMBER(1,0) DEFAULT ON NULL 0 NOT NULL,
  nr_polki NUMBER(3, 0) REFERENCES Polki(nr_polki),
  CHECK(id_egzemplarza > 0),
  CHECK(czy_wypozyczony in (0, 1)),
  PRIMARY KEY(id_egzemplarza, isbn)
);

CREATE TABLE Uzytkownicy(
  id_uzytkownika varchar2(20) PRIMARY KEY,
  imie VARCHAR2(20),
  nazwisko VARCHAR2(20)
);


CREATE TABLE Sale (
  id_sali NUMBER(3, 0) PRIMARY KEY,
  liczba_miejsc NUMBER(3, 0),
  jest_tablica NUMBER(1, 0),
  CHECK(jest_tablica in (0, 1))
);

CREATE TABLE Wypozyczenia(
   isbn VARCHAR(13) NOT NULL,
   id_egzemplarza NUMBER(6) NOT NULL,
   id_uzytkownika NOT NULL REFERENCES Uzytkownicy(id_uzytkownika),
   data_startu DATE,
   deadline DATE NOT NULL,
   data_oddania DATE,
   wartosc_kary NUMBER(5,2) CHECK(wartosc_kary >= 0),
   czy_splacona NUMBER(1,0) CHECK(czy_splacona in (0, 1)),
   CHECK(deadline >= data_startu),
   CHECK(data_oddania >= data_startu),
   FOREIGN KEY (isbn, id_egzemplarza) REFERENCES Egzemplarze(isbn, id_egzemplarza),
   PRIMARY KEY (isbn, id_egzemplarza, id_uzytkownika, data_startu)
);

CREATE TABLE Wynajem(
   data DATE,
-- czas w minutach od północy
   godz_rozpoczecia NUMBER(4,0) CHECK(godz_rozpoczecia BETWEEN 0 AND 1439),
   deadline NUMBER(4,0) CHECK(deadline BETWEEN 0 AND 1439),
   godz_zakonczenia NUMBER(4,0) CHECK(godz_zakonczenia BETWEEN 0 AND 1439),
   id_uzytkownika NOT NULL REFERENCES Uzytkownicy(id_uzytkownika),
   id_sali NOT NULL REFERENCES Sale(id_sali),
   CHECK(deadline >= godz_rozpoczecia),
   CHECK(godz_zakonczenia >= godz_rozpoczecia),

   PRIMARY KEY(data, godz_rozpoczecia, id_uzytkownika, id_sali)
);

--Sort
CREATE INDEX au_nazwisko_idx
ON Autorzy(nazwisko DESC);
--Foreign Key
CREATE INDEX eg_isbn_idx ON Egzemplarze(isbn);
CREATE INDEX eg_numer_polki_idx ON Egzemplarze(nr_polki);

CREATE INDEX wyp_isbn_idx ON Wypozyczenia(isbn);
CREATE INDEX wyp_id_uzytkownika_idx ON Wypozyczenia(id_uzytkownika);

CREATE  index  wyn_id_uzytkownika_idx ON WYNAJEM(id_uzytkownika);
CREATE  index  wyn_id_sali_idx ON WYNAJEM(id_sali);

CREATE INDEX po_kod_regulu_idx ON Polki (kod_regalu);
CREATE BITMAP INDEX pu_typ_bmp_idx ON Publikacje(typ);
--Laczenie
CREATE BITMAP INDEX eg_pub_idx
ON Egzemplarze(id_egzemplarza)
FROM Egzemplarze e, Publikacje p
WHERE e.isbn = p.isbn;


---------- FUNKCJE I PROCEDURY ----------

-- funkcje pomocnicze
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
-- end funkcje pomocnicze

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

create or replace function ListaAutorow
(iIsbn Publikacje.isbn%TYPE) 
return varchar2 is
lista varchar2(1000);
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
        RAISE_APPLICATION_ERROR(-20001, 'Egzemplarz już wypożyczony');
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
        RAISE_APPLICATION_ERROR(-20002, 'Egzemplarz nie był wypożyczony');
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
        RAISE_APPLICATION_ERROR(-20001, 'Sala jest aktualnie zajęta');
    ELSE
        tmin := current_tmin();
        tmin_end := tmin + n_godz*60;
        if tmin_end > 1439 then
            RAISE_APPLICATION_ERROR(-20003, 'Żądany okres przekracza czas otwacia biblioteki');
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
        RAISE_APPLICATION_ERROR(-20002, 'Sala nie jest aktualnie zajęta przez tego klienta');
    ELSE
        tmin := current_tmin();
        select godz_rozpoczecia, deadline, w.data 
        into tmin_beg, tmin_end, data_wynajmu from Wynajem w
        where 
        w.id_sali=id_s and w.id_uzytkownika=id_u and godz_zakonczenia IS NULL;
        
        select TRUNC(CURRENT_DATE) into data from dual;
        
        if tmin > tmin_end or data > data_wynajmu then
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

-- Pilnuje, żeby dodawana publikacja miała podane wymagane dane
CREATE or replace TRIGGER SprawdzWejscie
   BEFORE INSERT
   ON Publikacje
   FOR EACH ROW
DECLARE

BEGIN
   if :NEW.typ = 'K' then

       if :NEW.gatunek is NULL then
           raise_application_error(-20004, 'Nie podano gatunku');
       else
           :NEW.temat := null;
           :NEW.id_czasopisma := null;
       end if;
   elsif :NEW.typ = 'C' and :NEW.temat is null then
       if :NEW.temat is null then
           raise_application_error(-20004, 'Nie podano tematu');
       else
           :NEW.gatunek := null;
       end if;
   elsif :NEW.typ = 'A' then
       :NEW.gatunek := null;
   end if;
END;
/