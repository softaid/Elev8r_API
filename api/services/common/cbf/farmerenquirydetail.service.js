
var express = require('express');
var router = express.Router();

module.exports = function (FarmerEnquiryDetail, oauth, log) {

    router.get('/select/farmerenquiryid/:farmerenquiryid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiryDetail.getAllFarmerEnquiryDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail.getAllFarmerEnquiryDetail", err);
        }
    });


    // water analysis detail start
    router.get('/selectwateranalysis/id/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiryDetail.getWaterAnalysis(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-getWaterAnalysis", err);
        }
    });

    router.post('/savewateranalysis/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await FarmerEnquiryDetail.saveWaterAnalysis(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-saveWaterAnalysis", err);
        }

    });
        
    router.delete('/deletewateranalysis/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiryDetail.deleteWaterAnalysis(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-deleteWaterAnalysis", err);
        }
    });

    // end water analysis

    // shed dimension start

    router.get('/selectsheddimension/id/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiryDetail.getShedDimension(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-getShedDimension", err);
        }
    });

    router.post('/savesheddimension/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await FarmerEnquiryDetail.saveShedDimension(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-saveShedDimension", err);
        }

    });
        
    router.delete('/deletesheddimension/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiryDetail.deleteShedDimension(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-deleteShedDimension", err);
        }
    });

    // shed dimension end

    // Equipment detail start

    router.get('/selectequipmentdetail/id/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiryDetail.getEquipmentDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-getEquipmentDetail", err);
        }
    });

    router.post('/saveequipmentdetail/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await FarmerEnquiryDetail.saveEquipmentDetail(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-saveEquipmentDetail", err);
        }

    });
        
    router.delete('/deleteequipmentdetail/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiryDetail.deleteEquipmentDetail(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-deleteEquipmentDetail", err);
        }
    });

    // Equipment detail end

    // Previous performance history start

    router.get('/selectperformancehistory/id/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiryDetail.getPerformanceHistory(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-getPerformanceHistory", err);
        }
    });

    router.post('/saveperformancehistory/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await FarmerEnquiryDetail.savePerformanceHistory(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-savePerformanceHistory", err);
        }

    });
        
    router.delete('/deleteperformancehistory/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiryDetail.deletePerformanceHistory(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiryDetail-deletePerformanceHistory", err);
        }
    });

    // Previous performance history end
    return router;
}

