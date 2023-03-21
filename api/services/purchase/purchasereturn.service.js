
var express = require('express');
var router = express.Router();

module.exports = function (PurchaseReturn, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseReturn.getAllPurchaseReturn(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("PurchaseReturn-getAllPurchaseReturn", err);
        }
    });


    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseReturn.getPurchaseReturn(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("PurchaseReturn-getPurchaseReturn", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request",request);
        try{
            let rows = await PurchaseReturn.savePurchaseReturn(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("PurchaseReturn-savePurchaseReturn", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseReturn.deletePurchaseReturn(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("PurchaseReturn-deletePurchaseReturn", err);
        }
    });
    
    return router;
}

