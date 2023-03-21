
var express = require('express');
var router = express.Router();

module.exports = function (StockAdjustment, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await StockAdjustment.getAllStockAdjustment(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("StockAdjustment-getAllStockAdjustment", err);
        }
    });


    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await StockAdjustment.getStockAdjustment(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("StockAdjustment-getStockAdjustment", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request",request);
        try{
            let rows = await StockAdjustment.saveStockAdjustment(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("StockAdjustment-saveStockAdjustment", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await StockAdjustment.deleteStockAdjustment(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("StockAdjustment-deleteStockAdjustment", err);
        }
    });
    
    return router;
}

