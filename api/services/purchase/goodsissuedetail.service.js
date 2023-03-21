
var express = require('express');
var router = express.Router();

module.exports = function (goodsIssueDetail, oauth, log) {
  


     // save PurchaseinvoiceDetail
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await goodsIssueDetail.saveGoodsIssueDetail(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("goodsIssueDetail-saveGoodsIssueDetail", err);
        }  
    });
    router.get('/search/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await goodsIssueDetail.getGoodsIssueDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("goodsIssueDetail-getGoodsIssueDetail", err);
        }
    });

    router.get('/search/:moduleid/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await goodsIssueDetail.getGoodsIssueDetailSearch (request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("goodsIssueDetail-getGoodsIssueDetailSearch ", err);
        }
    });





    return router;
}