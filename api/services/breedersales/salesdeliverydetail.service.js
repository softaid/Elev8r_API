
var express = require('express');
var router = express.Router();

module.exports = function (salesdeliverydetail, oauth, log) {

    // get all purchase request detail related to purchase request
    router.get('/search/:salesdeliveryid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params : ",request.params);
        try {
            let result = await salesdeliverydetail.getAllSalesDeliveryDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdeliverydetail-getAllSalesDeliveryDetail", err);
        }
    });

    // get purchase request detail for edit
    router.get('/salesorderid/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesdeliverydetail.getSalesDeliveryDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdeliverydetail-getSalesDeliveryDetail", err);
        }
    });
    
    // save purchase request detail
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {        
        try{
            console.log("salesdeliverydetail:",request.body);
            let rows = await salesdeliverydetail.saveSalesDeliveryDetail(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdeliverydetail-saveSalesDeliveryDetail", err);
        }

    });
        
    // delete purchase request detail
    router.delete('/salesorder/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesdeliverydetail.deleteSalesDeliveryDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdeliverydetail-deleteSalesDeliveryDetail", err);
        }
    });

    return router;
}

