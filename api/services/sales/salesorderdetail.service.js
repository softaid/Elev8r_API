
var express = require('express');
var router = express.Router();

module.exports = function (salesorderdetail, oauth, log) {

    // get all purchase request detail related to purchase request
    router.get('/detailsearch/:salesorderid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params : ",request.params);
        try {
            let result = await salesorderdetail.getAllSalesOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorderdetail-getAllSalesOrderDetail", err);
        }
    });

    // get purchase request detail for edit
    router.get('/salesorderid/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesorderdetail.getSalesOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorderdetail-getSalesOrderDetail", err);
        }
    });
    
    // save purchase request detail
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {        
        try{
            console.log("salesorderdetail:",request.body);
            let rows = await salesorderdetail.saveSalesOrderDetail(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorderdetail-saveSalesOrderDetail", err);
        }

    });
        
    // delete purchase request detail
    router.delete('/salesorder/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesorderdetail.deleteSalesOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorderdetail-deleteSalesOrderDetail", err);
        }
    });

    return router;
}

