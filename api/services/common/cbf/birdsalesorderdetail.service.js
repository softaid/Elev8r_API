
var express = require('express');
var router = express.Router();

module.exports = function (BirdSalesOrderDetail, oauth, log) {

    router.get('/search/:cbfbirdsalesorderid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrderDetail.getAllBirdSalesOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrderDetail.service-getAllBirdSalesOrderDetail", err);
        }
    });

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrderDetail.getBirdSalesOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrderDetail.service-getBirdSalesOrderDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await BirdSalesOrderDetail.saveBirdSalesOrderDetail(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrderDetail.service-saveBirdSalesOrderDetail", err);
        }

    });
        
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await BirdSalesOrderDetail.deleteBirdSalesOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("BirdSalesOrderDetail.service - deleteBirdSalesOrderDetail", err);
        }
    });

    return router;
};