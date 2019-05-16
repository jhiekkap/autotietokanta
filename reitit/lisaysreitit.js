'use strict';

const reitit = require('express').Router();

const { lahetaTila, lahetaVirhe, lahetaKyselyvirhe } = require('./viestikeskus.js');

module.exports = autot => {

    reitit.route('/lisaa').get((req, res) => { 
        res.render('lomake', { 
            paaotsikko: 'Auton lisäys',
            otsikko: 'Syötä tiedot',
            toiminto: '/lisaa',
            nappula: 'Tallenna',
            valmistusnro: { arvo: '', vainluku: '' },
            nimi: { arvo: '', vainluku: '' },
            rekisteriNro: { arvo: '', vainluku: '' },
            arvostelu: { arvo: '', vainluku: '' },
            varastoLkm: { arvo: '', vainluku: '' }
        });
    }).post(async (req, res) => {
        if (!req.body) lahetaVirhe(res, 'ei löydy');
        try {
            const tulos = await autot.lisaa(req.body);
            if (tulos.kyselynTulos.muutetutRivitLkm == 1) {
                lahetaTila(res, 'Auto lisätty');
            } else {
                lahetaVirhe(res, 'autoa ei lisätty');
            }
        } catch (virhe) {
            lahetaKyselyvirhe(res, virhe);
        }
    });
    return reitit;
};
