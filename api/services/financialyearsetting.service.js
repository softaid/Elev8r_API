
var express = require('express');
var router = express.Router();

module.exports = function (FinancialYearSetting, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FinancialYearSetting.getAllFinancialYearSetting(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FinancialYearSetting-getAllFinancialYearSetting", err);
        }
    });

    router.get('/list/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FinancialYearSetting.getValidFinancialYearList(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FinancialYearSetting-getValidFinancialYearList", err);
        }
    });


    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FinancialYearSetting.getFinancialYearSetting(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FinancialYearSetting-getFinancialYearSetting", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await FinancialYearSetting.saveFinancialYearSetting(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("FinancialYearSetting-saveFinancialYearSetting", err);
        }
    });
        
   

    return router;
}

