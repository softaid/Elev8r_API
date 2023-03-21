
var express = require('express');
var router = express.Router();

module.exports = function (SalesInvoiceFreight, oauth, log) {

    router.get('/search/:salesinvoiceid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoiceFreight.getAllSalesInvoiceFreight(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoicefreight-getAllSalesInvoiceFreight", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoiceFreight.getSalesInvoiceFreight(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoicefreight-getSalesInvoiceFreight", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await SalesInvoiceFreight.saveSalesInvoiceFreight(request, request.body);
            let result =  JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoicefreight-saveSalesInvoiceFreight", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {            
             let result = await SalesInvoiceFreight.deleteSalesInvoiceFreight(request, request.body);
             response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoicefreight-deleteSalesInvoiceFreight", err);
        }
    });
    

    return router;
}

