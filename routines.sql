create or replace function pad13(n NUMBER)
    return varchar
    is
begin
    return lpad(n, 13, '0');
end pad13;

delete
from Wypozyczenia;
delete
from Uzytkownicy;
delete
from Autorstwo;
delete
from Publikacje;
delete
from Autorzy;

insert into Autorzy(id_autora, nazwisko)
values (1, 'Mickiewicz');
insert into Publikacje(isbn, typ, tytul)
values (pad13(1), 'K', 'Foo');
insert into Egzemplarze(id_egzemplarza, isbn)
values (1, pad13(1));
insert into Autorstwo
values (1, pad13(1));
insert into Uzytkownicy(id_uzytkownika, imie)
values (1, 'Adam');

CREATE OR REPLACE PROCEDURE WypozyczEgzemplarz(isbn Publikacje.isbn%TYPE,
                                               id_egzemplarza Egzemplarze.id_egzemplarza%TYPE)
    IS
BEGIN
    insert into Wypozyczenia(isbn, id_uzytkownika, data_startu, deadline)
    values (isbn, 1, CURRENT_DATE, CURRENT_DATE + INTERVAL '14' DAY);
    update Egzemplarze e set czy_wypozyczony=1 where e.id_egzemplarza = id_egzemplarza;
END WypozyczEgzemplarz;

CREATE OR REPLACE PROCEDURE OddajEgzemplarz(isbn Publikacje.isbn%TYPE,
                                            id_e Egzemplarze.id_egzemplarza%TYPE)
    IS
BEGIN
    update wypozyczenia w
    set DATA_ODDANIA = CURRENT_DATE
    where w.ID_UZYTKOWNIKA = (select ID_UZYTKOWNIKA
                              from ((PUBLIKACJE inner join Egzemplarze using (isbn))
                                       inner join Wypozyczenia w using (isbn))
                              where ID_EGZEMPLARZA = id_e);

    update Egzemplarze e set czy_wypozyczony=0 where e.id_egzemplarza = id_egzemplarza;
END OddajEgzemplarz;


CREATE OR REPLACE FUNCTION ObliczKare(data_startu Wypozyczenia.DATA_ODDANIA%TYPE, data_konca Wypozyczenia.DATA_ODDANIA%TYPE)
RETURN NUMBER
    IS
    vResult NUMBER;
BEGIN
SELECT data_startu - data_konca DAYS into vResult FROM DUAL;
return vResult;
END;
