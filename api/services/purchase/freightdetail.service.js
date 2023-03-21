
var express = require('express');
var router = express.Router();

module.exports = function (FreightDetail, oauth, log) {
  
    // gat FreightDetail
    router.get('/detailsearch/:purchaseinvoiceid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params : ",request.params);
        try {
            let result = await FreightDetail.getAllFreightDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FreightDetail-getAllFreightDetail", err);
        }
    });

     // save PurchaseinvoiceDetail
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await FreightDetail.saveFreightDetail(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("FreightDetail-saveFreightDetail", err);
        }  
    });
    router.get('/freighttype/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params : ",request.params);
        try {
            let result = await FreightDetail.getAllFreightType(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FreightDetail-getAllFreightType", err);
        }
    });

    

   

    return router;
}