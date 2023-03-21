
var express = require('express');
var router = express.Router();

module.exports = function (WarehouseBin, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await WarehouseBin.getAllWarehouseBin(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("warehousebin-getAllWarehouseBin", err);
        }
    });

    //warehousewise warehousebin
    router.get('/search/warehouseid/:warehouseid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await WarehouseBin.getAllWarehousewiseWarehouseBin(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("warehousebin-getAllWarehousewiseWarehouseBin", err);
        }
    });

    // router.get('/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await WarehouseBin.getLocation(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("location-getLocation", err);
    //     }
    // });

    // router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

    //     let rows = await WarehouseBin.saveLocation(request, request.body);
    //     let location = JSON.parse(JSON.stringify(rows))[2][0]; 
    //     response.status(200).send(location);

    // });
        
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await WarehouseBin.deleteLocation(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("location-deleteLocation", err);
    //     }
    // });

    return router;
}

