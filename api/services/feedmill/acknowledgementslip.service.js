

var express = require('express');
var router = express.Router();

module.exports = function (acknowledgementslip, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await acknowledgementslip.getAllAcknowledgementslipResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("acknowledgementslip-getAllAcknowledgementslipResult", err);
        }
    });

         //SEARCH SERVICE

         router.get('/ackwithqualitystatussearch/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
             console.log("getAllAcknowledgementslipResultwithqualitystatus",response);
            try {
                let result = await acknowledgementslip.getAllAcknowledgementslipResultwithqualitystatus(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("acknowledgementslip-getAllAcknowledgementslipResultwithqualitystatus", err);
            }
        });
    

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await acknowledgementslip.getAcknowledgementSlip(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("acknowledgementslip-getAcknowledgementSlip", err);
        }
    });

            //SAVE SERVICE

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        let rows = await acknowledgementslip.saveAcknowledgementSlip(request, request.body);
        let location = JSON.parse(JSON.stringify(rows))[2][0]; 
        response.status(200).send(location);

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await acknowledgementslip.deleteAcknowledgementSlip(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("acknowledgementslip.Service - deleteAcknowledgementSlip", err);
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

    // this is for getting acknowledgement slip list	
    router.get('/search/:fromdate/:todate/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await acknowledgementslip.getAcknowledgementSlipList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("acknowledgementslip-getAcknowledgementSlipList", err);
        }
    });

    return router;
}

