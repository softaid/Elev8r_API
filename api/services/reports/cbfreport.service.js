var express = require('express');
var router = express.Router();

module.exports = function (CBFReport, oauth, log) {

    

    router.get('/search/branch_id/:branch_id/:line_id/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllBatchReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllBatchReport", err);
        }
    });

    router.get('/searchforbatchshedule/branchid/:branchid/:id/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllBatchsheduleReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllBatchsheduleReport", err);
        }
    });

    router.get('/searchforline/branchid/:branchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllLine(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllLine", err);
        }
    });

   
    router.get('/search/fromdate/:fromdate/todate/:todate/branch_id/:branch_id/line_id/:line_id/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllChickPlacementReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllChickPlacementReport", err);
        }
    });

    

    router.get('/search/fromdate/:fromdate/todate/:todate/fromage/:fromage/toage/:toage/branch_id/:branch_id/line_id/:line_id/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getDensityReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getDensityReport", err);
        }
    });

    router.get('/search/branch_id/:branch_id/:line_id/status_id/:status_id/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllBatchFarmerListReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllBatchFarmerListReport", err);
        }
    });
    router.get('/search/branchid/:branchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllLineWithStatus(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllLineWithStatus", err);
        }
    });

    router.get('/farmersearchforreport/branchlineid/:branchlineid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
    
        try {
            let result = await CBFReport.getAllFarmer(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllFarmer", err);
        }
    });

    router.get('/farmersearchbybranchnameforreport/branch_id/:branch_id/company_id/:company_id', oauth.ensureLoggedIn, async function (request, response, next) {
    
        try {
            let result = await CBFReport.getAllFarmerByBranchname(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllFarmerByBranchname", err);
        }
    });

    router.get('/farmsearch/framerid/:framerid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllFarm(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllFarm", err);
        }
    });

    router.get('/batchsearch/farmid/:farmid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllBatch(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllBatch", err);
        }
    });

    router.get('/shedbyfarmsearch/farmid/:farmid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllShedByFarmer(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllShedByFarmer", err);
        }
    });

    router.get('/batchbyshedsearch/shedid/:shedid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllBatchByShed(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllBatchByShed", err);
        }
    });


    router.get('/agewisesearch/batch_id/:batch_id/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllBatchAgeMortalityReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllBatchAgeMortalityReport", err);
        }
    });

    router.post('/cbfdeviationreport/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            
            let result = await CBFReport.cbfDeviationReport(request, request.body);
            response.send(result);

        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-cbfDeviationReport", err);
        }  
    });

    router.get('/batchsearch/fromdate/:fromdate/todate/:todate/batchid/:batchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllBatchOfMaterialTransfer(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllBatchOfMaterialTransfer", err);
        }
    });

    router.get('/batchsearch/curdate/:curdate/branch_id/:branch_id/line_id/:line_id/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllBatchOfLivestock(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllBatchOfLivestock", err);
        }
    });
  
    router.get('/partyfarmersearch/fromdate/:fromdate/todate/:todate/customerid/:customerid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getBirdSalesRegisterReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getBirdSalesRegisterReport", err);
        }
    });

   router.get('/weekwisebodyweightandfcrbatchsearch/curdate/:curdate/branchid/:branchid/lineid/:lineid/farmerid/:farmerid/farmid/:farmid/batch_id/:batch_id/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await CBFReport.getWeightFCRreport(request, request.params);
            response.send(result);
            
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getWeightFCRreport", err);
        }
    });

    router.get('/batchsearch/curdate/:curdate/branch_id/:branch_id/fromage/:fromage/toage/:toage/fromweight/:fromweight/toweight/:toweight/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getBirdForSaleReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getBirdForSaleReport", err);
        }
    });

    router.get('/supervisorsearch/branchlineid/:branchlineid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllSupervisor(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllSupervisor", err);
        }
    });

    router.get('/batchsearch/curdate/:curdate/branch_id/:branch_id/line_id/:line_id/empid/:empid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getDailySupervisiorReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getDailySupervisiorReport", err);
        }
    });

    router.get('/batchsearch/cbf_batchid/:cbf_batchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getBatchDetailsReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getBatchDetailsReport", err);
        }
    });

    router.get('/linesearch/placementdate/:placementdate/cbf_batchid/:cbf_batchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getBatchWiseBirdCostReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getBatchWiseBirdCostReport", err);
        }
    });

    router.get('/farmsearch/fromdate/:fromdate/todate/:todate/farm_id/:farm_id/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getFarmperformanceReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getFarmperformanceReport", err);
        }
    });

    router.get('/partywisefarmersearch/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getAllFarmerNameByParty(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllFarmerNameByParty", err);
        }
    });

    router.get('/cbfbroilerbirdbalancesearch/farm_id/:farm_id/batchid/:batchid/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response) {
        try {
            let result = await CBFReport.getBroilerBirdBalanceReport(request, request.params);
            console.log("------------getBroilerBirdBalanceReport----------",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getBroilerBirdBalanceReport", err);
        }
    });
 
       router.get('/cbfgrowingchargereortsearch/batchid/:batchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response) {
        try {
            let result = await CBFReport.getGrowingchargesReport(request, request.params);
            console.log("------------getGrowingchargesReport----------",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getGrowingchargesReport", err);
        }
    });


    router.get('/cbfbroilerbirdfinancebalancesearch/farmid/:farmid/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response) {
        try {
            let result = await CBFReport.BroilerBatchFinancialPerformanceReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-BroilerBatchFinancialPerformanceReport", err);
        }
    });

    router.get('/cbfbroilerbirdreconcilitatinbalancesearch/batchid/:batchid/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response) {
        try {
            let result = await CBFReport.BroilerBatchReconcilationPerformanceReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-BroilerBatchReconcilationPerformanceReport", err);
        }
    });
 
     router.get('/getfarmerstocksearch/batchid/:batchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response) {
        try {
            let result = await CBFReport.getFarmerstockReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getFarmerstockReport", err);
        }
    });
	router.get('/shedsearchid/batchid/:batchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        debugger;
        try {
            let result = await CBFReport.getAllShedid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getAllShedid", err);
        }
    });

    router.get('/partyfarmerbatchsearch/fromdate/:fromdate/todate/:todate/batchid/:batchid/shedid/:shedid/customerid/:customerid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getBirdSalesRegisterReportBatchwise(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getBirdSalesRegisterReportBatchwise", err);
        }
    });

    // farmer enquirywise document collection report

    router.get('/documentcollectionreport/farmerenquiryid/:farmerenquiryid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CBFReport.getCbfDocumentCollectionByEnquiryid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getCbfDocumentCollectionByEnquiryid", err);
        }
    });

    router.get('/pendinggc/branchid/:branchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response) {
        try {
            let result = await CBFReport.getPendingGCReport(request, request.params);
            console.log("------------getPendingGCReport----------",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getPendingGCReport", err);
        }
    });

    router.get('/paymentpendinggc/branchid/:branchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response) {
        try {
            let result = await CBFReport.getPaymentPendingGCReport(request, request.params);
            console.log("------------getPaymentPendingGCReport----------",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CBFReport-getPaymentPendingGCReport", err);
        }
    });

   
    return router;

}