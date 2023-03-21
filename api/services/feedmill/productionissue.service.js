

var express = require('express');
var router = express.Router();

module.exports = function (ProductionIssue, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssue.getAllProductionIssue(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssue-getAllProductionIssue", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssue.getProductionIssue(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssue-getProductionIssue", err);
        }
    });

            //SAVE SERVICE

   
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await ProductionIssue.saveProductionIssue(request, request.body);
            console.log("rows",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssue-saveProductionIssue", err);
        }

    });

            //DELETE SERVICE

    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssue.deleteProductionIssue(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssue.Service - deleteProductionIssue", err);
        }
    });

    // get item qty by itemid
    
    router.get('/itemqty/:itemid/:warehouseid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssue.getItembatchBalByItemid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssue-getItembatchBalByItemid", err);
        }
    });

    router.get('/podetail/:productionorderid/:transactiondate/:warehouseid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssue.getPodetailForQty(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssue-getPodetailForQty", err);
        }
    });

    router.get('/poissuedetail/:productionorderid/:transactiondate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssue.getPoIssueDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssue-getPoIssueDetail", err);
        }
    });
    router.get('/poissuebatchwisecost/:transactiondate/:item_id/:to_warehouse_id/:quantity/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssue.getPoIssueBatchWiseDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssue-getPoIssueBatchWiseDetail", err);
        }
    });

    router.get('/search/from_date/:from_date/to_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssue.getIssueForProductionList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssue-getIssueForProductionList", err);
        }
    });

    return router;
}

