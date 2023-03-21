

var express = require('express');
var router = express.Router();

module.exports = function (indirectcostheads, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await indirectcostheads.getAllIndirectCostHeadsResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("indirectcostheads-getAllIndirectCostHeadsResult", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await indirectcostheads.getIndirectCostHeads(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("indirectcostheads-getIndirectCostHeads", err);
        }
    });

    //SAVE SERVICE
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await indirectcostheads.saveIndirectCostHeads(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("indirectcostheads.service-saveIndirectCostHeads", err);
        }

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await indirectcostheads.deleteIndirectCostHeads(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("indirectcostheads.Service - deleteIndirectCostHeads", err);
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

    return router;
}

