
var express = require('express');
var router = express.Router();

module.exports = function (Warehouse, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Warehouse.getAllWarehouse(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("warehouse-getAllWarehouse", err);
        }
    });


    // get warehouse
    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Warehouse.getWarehouse(request, request.params);
            console.log("Breeder result: ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Warehouse-getWarehouse", err);
        }
    });

    // get modulewise warehouse addresses 
    router.get('/address/:moduleid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Warehouse.getWarehouseAddress(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Warehouse-getWarehouse", err);
        }
    });

     // save warehouse
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await Warehouse.saveWarehouse(request, request.body);
            console.log("Rows : ",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Warehouse-saveWarehouse", err);
        }  
    });

    // // delete Warehouse
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await Warehouse.deleteBreederBatchPlacement(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("Warehouse-deleteBreederBatchPlacement", err);
    //     }
    // });

    return router;
}

