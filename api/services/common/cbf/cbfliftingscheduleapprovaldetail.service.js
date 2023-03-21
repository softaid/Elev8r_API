
var express = require('express');
var router = express.Router();

module.exports = function (cbfliftingscheduledetail, oauth, log) {

    router.get('/search/:lifting_schedule_id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfliftingscheduledetail.getAllLiftingScheduleDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfliftingscheduledetail.service-getAllLiftingScheduleDetail", err);
        }
    });

    router.get('/select/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfliftingscheduledetail.getLiftingScheduleDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfliftingscheduledetail.service-getLiftingScheduleDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await cbfliftingscheduledetail.saveLiftingScheduleDetail(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfliftingscheduledetail.service-saveLiftingScheduleDetail", err);
        }

    });
        
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfliftingscheduledetail.deleteLiftingScheduleDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfliftingscheduledetail.service - deleteLiftingScheduleDetail", err);
        }
    });

    return router;
};