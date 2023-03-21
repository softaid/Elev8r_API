

var express = require('express');
var router = express.Router();

module.exports = function (ReceiptFromProduction, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ReceiptFromProduction.getAllReceiptFromProduction(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ReceiptFromProduction-getAllReceiptFromProduction", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ReceiptFromProduction.getReceiptFromProduction(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ReceiptFromProduction-getReceiptFromProduction", err);
        }
    });

            //SAVE SERVICE

   
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await ReceiptFromProduction.saveReceiptFromProduction(request, request.body);
            console.log("rows",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("ReceiptFromProduction-saveReceiptFromProduction", err);
        }

    });

            //DELETE SERVICE

    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ReceiptFromProduction.deleteReceiptFromProduction(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ReceiptFromProduction.Service - deleteReceiptFromProduction", err);
        }
    });

    //save REceipt  for production
    router.get('/production_receipt_id/:production_receipt_id/companyid/:companyid/userid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ReceiptFromProduction.saveReceiptForProductionJE(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ReceiptFromProduction-saveReceiptForProductionJE", err);
        }
    });
// get receipt for production by productio order id
    router.get('/productionorder_id/:productionorder_id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ReceiptFromProduction.getReceiptFromProductionByPoId(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ReceiptFromProduction-getReceiptFromProductionByPoId", err);
        }
    });
  router.get('/production_issue_id/:production_issue_id/company_id/:company_id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ReceiptFromProduction.getProductionIssueCost(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ReceiptFromProduction-getProductionIssueCost", err);
        }
    });

    router.get('/search/from_date/:from_date/to_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ReceiptFromProduction.getReceiptFromProductionList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ReceiptFromProduction-getReceiptFromProductionList", err);
        }
    });
   

        
   

    return router;
}

