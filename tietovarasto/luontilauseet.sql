DROP DATABASE IF EXISTS autotietokanta;
CREATE DATABASE autotietokanta;
USE autotietokanta;
CREATE USER IF NOT EXISTS 'lars@localhost' IDENTIFIED BY 'kCp1cjmJ';
CREATE TABLE autot (
valmistusnro integer not null,
nimi varchar(12) not null,
rekisteriNro varchar(7) not null,
arvostelu varchar(8) not null,
varastoLkm integer not null
);
GRANT ALL PRIVILEGES ON autotietokanta.* TO 'lars@localhost';
INSERT INTO autot VALUES(1,'Mersu','ABC-123','*****',20);
INSERT INTO autot VALUES(2,'Mosse','QWE-321','**',7000);


 