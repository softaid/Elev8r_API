
var express = require('express');
var router = express.Router();

module.exports = function (LayerReports, oauth, log) {

        // get layerbatch 
       
        router.get('/search/companyid/:companyid/locationid/:locationid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await LayerReports.getAlllayerbatch(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("LayerReports-getAlllayerbatch", err);
            }
        });
        // get layerbatch

        router.get('/select/companyid/:companyid/locationid/:locationid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await LayerReports.getLocationwiselayerbatches(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("LayerReports-getLocationwiselayerbatches", err);
            }
        });

        //get shed by layerbatchid
        router.get('/selectshed/layerbatchid/:layerbatchid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await LayerReports.getLayerShedByBatchid(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("LayerReports-getLayerShedByBatchid", err);
            }
        });

       

    // get layereggscollection batch report
     router.post('/layerreport', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await LayerReports.getLayerEggscollectionReport(request, request.body);
            let result = JSON.parse(JSON.stringify(rows)); 
            response.status(200).send(rows);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getLayerEggscollectionReport", err);
        }  
    });

    router.get('/layershedsearch/layerbatchid/:layerbatchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerReports.getlayershed(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getlayershed", err);
        }
    });

    // get flock detail
    router.get('/LayerFlockDetailReport/:layerbatchid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerReports.getLayerFlockDetailReport(request, request.params);
   
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getLayerFlockDetailReport", err);
        }
    });

    
    // get eggscollection batch report
    router.post('/layerdailyBrodGrow/', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let result = await LayerReports.getLayerDailyBrodGrowReport(request, request.body);
            response.send(result); 
            // response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getEggscollectionReport", err);
        }  
    });

    router.post('/layerflockgatherreport/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let result = await LayerReports.getlayerflockgatherReport(request, request.body);
            response.send(result);
            
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getlayerflockgatherReport", err);
        }  
    });
    router.post('/layerdaliyconsumptionReport/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let result = await LayerReports.getlayerdailyconsumptionReport(request, request.body);
            response.send(result);

        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getlayerdailyconsumptionReport", err);
        }  
    });
    
    router.post('/layerfeeddeviationreport/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            
            let result = await LayerReports.getLayerFeedDeviationReport(request, request.body);
            response.send(result);

        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getLayerFeedDeviationReport", err);
        }  
    });

    router.post('/itemWiseLyrConsumption/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let result = await LayerReports.getItemWiseLyrDailyConsumptionReport(request, request.body);
            response.send(result);

        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getItemWiseLyrDailyConsumptionReport", err);
        }  
    });

    router.post('/lyreggscollectiontilldate/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            
            let result = await LayerReports.getLyrEggscollectiontilldate(request, request.body);
            response.send(result);

        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getLyrEggscollectiontilldate", err);
        }  
    });
    router.post('/lyrfutureeggscollection/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            
            let result = await LayerReports.getLyrFutureEggsCollectionReport(request, request.body);
            response.send(result);

        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getLyrFutureEggsCollectionReport", err);
        }  
    });

    router.get('/parentbirdbalancereportwithalldetail/batchid/:batchid/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await LayerReports.getParentBirdBalanceStockWithAllDetail(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getParentBirdBalanceStockWithAllDetail", err);
        }
    });

	router.get('/parentbirdbalancereport/batchid/:batchid/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await LayerReports.getParentBirdBalance(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getParentBirdBalance", err);
        }
    });

    router.get('/flockexpencesbefore19weekreport/batchid/:batchid/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await LayerReports.getFlockExpencesBefore19Week(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getFlockExpencesBefore19Week", err);
        }
    });

    router.get('/flockwisecostanalysisreport/fromdate/:fromdate/todate/:todate/batchid/:batchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await LayerReports.getFlockWisecostanalysisReport(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getFlockWisecostanalysisReport", err);
        }
    });

    router.get('/flockwisecostanalysispartonereport/fromdate/:fromdate/todate/:todate/batchid/:batchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await LayerReports.getFlockWisecostanalysispartoneReport(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getFlockWisecostanalysispartoneReport", err);
        }
    });

    router.get('/layerbatchdetaildatareport/fromdate/:fromdate/todate/:todate/layerbatchid/:layerbatchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await LayerReports.getBatchDetailData(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getBatchDetailData", err);
        }
    });

    router.get('/search/companyid/:companyid/warehouseid/:warehouseid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerReports.getAlllayerbatchbywarehouse(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getAlllayerbatchbywarehouse", err);
        }
    });

    router.get('/layerflocksummary/batchid/:batchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            
        try {
            let result = await LayerReports.layerflocksummaryReport(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-layerflocksummaryReport", err);
        }
    });



    // Flockwise profit and loss report

    router.get('/layerbatchwiseprofitandloss/:layerbatchid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerReports.getlayerbatchwiseprofitandlossReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getlayerbatchwiseprofitandlossReport", err);
        }
    });
	

    // Layer Batch Valuation report

    router.get('/layerbatchvaluation/:layerbatchid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LayerReports.getLayerBatchValuationReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LayerReports-getLayerBatchValuationReport", err);
        }
    });

    

    

    return router;
}

