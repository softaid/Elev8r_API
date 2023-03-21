
var express = require('express');
var router = express.Router();

module.exports = function (CbfBatch, oauth, log) {

    // get all cbf batch details
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfBatch.getAllCbfBatchDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfBatch.service - getAllCbfBatchDetails", err);
        }
    });

    // get cbf schedule
    router.get('/select/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfBatch.getCbfBatchDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfBatch.service - getCbfBatchDetails", err);
        }
    });

    //  // save cbf schedule
    //  router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try{
    //         let rows = await cbfschedule.saveCBFSchedule(request, request.body);
    //         let result = JSON.parse(JSON.stringify(rows))[2][0]; 
    //         response.status(200).send(result);
    //     }
    //     catch(err){
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("cbfschedule.service - saveCBFSchedule", err);
    //     }  
    // });

    // delete cbf schedule
    router.delete('/:id/:companyid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfBatch.deleteCbfBatchDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfBatch.service - deleteCbfBatchDetails", err);
        }
    });

    return router;
}

