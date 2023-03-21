
var express = require('express');
var router = express.Router();

module.exports = function (cbfdailyconsumption, oauth, log) {

    // save CBF daily consumption detail
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await cbfdailyconsumption.saveCbfDailyConsumption(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailyconsumption.service - saveCbfDailyConsumption", err);
        }  
    });

    // delete CBF daily consumption(feed/medicine/vaccine/vitamin)
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailyconsumption.deleteCbfDailyConsumption(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailyconsumption.service - deleteCbfDailyConsumption", err);
        }
    });

    // get CBF Daily Consumption By CBF Batch Id
    router.get('/:companyid/batchid/:batchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailyconsumption.getCbfDailyConsumptionByCbfBatchId(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailyconsumption-getCbfDailyConsumptionByCbfBatchId", err);
        }
    });

    // issue consumed items for CBF daily transaction
    router.get('/transactionid/:transactionid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let rows = await cbfdailyconsumption.IssueItemsConsumedForTransaction(request, request.params);
           // response.send(result);
           let result = JSON.parse(JSON.stringify(rows))[2][0]; 
           response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailyconsumption - IssueItemsConsumedForTransaction", err);
        }
    });

    return router;
}

