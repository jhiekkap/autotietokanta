'use strict';

const Tietokanta = require('./tietokanta');

const autonTiedot = auto => [+auto.valmistusnro, auto.nimi, auto.rekisteriNro,
    auto.arvostelu, +auto.varastoLkm
];
const autonPaivitystiedot = auto => [
    auto.nimi, auto.rekisteriNro, auto.arvostelu, +auto.varastoLkm, +auto.valmistusnro
];

//sql-lauseet
const haeKaikkiSql = 'select valmistusnro,nimi,rekisteriNro,arvostelu,varastoLkm ' +
    'from autot';
const haeAutoSql = 'select valmistusnro,nimi,rekisteriNro,arvostelu,varastoLkm ' +
    'from autot where valmistusnro=?';
const lisaaAutoSql = 'insert into autot' +
    '(valmistusnro,nimi,rekisteriNro,arvostelu,varastoLkm) values (?,?,?,?,?)';
const poistaAutoSql = 'delete from autot where valmistusnro=?';
const paivitaAutoSql = 'update autot set nimi=?, rekisteriNro=?, ' +
    'arvostelu=?, varastoLkm=? where valmistusnro=?';


module.exports = class Autokanta {
    constructor(optiot = {
            host: 'remotemysql.com',
            port: 3306,
            user: 'G3ASSd95JP',
            password: 'VCVohcxWkg',
            database: 'G3ASSd95JP'
        }) {
            this.autot = new Tietokanta(optiot);
        }
        //palauttaa lupauksen
    haeKaikki() {
            return this.autot.suoritaKysely(haeKaikkiSql);
        }
        //palauttaa lupauksen
    hae(autonumero) {
            return this.autot.suoritaKysely(haeAutoSql, +autonumero);
        }
        //palauttaa lupauksen
    poista(autonumero) {
            return this.autot.suoritaKysely(poistaAutoSql, +autonumero);
        }
        //palauttaa lupauksen
    paivita(uusiauto) {
            return this.autot.suoritaKysely(paivitaAutoSql,
                autonPaivitystiedot(uusiauto));
        }
        //palauttaa lupauksen
    lisaa(uusiauto) {
        return this.autot.suoritaKysely(lisaaAutoSql,
            autonTiedot(uusiauto));
    }
};