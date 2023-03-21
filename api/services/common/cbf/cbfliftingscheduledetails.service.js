
var express = require('express');
var router = express.Router();

module.exports = function (LiftingScheduleDetails, oauth, log) {

    router.get('/search/:compnayid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LiftingScheduleDetails.getAllLiftingScheduleDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingScheduleDetails-getAllLiftingScheduleDetails", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LiftingScheduleDetails.getLiftingScheduleDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingScheduleDetails-getLiftingScheduleDetails", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await LiftingScheduleDetails.saveLiftingScheduleDetails(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingScheduleDetails-saveLiftingScheduleDetails", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LiftingScheduleDetails.deleteLiftingScheduleDetails(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingScheduleDetails-deleteLiftingScheduleDetails", err);
        }
    });

    return router;
}



