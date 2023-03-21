
var express = require('express');
var router = express.Router();

module.exports = function (cbfliftingschedule, oauth, log) {
    
    // get all branch wise supervisor
    router.get('/date/:schedule_date/:branchid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfliftingschedule.getDateAndBranchwiseSalesDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfliftingschedule.service - getDateAndBranchwiseSalesDetails", err);
        }
    });

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfliftingschedule.getAllLiftingSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfliftingschedule.service-getAllLiftingSchedule", err);
        }
    });

    router.get('/select/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfliftingschedule.getLiftingSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfliftingschedule.service-getLiftingSchedule", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await cbfliftingschedule.saveLiftingSchedule(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfliftingschedule.service-saveLiftingSchedule", err);
        }

    });
        
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfliftingschedule.deleteLiftingSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfliftingschedule.service - deleteLiftingSchedule", err);
        }
    });

    return router;
};