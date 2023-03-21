
var express = require('express');
var router = express.Router();

module.exports = function (LayerDailyTransaction, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerDailyTransaction.getAllLayerDailyTransaction(request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerDailyTransaction.service - getAllLayerDailyTransaction", err);
        }
    });

    // get layer daily transaction
    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerDailyTransaction.getLayerDailyTransaction(request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerDailyTransaction.service - getLayerDailyTransaction", err);
        }
    });

    // get layer daily consumption
    router.get('/consumption/:layerdailytransactionid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerDailyTransaction.getLayerDailyConsumption(request.params);
            console.log("result : ",result)
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerDailyTransaction.service - getLayerDailyConsumption", err);
        }
    });


    // get shed placement details
    router.get('/shedwiseplacementdetails/:shedid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerDailyTransaction.getLayerShedWisePlacementDetails(request.params);
            response.send(result);
        }
        catch (err) {
            console.log('Error in router : ', err);
            log.dbErrorLog("LayerDailyTransaction.service - getLayerShedWisePlacementDetails", err);
        }
    });

     // get layer culls reasons
     router.get('/layerreasons/:companyid/typeid/:typeid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerDailyTransaction.getLayerCullsOrMortalityReasons(request.params);
            response.send(result);
        }
        catch (err) {
            console.log('Error in router : ', err);
            log.dbErrorLog("LayerDailyTransaction.service - getLayerCullsOrMortalityReasons", err);
        }
    });

    
    // save layer daily transaction
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await LayerDailyTransaction.saveLayerDailyTransaction(request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerDailyTransaction.service - saveLayerDailyTransaction", err);
        }  
    });

     // get Layer Daily Mortality By layer Batch Id
     router.get('/:companyid/layerbatchid/:layerbatchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerDailyTransaction.getLayerDailyMortalityByLayerBatchId(request.params);
          
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerDailyTransaction-getLayerDailyMortalityByLayerBatchId", err);
        }
    });

    
    // update layerbatchbalance table to update live quantity of chicks after daily culls/mortality
    router.post('/transactionid', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await LayerDailyTransaction.updateLayerBatchLiveQuantity(request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerDailyTransaction.service - updateLayerBatchLiveQuantity", err);
        }  
    });

      // issue consumed items for layer daily transaction
      router.get('/week/:week/itemid/:itemid/:layeritemid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
 
        try {
            let result = await LayerDailyTransaction.getfeedstandardsitemwise(request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerDailyTransaction - getfeedstandardsitemwise", err);
        }
    });

    return router;
}

