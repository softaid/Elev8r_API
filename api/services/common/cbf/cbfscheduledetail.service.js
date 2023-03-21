
var express = require('express');
var router = express.Router();

module.exports = function (cbfscheduledetail, oauth, log) {

    // // get all breederscheduledetail
    // router.get('/search/:breederscheduleid', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await breederscheduledetail.getAllBreederScheduleDetail(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("breederscheduledetail-getAllBreederScheduleDetail", err);
    //     }
    // });

    // // get breederscheduledetail
    // router.get('/:breederscheduleid', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await breederscheduledetail.getBreederScheduleDetail(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("breederscheduledetail-getBreederScheduleDetail", err);
    //     }
    // });

    // save cbf schedule detail
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await cbfscheduledetail.saveCBFScheduleDetail(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfscheduledetail.service - saveCBFScheduleDetail", err);
        }  
    });

    // delete cbf schedule detail
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfscheduledetail.deleteCBFScheduleDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfscheduledetail.service - deleteCBFScheduleDetail", err);
        }
    });

    return router;
}

