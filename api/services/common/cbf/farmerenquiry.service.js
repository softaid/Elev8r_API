
var express = require('express');
var router = express.Router();

module.exports = function (FarmerEnquiry, oauth, log) {

    router.get('/select/id/:id/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiry.getFarmerEnquiry(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiry.getFarmerEnquiry", err);
        }
    });

    //get farmer enquiries without farmer agreement
    router.get('/selectwothoutagreement/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiry.getFarmerEnquiryWithoutAgreement(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiry.getFarmerEnquiryWithoutAgreement", err);
        }
    });

    //branchwise approved and agreemented farmer enquiry
    router.get('/selectwithagreement/:branchid/shedstatusid/:shedstatusid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiry.getBranchwiseFarmerEnquiry(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiry.getBranchwiseFarmerEnquiry", err);
        }
    });

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiry.getAllFarmerEnquiry(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiry-getAllFarmerEnquiry", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await FarmerEnquiry.saveFarmerEnquiry(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiry-saveFarmerEnquiry", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmerEnquiry.deleteFarmerEnquiry(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiry-deleteFarmerEnquiry", err);
        }
    });

    return router;
}

