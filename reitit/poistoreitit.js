'use strict';

const reitit = require('express').Router();

const { lahetaTila, lahetaVirhe, lahetaKyselyvirhe } = require('./viestikeskus.js');

module.exports = autot => {
    reitit.route('/poista').get((req, res) => {
        res.render('haeAuto', {
            paaotsikko: 'Auton haku',
            otsikko: 'Syötä valmistusnumero',
            toiminto: '/poista'
        });
    }).post(async (req, res) => {
        if (!req.body) lahetaVirhe(res, 'ei löydy');
        try {
            const tulos = await autot.poista(req.body.valmistusnro);
            if (tulos.kyselynTulos.muutetutRivitLkm == 1) {
                lahetaTila(res, 'auto poistettu');
            } else {
                lahetaVirhe(res, 'autoa ei löytynyt');
            }
        } catch (virhe) {
            lahetaKyselyvirhe(res, virhe);
        }
    });
    return reitit;
};
