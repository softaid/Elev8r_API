
var express = require('express');
var router = express.Router();

module.exports = function (BirdSalesOrder, oauth, log) {
    
    // get all branch wise supervisor
    router.get('/branchid/:branchid/:fromweight/:toweight/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrder.getBranchwiseReadyForSalesBatches(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrder.service - getBranchwiseReadyForSalesBatches", err);
        }
    });

    router.get('/search/:todaydate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrder.getAllBirdSalesOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrder.service-getAllBirdSalesOrder", err);
        }
    });

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrder.getBirdSalesOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrder.service-getBirdSalesOrder", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await BirdSalesOrder.saveBirdSalesOrder(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrder.service-saveBirdSalesOrder", err);
        }

    });
        
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrder.deleteBirdSalesOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrder.service - deleteBirdSalesOrder", err);
        }
    });

    return router;
};