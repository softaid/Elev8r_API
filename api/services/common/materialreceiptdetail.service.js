
var express = require('express');
var router = express.Router();

module.exports = function (materialreceiptdetail, oauth, log) {

    // get all materialreceiptdetail
    router.get('/search/:materialreceiptid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialreceiptdetail.getAllMaterialReceiptDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialreceiptdetail-getAllMaterialReceiptDetail", err);
        }
    });

    // get materialreceiptdetail
    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialreceiptdetail.getMaterialReceiptDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialreceiptdetail-getMaterialReceiptDetail", err);
        }
    });

     // save materialreceiptdetail
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await materialreceiptdetail.saveMaterialReceiptDetail(request, request.body);
            console.log("Rows : ",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialreceiptdetail-saveMaterialReceiptDetail", err);
        }  
    });

    // delete materialreceiptdetail
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialreceiptdetail.deleteMaterialReceiptDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialreceiptdetail-deleteMaterialReceiptDetail", err);
        }
    });

    //get itembatch from warehouse
    router.get('/select/warehouseid/:warehouseid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialreceiptdetail.getItembatchFromWarehouse(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialreceiptdetail.service - getItembatchFromWarehouse", err);
        }
    });

     //get vaccinated itembatches
     router.get('/select/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialreceiptdetail.getVaccinatedItembatches(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialreceiptdetail.service - getVaccinatedItembatches", err);
        }
    });


    return router;
}

