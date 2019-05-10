DROP DATABASE IF EXISTS autotietokanta;
CREATE DATABASE autotietokanta;
USE autotietokanta;
CREATE USER IF NOT EXISTS 'lars'@'localhost' IDENTIFIED BY 'kCp1cjmJ';
CREATE TABLE autot (
valmistusnro integer not null,
nimi varchar(12) not null,
rekisteriNro varchar(6) not null,
arvostelu varchar(8) not null,
varastoLkm integer not null
);
GRANT ALL PRIVILEGES ON autotietokanta.* TO 'lars'@'localhost';
INSERT INTO autot VALUES(1,'Mersu','ABC-123','*****',20);
INSERT INTO autot VALUES(2,'Mosse','QWE-321','**',7000);




USE G3ASSd95JP;
CREATE USER IF NOT EXISTS 'G3ASSd95JP' IDENTIFIED BY 'VCVohcxWkg';
CREATE TABLE autot (
valmistusnro integer not null,
nimi varchar(12) not null,
rekisteriNro varchar(6) not null,
arvostelu varchar(8) not null,
varastoLkm integer not null
);
GRANT ALL PRIVILEGES ON henkilokanta.* TO 'G3ASSd95JP';
INSERT INTO autot VALUES(1,'Mersu','ABC-123','*****',20);
INSERT INTO autot VALUES(2,'Mosse','QWE-321','**',7000);

Username: G3ASSd95JP

Password: VCVohcxWkg

Database Name: G3ASSd95JP

Server: remotemysql.com

Port: 3306