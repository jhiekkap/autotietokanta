'use strict';
const { lahetaVirhe, lahetaKyselyvirhe } = require('./viestikeskus.js');
const reitit = require('express').Router();

module.exports = autot => {

    reitit.get('/kaikki', async (req, res) => {
        try {
            const tulos = await autot.haeKaikki();
            res.render('haeKaikki', {
                paaotsikko: 'Kaikki autot',
                otsikko: 'Kaikki autot',
                autot: tulos.kyselynTulos
            });
        } catch (virhe) {
            lahetaKyselyvirhe(res, virhe.message);
        }
    });
    reitit.route('/hae').get((req, res) => {
        res.render('haeauto', {
            paaotsikko: 'auton haku',
            otsikko: 'Syötä valmistusnumero',
            toiminto: '/hae'
        });
    }).post(async (req, res) => {
        if (!req.body) lahetaVirhe(res, 'ei löydy');
        try {
            const tulos = await autot.hae(req.body.valmistusnro); 
            if (tulos.kyselynTulos.length > 0) {
                res.render('hakutulos', {
                    paaotsikko: 'Tulos',
                    otsikko: 'Haetut tiedot',
                    tiedot: tulos.kyselynTulos[0]
                });
            } else {
                lahetaVirhe(res, 'autoa ei löytynyt');
            }
        } catch (virhe) {
            lahetaKyselyvirhe(res, virhe);
        }
    });

    return reitit;
};

