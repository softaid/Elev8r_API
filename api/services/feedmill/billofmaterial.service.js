

var express = require('express');
var router = express.Router();

module.exports = function (billofmaterial, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await billofmaterial.getAllBillOfMaterialResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("billofmaterial-getAllBillOfMaterialResult", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await billofmaterial.getBillOfMaterial(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("billofmaterial-getBillOfMaterial", err);
        }
    });

            //SAVE SERVICE


    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await billofmaterial.saveBillOfMaterial(request, request.body);
           
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("billofmaterial-saveBillOfMaterial", err);
        }

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await billofmaterial.deleteBillOfMaterial(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("billofmaterial.Service - deleteBillOfMaterial", err);
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

    router.get('/itemlastpuchasecost/:itemid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await billofmaterial.getItemLastPurchaseCost(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("billofmaterial-getItemLastPurchaseCost", err);
        }
    });

    router.get('/bombyitemid/:itemid/:bomcode/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await billofmaterial.getBomByitemid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("billofmaterial-getBomByitemid", err);
        }
    });

    router.get('/search/product_group/:product_group/product_name/:product_name/from_date/:from_date/to_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await billofmaterial.getBillOfMaterialList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("billofmaterial-getBillOfMaterialList", err);
        }
    });

    return router;
}

