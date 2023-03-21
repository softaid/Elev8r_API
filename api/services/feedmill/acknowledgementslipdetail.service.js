

var express = require('express');
var router = express.Router();

module.exports = function (acknowledgementslipdetail, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:ackid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await acknowledgementslipdetail.getAllAcknowledgementslipDetailResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("acknowledgementslipdetail-getAllAcknowledgementslipDetailResult", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await acknowledgementslipdetail.getAcknowledgementslipDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("acknowledgementslipdetail-getAcknowledgementslipDetail", err);
        }
    });

            //SAVE SERVICE

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await acknowledgementslipdetail.saveAcknowledgementslipDetail(request, request.body);
            let location = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(location);
        } catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("acknowledgementslipdetail-saveAcknowledgementslipDetail", err);
        }

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await acknowledgementslipdetail.deleteAcknowledgementslipDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("acknowledgementslipdetail.Service - deleteAcknowledgementslipDetail", err);
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
    router.get('/poidbyacknowledgementno/ackid/:ackid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await acknowledgementslipdetail.getPoidByAcknowledgementno(request, request.params);
            console.log("item result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            
            log.dbErrorLog("acknowledgementslipdetail-getPoidByAcknowledgementno", err);
        }
    });

    return router;
}

