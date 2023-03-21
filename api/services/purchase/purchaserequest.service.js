
var express = require('express');
var router = express.Router();

module.exports = function (PurchaseRequest, oauth, log) {
    //get hatcherbatch
    router.get('/searchhatcherbatch/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseRequest.getAllHatcherbatches(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaserequest-getAllPurchaseRequest", err);
        }
    });

    // get breederbatch
    router.get('/searchbreederbatch/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseRequest.getAllBreederbatches(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaserequest-getAllPurchaseRequest", err);
        }
    });
    // get all purchase request
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseRequest.getAllPurchaseRequest(request, request.params);
            console.log("result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaserequest-getAllPurchaseRequest", err);
        }
    });

    // get purchase request
    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseRequest.getPurchaseRequest(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaserequest-getPurchaseRequest", err);
        }
    });

     // save purchase request
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await PurchaseRequest.savePurchaseRequest(request, request.body);
            console.log("Rows : ",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaserequest-savePurchaseRequest", err);
        }  
    });

    // delete purchase request
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseRequest.deletePurchaseRequest(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaserequest-deletePurchaseRequest", err);
        }
    });



    // get all purchase request detail related to purchase request
    router.get('/companyid/:companyid/detailsearch/:purchaserequestid/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseRequest.getAllPurchaseRequestDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaserequest-getAllPurchaseRequestDetail", err);
        }
    });
        // get all purchase request detail related to purchase request
        router.get('/taxcategoryid/:taxcategoryid/:companyid/purchaserequestid/:purchaserequestid/', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await PurchaseRequest.getAllPurchaseRequestbytaxcategory(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("purchaserequest-getAllPurchaseRequestbytaxcategory", err);
            }
        });
    

    // get purchase request detail for edit
    router.get('/purchaserequestid/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseRequest.getPurchaseRequestDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaserequest-getPurchaseRequestDetail", err);
        }
    });
    
    // save purchase request detail
    router.post('/purchaserequest/', oauth.ensureLoggedIn, async function (request, response, next) {        
        try{
            let rows = await PurchaseRequest.savePurchaseRequestDetail(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaserequest-savePurchaseRequestDetail", err);
        }

    });
        
    // delete purchase request detail
    router.delete('/purchaserequest/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseRequest.deletePurchaseRequestDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaserequest-deletePurchaseRequestDetail", err);
        }
    });

    router.get('/search/from_date/:from_date/to_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PurchaseRequest.getPurchaseRequestList(request, request.params);
            console.log("result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("purchaserequest-getPurchaseRequestList", err);
        }
    });

    return router;
}

