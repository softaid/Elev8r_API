

var express = require('express');
var router = express.Router();

module.exports = function (qualitycheck, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await qualitycheck.getAllQualityCheckResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("qualitycheck-getAllQualityCheckResult", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await qualitycheck.getQualityCheck(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("qualitycheck-getQualityCheck", err);
        }
    });

            //SAVE SERVICE

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        let rows = await qualitycheck.saveQualityCheck(request, request.body);
        let location = JSON.parse(JSON.stringify(rows))[2][0]; 
        response.status(200).send(location);

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await qualitycheck.deleteQualityCheck(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("qualitycheck.Service - deleteQualityCheck", err);
        }
    });

        
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await Warehouse.deleteLocation(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("location-deleteLocation", err);
    //     }
    // });

    router.get('/search/:acknowledgement_number/:from_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await qualitycheck.getQualityCheckList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("qualitycheck-getQualityCheckList", err);
        }
    });

    return router;
}

