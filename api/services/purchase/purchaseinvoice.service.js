
var express = require('express');
var router = express.Router();

module.exports = function (purchaseinvoice, oauth, log) {

    // get all PurchaseInvoice
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseinvoice.getAllPurchaseInvoice(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseinvoice-getAllPurchaseInvoice", err);
        }
    });

    // select purchase invoice

    // get all PurchaseInvoice
    router.get('/select/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseinvoice.getPurchaseInvoice(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseinvoice-getPurchaseInvoice", err);
        }
    });

     // save Purchaseinvoice
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await purchaseinvoice.savePurchaseInvoice(request, request.body);
            let result = JSON.parse(JSON.stringify(rows)); 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseinvoice-savePurchaseInvoice", err);
        }  
    });

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseinvoice.deletePurchaseInvoice(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseinvoice-deletePurchaseInvoice", err);
        }
    });

	// get transaction list by date and transaction name
    router.get('/:transaction/:from_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseinvoice.getPurchaseList(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseinvoice-getPurchaseList", err);
        }
    });

   
    router.get('/search/from_date/:from_date/to_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseinvoice.getPurchaseInvoiceList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("PurchaseInvoice-getPurchaseInvoiceList", err);
        }
    });

    return router;
}