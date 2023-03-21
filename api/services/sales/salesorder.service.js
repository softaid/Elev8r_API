var express = require('express');
var router = express.Router();

module.exports = function (salesorder, oauth, log) {

    // get all SalesOrder
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesorder.getAllSalesOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorder-getAllSalesOrder", err);
        }
    });

     // save 
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await salesorder.saveSalesOrder(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorder-saveSalesOrder", err);
        }  
    });

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesorder.deleteSalesOrder(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesorder-deleteSalesOrder", err);
        }
    }); 

    return router;
}