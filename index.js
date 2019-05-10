'use strict';
const path = require('path');
const express = require('express');
const http = require('http');
const app = express();
const portti = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const palvelin = http.createServer(app);
const Henkilokanta = require('./tietovarasto/henkilokanta');
const henkilot = new Henkilokanta();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'nakymat'));
app.use(express.static(path.join(__dirname, 'resurssit')));
app.use(express.urlencoded({ extended: true})); //false????
app.get('/', (req, res) => res.render('valikko'));
app.get('/kaikki', async(req, res) => {
    try {
        const tulos = await henkilot.haeKaikki();
        //console.log(tulos);
        res.render('haeKaikki', { henkilot: tulos.kyselynTulos });
    } catch (virhe) {
        lahetaKyselyvirhe(res, virhe.message);
    }
});
app.get('/hae', (req, res) => {
    res.render('haeHenkilo', {
        paaotsikko: 'Henkilön haku',
        otsikko: 'Syötä henkiloId',
        toiminto: '/hae'
    });
});

app.post('/hae', async(req, res) => {
    if (!req.body) lahetaVirhe(res, 'ei löydy');
    try {
        const tulos = await henkilot.hae(req.body.henkiloId);
        if (tulos.kyselynTulos.length > 0) {
            res.render('hakutulos', {tiedot: tulos.kyselynTulos[0]});
        } else {
            lahetaVirhe(res, 'henkilöä ei löytynyt');
        }
    } catch (virhe) {
        lahetaKyselyvirhe(res, virhe);
    }
});
app.get('/poista', (req, res) => {
    res.render('haeHenkilo', {
        paaotsikko: 'Henkilön haku',
        otsikko: 'Syötä henkiloId',
        toiminto: '/poista'
    });
});
app.post('/poista', async(req, res) => {
    if (!req.body) lahetaVirhe(res, 'ei löydy');
    try {
        const tulos = await henkilot.poista(req.body.henkiloId);
        if (tulos.kyselynTulos.muutetutRivitLkm == 1) {
            lahetaTila(res, 'henkilo poistettu');
        } else {
            lahetaVirhe(res, 'henkilöä ei löytynyt');
        }
    } catch (virhe) {
        lahetaKyselyvirhe(res, virhe);
    }
});

app.get('/lisaa', (req, res) => {
    res.render('lomake', {
        paaotsikko: 'Henkilön lisäys',
        otsikko: 'Syötä tiedot',
        nappula: 'Tallenna',
        toiminto: '/lisaa',
        henkiloId: { arvo: '', vainluku: '' },
        etunimi: { arvo: '', vainluku: '' },
        sukunimi: { arvo: '', vainluku: '' },
        osasto: { arvo: '', vainluku: '' },
        palkka: { arvo: '', vainluku: '' }
    });
});
app.post('/lisaa', async(req, res) => {
    if (!req.body) lahetaVirhe(res, 'ei löydy');
    try {
        const tulos = await henkilot.lisaa(req.body);
        if (tulos.kyselynTulos.muutetutRivitLkm == 1) {
            lahetaTila(res, 'Henkilö lisätty');
        } else {
            lahetaVirhe(res, 'henkilöä ei lisätty');
        }
    } catch (virhe) {
        lahetaKyselyvirhe(res, virhe);
    }
});
app.get('/paivita', (req, res) =>{
    res.render('haeHenkilo', {
        paaotsikko: 'Henkilön paivitys',
        otsikko: 'Syötä henkiloId',
        toiminto: '/paivita'
    });
});

app.post('/paivita', async (req, res) => {

    if (!req.body) lahetaVirhe(res, 'ei löydy');
    try {
        const tulos = await henkilot.hae(req.body.henkiloId);
        
        if (tulos.kyselynTulos.length > 0) {
            //res.render('hakutulos', {tiedot: tulos.kyselynTulos[0]});
            console.log(tulos);
            const arvot = tulos.kyselynTulos[0];
            res.render('lomake', {
                paaotsikko: 'Henkilön lisäys',
                otsikko: 'Päivitä tiedot',
                nappula: 'Päivitä',
                toiminto: '/muuta',
                henkiloId: { arvo: arvot.henkiloId, vainluku: '' },
                etunimi: { arvo: arvot.etunimi, vainluku: '' },
                sukunimi: { arvo: arvot.sukunimi, vainluku: '' },
                osasto: { arvo: arvot.osasto, vainluku: '' },
                palkka: { arvo: arvot.palkka, vainluku: '' }
            });

        } else {
            lahetaVirhe(res, 'henkilöä ei löytynyt');
        }
    } catch (virhe) {
        lahetaKyselyvirhe(res, virhe);
    }
});
app.post('/muuta', async(req, res) => {
    if (!req.body) lahetaVirhe(res, 'ei löydy');
    try {
        const tulos = await henkilot.paivita(req.body);
        if (tulos.kyselynTulos.muutetutRivitLkm == 1) {
            lahetaTila(res, 'Henkilö päivitetty');
        } else {
            lahetaVirhe(res, 'henkilöä ei päivitetty');
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
function lahetaTila(res, viesti) {
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
}