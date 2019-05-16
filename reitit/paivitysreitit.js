'use strict'; 
const reitit = require('express').Router();

const { lahetaTila } = require('./viestikeskus.js');

module.exports = autot => {

    reitit.route('/paivita').get((req, res) => {
        res.render('haeAuto', {
            paaotsikko: 'Auton paivitys',
            otsikko: 'Syötä valmistusnumero',
            toiminto: '/paivita'
        });
    }).post(async (req, res) => { 
        if (!req.body) lahetaVirhe(res, 'ei löydy');
        try {
            const tulos = await autot.hae(req.body.valmistusnro);

            if (tulos.kyselynTulos.length > 0) {
                //res.render('hakutulos', {tiedot: tulos.kyselynTulos[0]});
                console.log(tulos);
                const arvot = tulos.kyselynTulos[0];
                res.render('lomake', {
                    paaotsikko: 'Auton lisäys',
                    otsikko: 'Päivitä tiedot',
                    nappula: 'Päivitä',
                    toiminto: '/muuta',
                    valmistusnro: { arvo: arvot.valmistusnro, vainluku: '' },
                    nimi: { arvo: arvot.nimi, vainluku: '' },
                    rekisteriNro: { arvo: arvot.rekisteriNro, vainluku: '' },
                    arvostelu: { arvo: arvot.arvostelu, vainluku: '' },
                    varastoLkm: { arvo: arvot.varastoLkm, vainluku: '' }
                });

            } else {
                lahetaVirhe(res, 'autoa ei löytynyt');
            }
        } catch (virhe) {
            console.log('ERROR!!!', virhe);
            lahetaKyselyvirhe(res, virhe);
        }
    });


    reitit.post('/muuta', async (req, res) => {
        if (!req.body) lahetaVirhe(res, 'ei löydy');
        try {
            const tulos = await autot.paivita(req.body);
            if (tulos.kyselynTulos.muutetutRivitLkm == 1) {
                lahetaTila(res, 'Auto päivitetty');
            } else {
                lahetaVirhe(res, 'autoa ei päivitetty');
            }
        } catch (virhe) {
            lahetaKyselyvirhe(res, virhe);
        }
    });
    return reitit;
};
