
var express = require('express');
var router = express.Router();

module.exports = function (chartofaccount, oauth, log) {

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await chartofaccount.saveChartOfAccount(request, request.body);
            console.log("save result : ",JSON.parse(JSON.stringify(rows))[2][0]);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chartofaccount.service-saveChartOfAccount", err);
        }

    });

    router.get('/search/:companyid/:categoryid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chartofaccount.getAllCOA(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chartofaccount.service-getAllCOA", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chartofaccount.getCOA(request, request.params);
            console.log("result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chartofaccount.service-getCOA", err);
        }
    });

    //get coa groups
    router.get('/:categoryid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chartofaccount.getCOAGroups(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chartofaccount.service-getCOAGroups", err);
        }
    });

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chartofaccount.deleteCOA(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chartofaccount.service - deleteCOA", err);
        }
    });

    router.get('/searchledgers/:categoryid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chartofaccount.getCategorywiseLedgers(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chartofaccount.service-getCategorywiseLedgers", err);
        }
    });

    router.get('/getledgers/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chartofaccount.getLedgersWithNoControlAccount(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chartofaccount.service-getLedgersWithNoControlAccount", err);
        }
    });

    //get cash ledgers
    router.get('/getcashledgers/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chartofaccount.getAllCashLedgers(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chartofaccount.service-getAllCashLedgers", err);
        }
    });

    router.get('/Allledgers/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chartofaccount.getAllLedgers(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chartofaccount.service-getAllLedgers", err);
        }
    });

    return router;
}

