
var express = require('express');
var router = express.Router();

module.exports = function (materialreceipt, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialreceipt.getAllMaterialReceipt(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialreceipt-getAllMaterialReceipt", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialreceipt.getMaterialReceipt(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialreceipt-getMaterialReceipt", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await materialreceipt.saveMaterialReceipt(request, request.body);
            let result =  JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialreceipt-saveMaterialReceipt", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {            
             let result = await materialreceipt.deleteMaterialReceipt(request, request.body);
             response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialreceipt-deleteMaterialReceipt", err);
        }
    });

    router.get('/select/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialreceipt.getAllMaterialReceiptHatcherBatches(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialreceipt-getAllMaterialReceiptHatcherBatches", err);
        }
    });

    return router;
}

