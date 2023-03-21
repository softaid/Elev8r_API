
var express = require('express');
var router = express.Router();

module.exports = function (LayerDailyConsumption, oauth, log) {

    // save layer daily consumption detail
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await LayerDailyConsumption.saveLayerDailyConsumption(request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerDailyConsumption.service - saveLayerDailyConsumption", err);
        }  
    });

    // delete layer daily consumption(feed/medicine/vaccine/vitamin)
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerDailyConsumption.deleteLayerDailyConsumption(request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerDailyConsumption.service - deleteLayerDailyConsumption", err);
        }
    });

    // get layer Daily Consumption By layer Batch Id
    router.get('/:companyid/layerbatchid/:layerbatchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerDailyConsumption.getLayerDailyConsumptionByLayerBatchId(request.params);
            response.send(result);
            console.log("result",result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerDailyConsumption-getLayerDailyConsumptionByLayerBatchId", err);
        }
    });

    // issue consumed items for layer daily transaction
    router.get('/transactionid/:transactionid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let rows = await LayerDailyConsumption.IssueItemsConsumedForTransaction(request.params);
           // response.send(result);
           
           let result = JSON.parse(JSON.stringify(rows))[2][0]; 
           response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerDailyConsumption - IssueItemsConsumedForTransaction", err);
        }
    });
  

    return router;
}

