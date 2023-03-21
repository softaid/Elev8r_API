
var express = require('express');
var router = express.Router();

module.exports = function (BirdSalesOrderDetail, oauth, log) {

    router.get('/search/:breederbirdsalesorderid/:moduleid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrderDetail.getAllBirdSalesOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrderDetail.service-getAllBirdSalesOrderDetail", err);
        }
    });

  

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await BirdSalesOrderDetail.saveBreederBirdSalesOrderDetail(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrderDetail.service-saveBreederBirdSalesOrderDetail", err);
        }

    });

    router.get('/orderbatch/:breederbirdsalesorderid/:warehouseid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrderDetail.getAllBirdSalesOrderbatch(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrderDetail.service-getAllBirdSalesOrderbatch", err);
        }
    });

    router.get('/orderitem/:breederbirdsalesorderid/:batchid/:warehouseid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrderDetail.getAllBirdSalesOrderItem(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrderDetail.service-getAllBirdSalesOrderItem", err);
        }
    });
        
   

    return router;
};