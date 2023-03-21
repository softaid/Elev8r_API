
var express = require('express');
var router = express.Router();

module.exports = function (FinancialYearDocSeries, oauth, log) {

    router.get('/search/:settingid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FinancialYearDocSeries.getAllFinancialYearDocSeries(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FinancialYearDocSeries-getAllFinancialYearDocSeries", err);
        }
    });

    router.get('/list/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FinancialYearDocSeries.getValidFinancialYearList(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FinancialYearDocSeries-getValidFinancialYearList", err);
        }
    });


    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FinancialYearDocSeries.getFinancialYearDocSeries(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FinancialYearDocSeries-getFinancialYearDocSeries", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await FinancialYearDocSeries.saveFinancialYearDocSeries(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("FinancialYearDocSeries-saveFinancialYearDocSeries", err);
        }
    });
        
   

    return router;
}

