
var express = require('express');
var router = express.Router();

module.exports = function (FarmerEnquiry, oauth, log) {

    router.get('/select/branchid/:branchid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params>>>>>>>>>",request.params);
        try {
            let result = await FarmerEnquiry.getAllFarmerEnquiry(request, request.params);
            console.log('result>>>>>>>>>>>>>>>>', result)
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmerEnquiry.getAllFarmerEnquiry", err);
        }
    });


    // router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await Document.getDocument(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("Document-getDocument", err);
    //     }
    // });

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

