
var express = require('express');
var router = express.Router();

module.exports = function (BranchWiseSupervisorDetails, oauth, log) {
    
    // get all branch wise supervisor
    router.get('/branchwisesupervisorid/:branchwisesupervisorid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BranchWiseSupervisorDetails.getAllBrachWiseSupervisorDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfbranchwisesupervisordetails.service - getAllBrachWiseSupervisorDetails", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await BranchWiseSupervisorDetails.saveBrachWiseSupervisorDetails(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BranchWiseSupervisorDetails-saveBrachWiseSupervisorDetails", err);
        }
    });

    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BranchWiseSupervisorDetails.deleteBrachWiseSupervisorDetails(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BranchWiseSupervisorDetails-deleteBrachWiseSupervisorDetails", err);
        }
    });
    return router;
};