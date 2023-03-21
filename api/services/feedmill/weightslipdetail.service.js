

var express = require('express');
var router = express.Router();

module.exports = function (weightslipdetail, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:weightslipid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await weightslipdetail.getAllWeightSlipDetailResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("weightslipdetail-getAllWeightSlipDetailResult", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await weightslipdetail.getWeightSlipDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("weightslipdetail-getWeightSlipDetail", err);
        }
    });

            //SAVE SERVICE

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await weightslipdetail.saveWeightSlipDetail(request, request.body);
            let location = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(location);
        } catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("weightslipdetail-saveWeightSlipDetail", err);
        }

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await weightslipdetail.deleteWeightSlipDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("weightslipdetail.Service - deleteWeightSlipDetail", err);
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

    //get items by poid
    // router.get('/poidbyacknowledgementno/weightslipid/:weightslipid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await acknowledgementslipdetail.getPoidByAcknowledgementno(request, request.params);
    //         console.log("item result : ",result);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
            
    //         log.dbErrorLog("acknowledgementslipdetail-getPoidByAcknowledgementno", err);
    //     }
    // });

    return router;
}

