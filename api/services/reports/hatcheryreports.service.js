
var express = require('express');
var router = express.Router();

module.exports = function (HatcheryReports, oauth, log) {

    // get setting batch report
    router.post('/settingreport', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let rows = await HatcheryReports.getSetterBatchReport(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[0];
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-settingreport", err);
        }
    });

    // get hatch batch report
    router.post('/hatchreport', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let rows = await HatcheryReports.getHatchReport(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[0];
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-hatchreport", err);
        }
    });

    // get Economy Report 
    router.post('/economyreport', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let rows = await HatcheryReports.getEconomyReport(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[0];
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-economyreport", err);
        }
    });

    // get CandlingTest Report 
    router.post('/candlingtestreport', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let rows = await HatcheryReports.getCandlingTestReport(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[0];
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-candlingtestreport", err);
        }
    });

    // get Setting Report With Bin Quantity
    router.get('/settingreportwithbinqty/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getSettingReportWithBinQty(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getSettingReportWithBinQty", err);
        }
    });

    // get Transfer To Hatcher Report 
    router.get('/transfertohatcher/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getTransferToHatcher(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getTransferToHatcher", err);
        }
    });

    //get Egg collection value Report
    router.get('/eggcollectionvaluewithcontrolvalue/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getEggcollectionValueWthControlValue(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getEggcollectionValueWthControlValue", err);
        }
    });

    // Sale Module Reports
    // get Iten Wise Sale Report 
    router.get('/itemwisesalereport/fromdate/:fromdate/todate/:todate/itemid/:itemid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getItemWiseSaleReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getItemWiseSaleReport", err);
        }
    });

    // get Customer Wise Sale Report 
    router.get('/customerwisesalereport/fromdate/:fromdate/todate/:todate/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getCustomerWiseSaleReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getCustomerWiseSaleReport", err);
        }
    });


    // get Customer Wise Sale without Group Report 
    router.get('/customerwisesalewithoutgroupreport/fromdate/:fromdate/todate/:todate/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getCustomerWiseSaleWithoutGroupReport(request, request.params);
            response.send(result);

        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getCustomerWiseSaleWithoutGroupReport", err);
        }
    });

    // get Item Wise Sale Summary Report 
    router.get('/itemwisesalesummaryreport/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getItemWiseSaleSummaryReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getItemWiseSaleSummaryReport", err);
        }
    });

    // get Collection Summary Report 
    router.get('/collectionsummaryreport/fromdate/:fromdate/todate/:todate/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getCollectionSummaryReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getCollectionSummaryReport", err);
        }
    });

    // get Sale Summary Report 
    router.get('/salesummaryreport/fromdate/:fromdate/todate/:todate/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getSaleSummaryReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getSaleSummaryReport", err);
        }
    });

    //get Partybylocatinid for Production Report in Hatchery

    router.get('/getpartybylocation/locationid/:locationid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getPartbyLocatid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getPartbyLocatid", err);
        }
    });

    //get breederbatchbylocatinid for Production Report in Hatchery
    router.get('/getbreederbatchbylocation/locationid/:locationid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getBreederBatchbyLocatid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getBreederBatchbyLocatid", err);
        }
    });

    //get Hatchery Production Report
    router.get('/gethatcheryproduuctioneport/locationid/:locationid/breederbatchid/:breederbatchid/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getHatcheryProductionReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getHatcheryProductionReport", err);
        }
    });
    
    router.get('/gethatcherbatchbylocationid/locationid/:locationid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getAllhtacherbatch(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getAllhtacherbatch", err);
        }
    });

    router.get('/gethatcherbatchbylocationid/locationid/:locationid/hatcherbatchid/:hatcherbatchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getHatcheryvaccinationReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getHatcheryvaccinationReport", err);
        }
    });

    return router;
}

