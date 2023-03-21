
var express = require('express');
var router = express.Router();

module.exports = function (CreateBatchSchedule, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CreateBatchSchedule.getAllCreateBatchSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CreateBatchSchedule-getAllCreateBatchSchedule", err);
        }
    });


    router.get('/select/id/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CreateBatchSchedule.getCreateBatchSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CreateBatchSchedule-getCreateBatchSchedule", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await CreateBatchSchedule.saveCreateBatchSchedule(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CreateBatchSchedule-saveCreateBatchSchedule", err);
        }

    });
        
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CreateBatchSchedule.deleteCreateBatchSchedule(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CreateBatchSchedule-deleteCreateBatchSchedule", err);
        }
    });

    // get branchwise farmer enquiries with agreement

    router.get('/select/branchid/:branchid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CreateBatchSchedule.getBranchwiseFarmerEnquiriesWithAgreement(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CreateBatchSchedule-getBranchwiseFarmerEnquiriesWithAgreement", err);
        }
    });


    return router;
}



