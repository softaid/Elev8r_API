
var express = require('express');
var router = express.Router();

module.exports = function (BreederReports, oauth, log) {

    // get breederbatch 

    router.get('/search/companyid/:companyid/locationid/:locationid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getAllbreederbatch(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getAllbreederbatch", err);
        }
    });

    // get breederbatch 

    router.get('/search/companyid/:companyid/warehouseid/:warehouseid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getAllbreederbatchbywarehouse(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getAllbreederbatchbywarehouse", err);
        }
    });
    // get breederbatch

    router.get('/select/companyid/:companyid/locationid/:locationid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getLocationwisebreederbatches(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getLocationwisebreederbatches", err);
        }
    });

    //get shed by breederbatchid
    router.get('/selectshed/breederbatchid/:breederbatchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getShedByBatchid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getShedByBatchid", err);
        }
    });



    // get eggscollection batch report
    router.post('/breederreport', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            
            let rows = await BreederReports.getEggscollectionReport(request, request.body);
            let result = JSON.parse(JSON.stringify(rows));
            response.status(200).send(rows);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getEggscollectionReport", err);
        }
    });

    router.get('/breedershedsearch/breederbatchid/:breederbatchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getbreedershed(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getAllbreederbatch", err);
        }
    });

    // get flock detail
    router.get('/report/:breederbatchid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {

            let result = await BreederReports.getFlockDetailReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getFlockDetailReport", err);
        }
    });


    // get eggscollection batch report
    router.post('/dailyBrodGrow/', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await BreederReports.getDailyBrodGrowReport(request, request.body);
            response.send(result);
            
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getEggscollectionReport", err);
        }
    });

    router.post('/flockgatherreport/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getflockgatherReport(request, request.body);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getflockgatherReport", err);
        }
    });
    router.post('/daliyconsumptionReport/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getdailyconsumptionReport(request, request.body);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getdailyconsumptionReport", err);
        }
    });

    router.post('/feedrequiredplan/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getFeddRequiredPlan(request, request.body);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getFeddRequiredPlan", err);
        }
    });
    router.post('/itemWiseConsumption/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getItemWiseDailyConsumptionReport(request, request.body);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getItemWiseDailyConsumptionReport", err);
        }
    });

    router.post('/eggscollectiontilldate/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {

            let result = await BreederReports.getEggscollectiontilldate(request, request.body);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getEggscollectiontilldate", err);
        }
    });
    router.post('/futureeggscollection/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {

            let result = await BreederReports.getFutureEggsCollectionReport(request, request.body);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getFutureEggsCollectionReport", err);
        }
    });
    router.post('/feeddeviationreport/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {

            let result = await BreederReports.getFeedDeviationReport(request, request.body);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getFeedDeviationReport", err);
        }
    });
   

    router.get('/batchwisedailypronconreport/breederbatchid/:breederbatchid/shedid/:shedid/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getbatchwisedailypronconReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getbatchwisedailypronconReport", err);
        }
    });

    router.get('/flockExpencesBeforeWeekReport/batchid/:batchid/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.flockExpencesBefore24WeekReport(request, request.params);
            response.send(result);
            
        }
        catch (err) {
            log.dbErrorLog("BreederReports-flockExpencesBefore24WeekReport", err);
        }
    });

    router.get('/ParentBirdBalance/batchid/:batchid/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await BreederReports.ParentBirdBalanceReport(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-ParentBirdBalanceReport", err);
        }
    });

    router.get('/flocksummary/breederbatchid/:breederbatchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await BreederReports.flocksummaryReport(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-flocksummaryReport", err);
        }
    });

    router.get('/farmperformance/fromdate/:fromdate/todate/:todate/batchid/:batchid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await BreederReports.getFarmPerformanceReport(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getFarmPerformanceReport", err);
        }
    });

    router.get('/flockwisecostanalysis/fromdate/:fromdate/todate/:todate/batchid/:batchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await BreederReports.getFlockWiseCostAnalysisReport(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getFlockWiseCostAnalysisReport", err);
        }
    });

    router.get('/flockwisecostanalysispartone/fromdate/:fromdate/todate/:todate/batchid/:batchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await BreederReports.getFlockWiseCostAnalysisReportPartOne(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getFlockWiseCostAnalysisReportPartOne", err);
        }
    });

    router.get('/parentbirdbalancereportwithalldetail/batchid/:batchid/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await BreederReports.getParentBirdBalanceStockWithAllDetail(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getParentBirdBalanceStockWithAllDetail", err);
        }
    });

    router.get('/shedwisefarmperformancereport/breederbatchid/:breederbatchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getshedwisefarmperformancereport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getshedwisefarmperformancereport", err);
        }
    });

    // Flockwise profit and loss report

    router.get('/batchwiseprofitandloss/:breederbatchid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getbatchwiseprofitandlossReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getbatchwiseprofitandlossReport", err);
        }
    });
	
	// Egg Stock report

    router.get('/eggstock/:fromdate/:todate/:breederbatchids', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getEggStockReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getEggStockReport", err);
        }
    });

    // Batch Valuation report

    router.get('/batchvaluation/:breederbatchid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BreederReports.getBatchValuationReport(request, request.params);
            response.send(result);
	    console.log("**********************result**************************", result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BreederReports-getBatchValuationReport", err);
        }
    });


    return router;
}

