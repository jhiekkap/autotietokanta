'use strict';

const Tietokanta = require('./tietokanta');

const henkilonTiedot = henkilo => [+henkilo.henkiloId, henkilo.etunimi, henkilo.sukunimi,
    henkilo.osasto, +henkilo.palkka
];
const henkilonPaivitystiedot = henkilo => [
    henkilo.etunimi, henkilo.sukunimi, henkilo.osasto, +henkilo.palkka, +henkilo.henkiloId
];

//sql-lauseet
const haeKaikkiSql = 'select henkiloId,etunimi,sukunimi,osasto,palkka ' +
    'from henkilo';
const haeHenkiloSql = 'select henkiloId,etunimi,sukunimi,osasto,palkka ' +
    'from henkilo where henkiloId=?';
const lisaaHenkiloSql = 'insert into henkilo' +
    '(henkiloId,etunimi,sukunimi,osasto,palkka) values (?,?,?,?,?)';
const poistaHenkiloSql = 'delete from henkilo where henkiloId=?';
const paivitaHenkiloSql = 'update henkilo set etunimi=?, sukunimi=?, ' +
    'osasto=?, palkka=? where henkiloId=?';


module.exports = class Henkilokanta {
    constructor(optiot = {
            host: 'remotemysql.com',
            port: 3306,
            user: 'G3ASSd95JP',
            password: 'VCVohcxWkg',
            database: 'G3ASSd95JP'
        }) {
            this.henkilot = new Tietokanta(optiot);
        }
        //palauttaa lupauksen
    haeKaikki() {
            return this.henkilot.suoritaKysely(haeKaikkiSql);
        }
        //palauttaa lupauksen
    hae(henkilonumero) {
            return this.henkilot.suoritaKysely(haeHenkiloSql, +henkilonumero);
        }
        //palauttaa lupauksen
    poista(henkilonumero) {
            return this.henkilot.suoritaKysely(poistaHenkiloSql, +henkilonumero);
        }
        //palauttaa lupauksen
    paivita(uusihenkilo) {
            return this.henkilot.suoritaKysely(paivitaHenkiloSql,
                henkilonPaivitystiedot(uusihenkilo));
        }
        //palauttaa lupauksen
    lisaa(uusihenkilo) {
        return this.henkilot.suoritaKysely(lisaaHenkiloSql,
            henkilonTiedot(uusihenkilo));
    }
};