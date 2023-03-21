var express = require('express');
var router = express.Router();

module.exports = function (ProcessingReport, oauth, log) {

    

    router.get('/search/fromdate/:fromdate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProcessingReport.getAllInputItems(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProcessingReport-getAllInputItems", err);
        }
    });

    router.get('/search/fromdate/:fromdate/:todate/:inputitems/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProcessingReport.getAllInputBatches(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProcessingReport-getAllInputBatches", err);
        }
    });


     // get all PurchaseInvoice
     router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProcessingReport.getAllOutputitems(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProcessingReport-getAllOutputitems", err);
        }
    });

   
    router.get('/search/fromdate/:fromdate/:todate/:inputitems/:inputitembatches/:outputitems/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProcessingReport.getProcessingRegisterReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProcessingReport-getProcessingRegisterReport", err);
        }
    });

    router.get('/search/livebird/:moduleid/:itemid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProcessingReport.getProcessingLiveBirdDetailReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProcessingReport-getProcessingLiveBirdDetailReport", err);
        }
    });

    router.get('/itemwisestockweaightwisereport/fromdate/:fromdate/todate/:todate/itemid/:itemid/warehouseids/:warehouseids/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProcessingReport.getItemWiseStockReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProcessingReport-getItemWiseStockReport", err);
        }
    });

   
   
    return router;

}