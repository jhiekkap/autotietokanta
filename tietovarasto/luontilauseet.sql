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

-- cd tietovarasto
--mysql.server start
-- mysql -u root -p<luontilauseet.sql

/* remotemysql.com
port:3306,
G3ASSd95JP
VCVohcxWkg

 
host: 'localhost',
port: 3306,
user: 'lars',
password: 'kCp1cjmJ',
database: 'autotietokanta' */
