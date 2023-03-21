
var express = require('express');
var router = express.Router();

module.exports = function (chickPlacement, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chickPlacement.getAllCbfChickPlacement(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chickPlacement-getAllCbfChickPlacement", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chickPlacement.getCbfChickPlacement(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chickPlacement-getCbfChickPlacement", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await chickPlacement.saveCbfChickPlacement(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[3][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chickPlacement-saveCbfChickPlacement", err);
        }

    });
        
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chickPlacement.deleteCbfChickPlacement(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chickPlacement-deleteCbfChickPlacement", err);
        }
    });

    router.get('/schedulesformaterialreceipt/:batchid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await chickPlacement.getCbfScheduleForMaterialReceipt(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("chickPlacement.service -getCbfScheduleForMaterialReceipt", err);
        }
    });
    
    return router;
}



