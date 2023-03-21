
var express = require('express');
var router = express.Router();

module.exports = function (cbfschedule, oauth, log) {

    // get all cbf schedules
    router.get('/scheduletypeid/:scheduletypeid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfschedule.getAllCBFSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfschedule.service - getAllCBFSchedule", err);
        }
    });

    // get cbf schedule
    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfschedule.getCBFSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfschedule.service - getCBFSchedule", err);
        }
    });

     // save cbf schedule
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await cbfschedule.saveCBFSchedule(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfschedule.service - saveCBFSchedule", err);
        }  
    });

    // delete cbf schedule
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfschedule.deleteCBFSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfschedule.service - deleteCBFSchedule", err);
        }
    });

    return router;
}

