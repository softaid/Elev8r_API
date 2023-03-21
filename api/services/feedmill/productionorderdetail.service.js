
var express = require('express');
var router = express.Router();

module.exports = function (productionOrderDetail, oauth, log) {

    router.get('/search/productionorderid/:productionorderid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await productionOrderDetail.getAllProductionOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrderDetail-getAllproductionOrderDetail", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await productionOrderDetail.getProductionOrderDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrderDetail-getproductionOrderDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await productionOrderDetail.saveProductionOrderDetail(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrderDetail-saveproductionOrderDetail", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await productionOrderDetail.deleteProductionOrderDetail(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("productionOrderDetail-deleteproductionOrderDetail", err);
        }
    });

  

    return router;
}




