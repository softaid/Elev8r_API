
var express = require('express');
var router = express.Router();

module.exports = function (cbfgrowingcharges, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfgrowingcharges.getAllGrowingChargesRecords(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfgrowingcharges.service-getAllGrowingChargesRecords", err);
        }
    });

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfgrowingcharges.getGrowingChargesRecord(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfgrowingcharges.service-getGrowingChargesRecord", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await cbfgrowingcharges.saveGrowingChargesRecord(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfgrowingcharges.service-saveGrowingChargesRecord", err);
        }

    });
        
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfgrowingcharges.deleteGrowingChargesRecord(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfgrowingcharges.service - deleteGrowingChargesRecord", err);
        }
    });

    router.get('/getdetails/:cbf_batchid/:applyschemefeedcost/:applyschememedicinecost/:applyschemevaccinecost/:editdeductionvalues/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfgrowingcharges.getGrowingChargeDetailsByBatchId(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfgrowingcharges.service-getGrowingChargeDetailsByBatchId", err);
        }
    });

    // book invoice

    router.get('/bookinvoice/:growingchargeid/:cbf_batchid/:companyid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfgrowingcharges.bookInvoice(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfgrowingcharges.service-bookInvoice", err);
        }
    });

    return router;
};