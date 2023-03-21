

var express = require('express');
var router = express.Router();

module.exports = function (billofmaterialdetail, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:bomid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await billofmaterialdetail.getAllBillOfMaterialDetailResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("billofmaterialdetail-getAllBillOfMaterialDetailResult", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await billofmaterialdetail.getBillOfMaterialDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("billofmaterialdetail-getBillOfMaterialDetail", err);
        }
    });

            //SAVE SERVICE

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await billofmaterialdetail.saveBillOfMaterialDetail(request, request.body);
            let location = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(location);
        } catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("billofmaterialdetail-saveBillOfMaterialDetail", err);
        }

    });

            //DELETE SERVICE


        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await billofmaterialdetail.deleteBillOfMaterialDetail(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("billofmaterialdetail-deleteBillOfMaterialDetail", err);
        }
    });

    return router;
}

