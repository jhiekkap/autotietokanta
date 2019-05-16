'use strict';
const path = require('path');
const express = require('express');
const http = require('http');

const app = express();
const portti = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const palvelin = http.createServer(app);

const Autokanta = require('./tietovarasto/autokanta');
const autot = new Autokanta();

const hakureitit = require('./reitit/hakureitit.js')(autot);
const lisaysreitit = require('./reitit/lisaysreitit.js')(autot);
const poistoreitit = require('./reitit/poistoreitit.js')(autot);
//const paivitysreitit = require('./reitit/paivitysreitit.js')(autot);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'nakymat'));

app.use(express.static(path.join(__dirname, 'resurssit')));
app.use(express.urlencoded({ extended: false })); //true????

app.use('/', hakureitit);
app.use('/', lisaysreitit);
app.use('/', poistoreitit);
//app.use('/', paivitysreitit);  


app.get('/', (req, res) => res.render('valikko'));

/* app.get('/kaikki', async (req, res) => {
    try {
        const tulos = await autot.haeKaikki();
        //console.log(tulos);
        res.render('haeKaikki', { autot: tulos.kyselynTulos });
    } catch (virhe) {
        console.log(virhe)
        lahetaKyselyvirhe(res, virhe.message);
    }
}); */

/* app.get('/hae', (req, res) => {
    res.render('haeAuto', {
        paaotsikko: 'Auton haku',
        otsikko: 'Syötä valmistusnumero',
        toiminto: '/hae'
    });
}); */

/* app.post('/hae', async (req, res) => {
    if (!req.body) lahetaVirhe(res, 'ei löydy');
    try {
        const tulos = await autot.hae(req.body.valmistusnro);
        if (tulos.kyselynTulos.length > 0) {
            res.render('hakutulos', { tiedot: tulos.kyselynTulos[0] });
        } else {
            lahetaVirhe(res, 'autoa ei löytynyt');
        }
    } catch (virhe) {
        lahetaKyselyvirhe(res, virhe);
    }
}); */
/* app.get('/poista', (req, res) => {
    res.render('haeAuto', {
        paaotsikko: 'Auton haku',
        otsikko: 'Syötä valmistusnumero',
        toiminto: '/poista'
    });
});
app.post('/poista', async (req, res) => {
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
}); */

/* app.get('/lisaa', (req, res) => {
    res.render('lomake', {
        paaotsikko: 'Auton lisäys',
        otsikko: 'Syötä tiedot',
        nappula: 'Tallenna',
        toiminto: '/lisaa',
        valmistusnro: { arvo: '', vainluku: '' },
        nimi: { arvo: '', vainluku: '' },
        rekisteriNro: { arvo: '', vainluku: '' },
        arvostelu: { arvo: '', vainluku: '' },
        varastoLkm: { arvo: '', vainluku: '' }
    });
}); */
/* app.post('/lisaa', async (req, res) => {
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
}); */
app.get('/paivita', (req, res) => {
    res.render('haeAuto', {
        paaotsikko: 'Auton paivitys',
        otsikko: 'Syötä valmistusnumero',
        toiminto: '/paivita'
    });
}); 

app.post('/paivita', async (req, res) => {

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
        lahetaKyselyvirhe(res, virhe);
    }
}); 
app.post('/muuta', async (req, res) => {
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
 

palvelin.listen(portti, host, () =>
    /*eslint-disable no-console */
    console.log(`Palvelin ${host} palvelee portissa ${portti}.`)
    /*eslint-enable no-console */
);
//apufunktiot
/* function lahetaTila(res, viesti) {
    res.render('tilasivu', { paaotsikko: 'Tila', otsikko: 'Tulos', viesti });
}

function lahetaVirhe(res, virhe) {
    res.render('tilasivu', {
        paaotsikko: 'Virhe',
        otsikko: 'Virhe',
        viesti: virhe
    });
}

function lahetaKyselyvirhe(res, virhe) {
    //tässä virheolio olisi käsitellä.
    lahetaVirhe(res, 'Ohjelmointivirhe.');
} */