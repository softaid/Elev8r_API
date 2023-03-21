
var express = require('express');
var router = express.Router();

module.exports = function (CreateBatchScheduleDetails, oauth, log) {

    router.get('/search/:procurementscheduleid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CreateBatchScheduleDetails.getAllCreateBatchScheduleDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CreateBatchScheduleDetails-getAllCreateBatchScheduleDetails", err);
        }
    });


    router.get('/select/id/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CreateBatchScheduleDetails.getCreateBatchScheduleDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CreateBatchScheduleDetails-getCreateBatchScheduleDetails", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await CreateBatchScheduleDetails.saveCreateBatchScheduleDetails(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CreateBatchScheduleDetails-saveCreateBatchScheduleDetails", err);
        }

    });
        
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CreateBatchScheduleDetails.deleteCreateBatchScheduleDetails(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CreateBatchScheduleDetails-deleteCreateBatchScheduleDetails", err);
        }
    });

    return router;
}



