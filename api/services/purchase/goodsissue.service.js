
var express = require('express');
var router = express.Router();

module.exports = function (goodsIssue, oauth, log) {
  
    // gat FreightDetail
    router.get('/getwarehouse/:moduleid/:shedid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params : ",request.params);
        try {
            let result = await goodsIssue.getWarehouse(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("goodsIssue-getWarehouse", err);
        }
    });

     // save PurchaseinvoiceDetail
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await goodsIssue.saveGoodsIssue(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("goodsIssue-saveGoodsIssue", err);
        }  
    });
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params : ",request.params);
        try {
            let result = await goodsIssue.getAllGoodsIssue(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("goodsIssue-getAllGoodsIssue", err);
        }
    });

    router.get('/select/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params : ",request.params);
        try {
            let result = await goodsIssue.getGoodsIssue(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("goodsIssue-getGoodsIssue", err);
        }
    });

    router.get('/itembatch/:moduleid/:shedid/:itemid/:warehouseid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try {
            let result = await goodsIssue.getitembatchByModulewise(request, request.params);
            console.log("result",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("goodsIssue-getitembatchByModulewise", err);
        }
    });

    //get save JE
    
    router.get('/savegoodsissueje/:issueid/:companyid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await goodsIssue.saveGoodsIssueJe(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("goodsIssue-saveGoodsIssueJe", err);
        }
    });
     //get save JE
    
     router.get('/savemom/:issueid/:companyid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await goodsIssue.saveMOmFromGoodsIssue(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("goodsIssue-saveMOmFromGoodsIssue", err);
        }
    });


    return router;
}