
var express = require('express');
var router = express.Router();

module.exports = function (productionOrder, oauth, log) {

    router.get('/search/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await productionOrder.getAllProductionOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrder-getAllproductionOrder", err);
        }
    });

    // this is for production order list    
    router.get('/feedmillprodorderlist/:fromdate/:todate', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await productionOrder.getProductionOrderList(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrder-getProductionOrderList", err);
        }
    });

    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await productionOrder.getProductionOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrder-getproductionOrder", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await productionOrder.saveProductionOrder(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrder-saveproductionOrder", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await productionOrder.deleteProductionOrder(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrder-deleteproductionOrder", err);
        }
    });

    router.post('/productionregistereport/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            console.log("===== request body : ", request.body);
            let result = await productionOrder.getProductionRegisterReport(request, request.body);
            response.send(result);

        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrder-getProductionRegisterReport", err);
        }  
    });

     // get item qty by itemid
    
     router.get('/itemid/:itemid/:warehouseid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await productionOrder.getItemStockqty(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrder-getItembatchBalByItemid", err);
        }
    });

    router.post('/bomdetail/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let result = await productionOrder.getwhWiseBomDetail(request, request.body);
            response.send(result);

        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrder-getwhWiseBomDetail", err);
        }  
    });

  

    return router;
}




