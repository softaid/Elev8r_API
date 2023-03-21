
var express = require('express');
var router = express.Router();

module.exports = function (BirdSalesOrder, oauth, log) {

    
    // get all branch wise supervisor
    router.get('/modulelocationwise/:moduleid/:locationid/:fromweight/:toweight/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrder.getModuleWiseBtches(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrder.service - getModuleWiseBtches", err);
        }
    });

    router.get('/search/:todaydate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrder.getAllBreederBirdSalesOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrder.service-getAllBirdSalesOrder", err);
        }
    });

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrder.getBreederBirdSalesOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrder.service-getBreederBirdSalesOrder", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await BirdSalesOrder.saveBreederBirdSalesOrder(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrder.service-saveBreederBirdSalesOrder", err);
        }

    });
  
    return router;
};