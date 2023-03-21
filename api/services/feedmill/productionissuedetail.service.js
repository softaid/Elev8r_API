

var express = require('express');
var router = express.Router();

module.exports = function (ProductionIssueDetail, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:production_issue_id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssueDetail.getAllProductionIssueDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssueDetail-getAllProductionIssueDetail", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssueDetail.getProductionIssueDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssueDetail-getProductionIssueDetail", err);
        }
    });

            //SAVE SERVICE

   
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await ProductionIssueDetail.saveProductionIssueDetail(request, request.body);
            console.log("rows",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssue-saveProductionIssueDetail", err);
        }

    });

            //DELETE SERVICE

    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssueDetail.deleteProductionIssueDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssueDetail.Service - deleteProductionIssueDetail", err);
        }
    });

    router.get('/production_issue_id/:production_issue_id/companyid/:companyid/userid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionIssueDetail.saveProductionIssueJE(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssueDetail-saveProductionIssueJE", err);
        }
    });

    router.post('/itembatchinstockqty/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            
            let result = await ProductionIssueDetail.getItemBatchInSatockQty(request, request.body);
            console.log("result",result);
            response.send(result);

        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssueDetail-getItemBatchInSatockQty", err);
        }  
    });
    router.post('/savematerialmom/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            
            let result = await ProductionIssueDetail.saveMaterialMomForProduction(request, request.body);
            response.send(result);

        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssueDetail-saveMaterialMomForProduction", err);
        }  
    });

    router.post('/saveMomForIssue/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let result = await ProductionIssueDetail.saveMomForIssue(request, request.body);
            response.send(result);

        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionIssueDetail-saveMomForIssue", err);
        }  
    });
    


        
   

    return router;
}

