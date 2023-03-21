
var express = require('express');
var router = express.Router();

module.exports = function (SalesOrderDetail, oauth, log) {

    router.get('/search/:salesorderid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesOrderDetail.getAllSalesOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorderdetail-getAllSalesOrderDetail", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesOrderDetail.getSalesOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorderdetail-getSalesOrderDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await SalesOrderDetail.saveSalesOrderDetail(request, request.body);
            let result =  JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorderdetail-saveSalesOrderDetail", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {            
             let result = await SalesOrderDetail.deleteSalesOrderDetail(request, request.body);
             response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorderdetail-deleteSalesOrderDetail", err);
        }
    });
    

    return router;
}

