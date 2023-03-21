
var express = require('express');
var router = express.Router();

module.exports = function (purchaseorderdetail, oauth, log) {

    // get all purchase request detail related to purchase request
    router.get('/detailsearch/:purchaseorderid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params : ",request.params);
        try {
            let result = await purchaseorderdetail.getAllPurchaseorderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorderdetail-getAllPurchaseorderDetail", err);
        }
    });

    // get purchase request detail for edit
    router.get('/purchaseorderid/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseorderdetail.getPurchaseOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorderdetail-getPurchaseOrderDetail", err);
        }
    });
    
    // save purchase request detail
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {        
        try{
            console.log("purchaseorderdetail:",request.body);
            let rows = await purchaseorderdetail.savePurchaseOrderDetail(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorderdetail-savePurchaseOrderDetail", err);
        }

    });
        
    // delete purchase request detail
    router.delete('/purchaseorder/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseorderdetail.deletePurchaseOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorderdetail-deletePurchaseOrderDetail", err);
        }
    });

    //get items by poid
    router.get('/itemsbypoid/purchaseorderid/:purchaseorderid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await purchaseorderdetail.getItemsByPoid(request, request.params);
            console.log("item result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorderdetail-getItemsByPoid", err);
        }
    });

    //  get Purchaserequestdetails byrequestids
    // get all purchase request detail related to purchase request
    router.get('/getrequestdetails/:purchaserequestids/:taxcategoryid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params : ",request.params);
        try {
            let result = await purchaseorderdetail.getPurchaserequestdetailsByrequestids(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaseorderdetail-getPurchaserequestdetailsByrequestids", err);
        }
    });

    return router;
}

