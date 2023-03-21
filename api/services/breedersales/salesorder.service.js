
var express = require('express');
var router = express.Router();

module.exports = function (SalesOrder, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesOrder.getAllSalesOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorder-getAllSalesOrder", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesOrder.getSalesOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorder-getSalesOrder", err);
        }
    });

    router.get('/:salestypeid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesOrder.getSalesOrderOnDelivery(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorder-getSalesOrder", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await SalesOrder.saveSalesOrder(request, request.body);
            let result =  JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorder-saveSalesOrder", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {            
             let result = await SalesOrder.deleteSalesOrder(request, request.body);
             response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorder-deleteSalesOrder", err);
        }
    });

   
    router.get('/search_list/from_date/:from_date/to_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesOrder.getSalesOrderList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorder-getSalesOrderList", err);
        }
    }); 
    

    return router;
}

