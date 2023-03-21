
var express = require('express');
var router = express.Router();

module.exports = function (LiftingScheduledetail, oauth, log) {

    
    // get all lifting schedule 
    router.get('/search/:liftingscheduleid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LiftingScheduledetail.getAllBreederLfScheduleDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingScheduledetail.service - getAllBreederLfScheduleDetail", err);
        }
    });

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LiftingScheduledetail.getBreederLfScheduleDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingScheduledetail.service-getBreederLfScheduleDetail", err);
        }
    });

   

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await LiftingScheduledetail.saveBreederLfScheduleDetail(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LiftingScheduledetail.service-saveBreederLfScheduleDetail", err);
        }

    });

     
  
    return router;
};