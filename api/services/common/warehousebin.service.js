
var express = require('express');
var router = express.Router();

module.exports = function (WarehouseBin, oauth, log) {

    router.get('/search/warehouseid/:warehouseid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await WarehouseBin.getAllWarehouseBinSearch(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("warehousebin-getAllWarehouseBinSearch", err);
        }
    });

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

     // get warehouse bin
     router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await WarehouseBin.getWarehouseBin(request, request.params);
            console.log("Breeder result: ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("warehousebin-getWarehouseBin", err);
        }
    });


     // save WarehouseBin
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await WarehouseBin.saveWarehouseBin(request, request.body);
            console.log("Rows : ",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("WarehouseBin-saveWarehouseBin", err);
        }  
    });

    return router;
}

