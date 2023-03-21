
var express = require('express');
var router = express.Router();

module.exports = function (BranchWiseSupervisor, oauth, log) {
    
    // get all branch wise supervisor
    router.get('/branchid/:branchid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BranchWiseSupervisor.getAllBrachWiseSupervisor(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfschedule.service - getAllCBFSchedule", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await BranchWiseSupervisor.saveBrachWiseSupervisor(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BranchWiseSupervisor-saveBranchWiseSupervisor", err);
        }
    });

    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BranchWiseSupervisor.deleteBrachWiseSupervisor(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BranchWiseSupervisor-deleteBrachWiseSupervisor", err);
        }
    });
    return router;
};