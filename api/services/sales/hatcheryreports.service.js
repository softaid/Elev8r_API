
var express = require('express');
var router = express.Router();

module.exports = function (HatcheryReports, oauth, log) {

    // get setting batch report
     router.post('/settingreport', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            console.log("===== request body : ", request.body);
            let rows = await HatcheryReports.getSetterBatchReport(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-settingreport", err);
        }  
    });

    // get hatch batch report
    router.post('/hatchreport', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            console.log("===== request body : ", request.body);
            let rows = await HatcheryReports.getHatchReport(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-hatchreport", err);
        }  
    });

     // get hatch batch report
     router.post('/economyreport', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            console.log("===== request body : ", request.body);
            let rows = await HatcheryReports.getEconomyReport(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-economyreport", err);
        }  
    });

    // get hatch batch report
    router.post('/candlingtestreport', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            console.log("===== request body : ", request.body);
            let rows = await HatcheryReports.getCandlingTestReport(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-candlingtestreport", err);
        }  
    });

    router.get('/settingreportwithbinqty/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getSettingReportWithBinQty(request, request.params);
            response.send(result);
            console.log("-----------------------------result----------------------------------",result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getSettingReportWithBinQty", err);
        }
    });

    router.get('/transfertohatcher/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getTransferToHatcher(request, request.params);
            response.send(result);
            console.log("-----------------------------result----------------------------------",result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getTransferToHatcher", err);
        }
    });

    router.get('/eggcollectionvaluewithcontrolvalue/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getEggcollectionValueWthControlValue(request, request.params);
            response.send(result);
            console.log("-----------------------------result----------------------------------",result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getEggcollectionValueWthControlValue", err);
        }
    });

    router.get('/itemwisesalereport/fromdate/:fromdate/todate/:todate/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getItemWiseSaleReport(request, request.params);
            response.send(result);
            console.log("-----------------------------getItemWiseSaleReporthatcheryservice----------------------------------",result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getItemWiseSaleReport", err);
        }
    });

    router.get('/customerwisesalereport/fromdate/:fromdate/todate/:todate/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getCustomerWiseSaleReport(request, request.params);
            response.send(result);
            console.log("-----------------------------getCustomerWiseSaleReporthatchery----------------------------------",result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getCustomerWiseSaleReport", err);
        }
    });

    router.get('/customerwisesalewithoutgroupreport/fromdate/:fromdate/todate/:todate/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getCustomerWiseSaleWithoutGroupReport(request, request.params);
            response.send(result);
            console.log("-----------------------------result----------------------------------",result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getCustomerWiseSaleWithoutGroupReport", err);
        }
    });

    router.get('/itemwisesalesummaryreport/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await HatcheryReports.getItemWiseSaleSummaryReport(request, request.params);
            response.send(result);
            console.log("-----------------------------result----------------------------------",result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("HatcheryReports-getItemWiseSaleSummaryReport", err);
        }
    });




    return router;
}

