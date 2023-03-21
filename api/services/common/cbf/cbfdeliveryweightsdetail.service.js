
var express = require('express');
var router = express.Router();

module.exports = function (cbfdeliverydetail, oauth, log) {

    // get all cbfdeliverydetail
    router.get('/search/:cbf_delivery_weightsid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdeliverydetail.getAllCbfDeliverydetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdeliverydetail-getAllCbfDeliverydetail", err);
        }
    });

    // get cbfdeliverydetail
    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdeliverydetail.getCbfDeliverydetail(request, request.params);
            console.log("Breeder result: ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdeliverydetail-getCbfDeliverydetail", err);
        }
    });

     // save cbfdeliverydetail
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await cbfdeliverydetail.saveCbfDeliverydetail(request, request.body);
            console.log("Rows : ",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdeliverydetail-saveCbfDeliverydetail", err);
        }  
    });

    // delete cbfdeliverydetail
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdeliverydetail.deleteCbfDeliverydetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdeliverydetail-deleteCbfDeliverydetail", err);
        }
    });

    return router;
}

