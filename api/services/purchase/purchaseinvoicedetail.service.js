
var express = require('express');
var router = express.Router();

module.exports = function (purchaseinvoicedetail, oauth, log) {
  
    // gat purchaseinvoicedetail
    router.get('/detailsearch/:purchaseinvoiceid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params : ",request.params);
        try {
            let result = await purchaseinvoicedetail.getAllPurchaseInvoiceDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseinvoicedetail-getAllPurchaseInvoiceDetail", err);
        }
    });

     // save PurchaseinvoiceDetail
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await purchaseinvoicedetail.savePurchaseInvoicedetail(request, request.body);
            let result = JSON.parse(JSON.stringify(rows)); 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseinvoicedetail-savePurchaseInvoicedetail", err);
        }  
    });

     // delete purchase Invoice detail
     router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseinvoicedetail.deletePurchaseInvoiceDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseinvoicedetail-deletePurchaseInvoiceDetail", err);
        }
    });

    //get save JE
    
    router.get('/savepurchaseinvoiceje/:purchaseinvoiceid/companyid/:companyid/userid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseinvoicedetail.savePurchaseInvoiceJE(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseinvoicedetail-savePurchaseInvoiceJE", err);
        }
    });

    return router;
}