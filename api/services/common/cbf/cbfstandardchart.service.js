
var express = require('express');
var router = express.Router();

module.exports = function (CbfStandardChart, oauth, log) {

    router.get('/search/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfStandardChart.getAllCbfStandardChart(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfStandardChart-getAllCbfStandardChart", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfStandardChart.getCbfStandardChart(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfStandardChart-getCbfStandardChart", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await CbfStandardChart.saveCbfStandardChart(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfStandardChart-saveCbfStandardChart", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfStandardChart.deleteCbfStandardChart(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfStandardChart-deleteCbfStandardChart", err);
        }
    });

    return router;
}


