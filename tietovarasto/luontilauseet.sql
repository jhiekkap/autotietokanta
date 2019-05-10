DROP DATABASE IF EXISTS henkilokanta;
CREATE DATABASE henkilokanta;
USE henkilokanta;
CREATE USER IF NOT EXISTS 'saku'@'localhost' IDENTIFIED BY 'salainen';
CREATE TABLE henkilo(
henkiloId INTEGER NOT NULL PRIMARY KEY,
etunimi VARCHAR(20) NOT NULL,
sukunimi VARCHAR(30) NOT NULL,
osasto VARCHAR(15),
palkka DECIMAL(6,2)
);
GRANT ALL PRIVILEGES ON henkilokanta.* TO 'saku'@'localhost';
INSERT INTO henkilo VALUES(1,'Leila','Hökki','atk',3000);
INSERT INTO henkilo VALUES(2,'Pirkko','Puro','hallinto',7000);