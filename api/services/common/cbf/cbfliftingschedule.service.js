
var express = require('express');
var router = express.Router();

module.exports = function (LiftingSchedule, oauth, log) {

    router.get('/search/:compnayid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LiftingSchedule.getAllLiftingSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingSchedule-getAllLiftingSchedule", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LiftingSchedule.getLiftingSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingSchedule-getLiftingSchedule", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await LiftingSchedule.saveLiftingSchedule(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingSchedule-saveLiftingSchedule", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LiftingSchedule.deleteLiftingSchedule(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingSchedule-deleteLiftingSchedule", err);
        }
    });

    router.get('/branchwisesalesorder/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LiftingSchedule.getBranchWiseSalesOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingSchedule-getBranchWiseSalesOrder", err);
        }
    });

    return router;
}



