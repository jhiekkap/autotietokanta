'use strict';

function lahetaTila(res, viesti) {
    res.render('tilasivu', { paaotsikko: 'Tila', otsikko: 'Tulos', viesti });
}
function lahetaVirhe(res, virhe) {
    res.render('tilasivu', { paaotsikko: 'Virhe', otsikko: 'Virhe', viesti: virhe });
}
function lahetaKyselyvirhe(res, virhe) {
    //tässä virheolio olisi hyvä käsitellä. 
    lahetaVirhe(res, 'Ohjelmointivirhe.' + virhe);
}
module.exports = { lahetaTila, lahetaVirhe, lahetaKyselyvirhe };
