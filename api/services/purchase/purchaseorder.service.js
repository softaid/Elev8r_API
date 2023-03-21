
var express = require('express');
var router = express.Router();

module.exports = function (purchaseorder, oauth, log) {

    // get all PurchaseOrder
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseorder.getAllPurchaseOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorder-getAllPurchasePurchaseOrder", err);
        }
    });

    // get  PurchaseOrder Report
    router.get('/search/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseorder.getPurchaseOrderReport(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorder-getPurchaseOrderReport", err);
        }
    });

    // get PurchaseOrder
    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseorder.getPurchaseOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorder-getPurchaseOrder", err);
        }
    });

     // save PurchaseOrder
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await purchaseorder.savePurchaseOrder(request, request.body);
            let result = JSON.parse(JSON.stringify(rows)); 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorder-savePurchaseOrder", err);
        }  
    });

    // delete purchaseorder
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseorder.deletePurchaseOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorder-deletePurchaseOrder", err);
        }
    });

    router.get('/partyaddress/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseorder.getPartyAddressespo(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorder-getPartyAddressespo", err);
        }
    });

    //po details by po id

    router.get('/searchbyid/id/:id/:isservice/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseorder.getpodetailsbypoid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorder-getpodetailsbypoid", err);
        }
    });


    //get all suppliers
    // router.get('/search/:supplier', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await PurchaseOrder.getAllPartnerRole(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("purchaseorder-getAllPartnerRole", err);
    //     }
    // });

      // get  PurchaseOrder List
    router.get('/search/module_type/:module_type/from_date/:from_date/to_date/:to_date/supplier/:supplier', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseorder.getPurchaseOrderList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorder-getPurchaseOrderList", err);
        }
    });


    return router;
}

