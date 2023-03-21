

var express = require('express');
var router = express.Router();

module.exports = function (weightslip, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await weightslip.getAllWeightSlipResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("weightslip-getAllWeightSlipResult", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await weightslip.getWeightSlip(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("weightslip-getWeightSlip", err);
        }
    });

            //SAVE SERVICE

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        let rows = await weightslip.saveWeightSlip(request, request.body);
        let location = JSON.parse(JSON.stringify(rows))[2][0]; 
        response.status(200).send(location);

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await weightslip.deleteWeightSlip(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("weightslip.Service - deleteWeightSlip", err);
        }
    });

        
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await Warehouse.deleteLocation(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("location-deleteLocation", err);
    //     }
    // });

    router.get('/search/:acknowledgement_number/:from_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await weightslip.getWeightSlipList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("weightslip-getWeightSlipList", err);
        }
    });

    return router;
}

