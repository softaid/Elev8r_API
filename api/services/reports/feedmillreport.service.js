var express = require('express');
var router = express.Router();

module.exports = function (FeedMillReports, oauth, log) {

        // get breederbatch 
       
        router.get('/search/itemid/:itemid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getAllItems(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getAllItems", err);
            }
        });


        // FeedMill AcknowledgementSlip Report Service

        router.get('/search/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getAcknowledgementSlipRegisterReport(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getAcknowledgementSlipRegisterReport", err);
            }
        });

        router.get('/weightslipsearch/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getWeightSlipRegisterReport(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getWeightSlipRegisterReport", err);
            }
        });

        router.get('/testregistersearch/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getTestResultRegisterReport(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getTestResultRegisterReport", err);
            }
        });

        router.get('/warehousesearch/branchid/:branchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getWarehouseByBranchnameReport(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getWarehouseByBranchnameReport", err);
            }
        });

          router.get('/warehousebinsearch/warehouseid/:warehouseid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getWarehousebinByWarehouseid(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getWarehousebinByWarehouseid", err);
            }
        });

        router.get('/itemsearch/warehousebinid/:warehousebinid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getitemByWarehousebinid(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getitemByWarehousebinid", err);
            }
        });

        router.get('/godownstocksearch/fromdate/:fromdate/todate/:todate/warehouseid/:warehouseid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getDataForDailyGodownStockReport(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getDataForDailyGodownStockReport", err);
            }
        });

        router.get('/feedformulasearch/itemgroupid/:itemgroupid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getFeedFormulaReportitem(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getFeedFormulaReportitem", err);
            }
        });
        router.get('/feedformulasearch/fromdate/:fromdate/todate/:todate/itemgroupid/:itemgroupid/itemid/:itemid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getFeedFormulaReport(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getFeedFormulaReport", err);
            }
        });
	 router.get('/feedproductionsearch/fromdate/:fromdate/todate/:todate/itemid/:itemid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getFeedProductionReport(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getFeedProductionReport", err);
            }
        });

	  router.get('/stockadjustmentsearch/itemid/:itemid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getStockadjustmentReport(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getStockadjustmentReport", err);
            }
        });

	  router.get('/qualitychecksearch/fromdate/:fromdate/todate/:todate/itemid/:itemid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await FeedMillReports.getQualityCheckReport(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("FeedMillReports-getQualityCheckReport", err);
            }
        });
        
    return router;
}