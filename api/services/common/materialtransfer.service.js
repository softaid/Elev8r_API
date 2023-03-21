
var express = require('express');
var router = express.Router();

module.exports = function (MaterialTransfer, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await MaterialTransfer.getAllMaterialTransfer(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialtransfer.service - getMaterialTransfersBySource", err);
        }
    });

    // router.get('/search/:companyid/:transfertarget', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await MaterialTransfer.getMaterialTransfersBySource(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("materialtransfer.service - getMaterialTransfersBySource", err);
    //     }
    // });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await MaterialTransfer.getMaterialTransfer(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialtransfer.service - getMaterialTransfer", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await MaterialTransfer.saveMaterialTransfer(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialtransfer.service - saveMaterialTransfer", err);
        }
    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await MaterialTransfer.deleteMaterialTransfer(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialtransfer.service - deleteMaterialTransfer", err);
        }
    });

    //get material transfer by request id
    router.get('/:requestid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            console.log("Material transfer params : ", request.params);
            let result = await MaterialTransfer.getMaterialTransferByRequestId(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialtransfer-getMaterialTransferByRequestId", err);
        }
    });

    //material transfer JE

    router.get('/materialtransferje/:id/:companyid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await MaterialTransfer.saveMaterialTransferJE(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialtransfer.service - saveMaterialTransferJE", err);
        }
    });
    // this is for material req and transfer list
    router.get('/materialrequestandtransferschedulelist/:fromdate/:todate', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            console.log("Material transfer params : ", request.params);
            let result = await MaterialTransfer.getMaterialRequestandTransferScheduleList(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialtransfer-getMaterialRequestandtransferScheduleList", err);
        }
    });


    return router;
}

