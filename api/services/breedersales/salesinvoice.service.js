
var express = require('express');
var router = express.Router();

module.exports = function (SalesInvoice, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoice.getAllSalesInvoice(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoice-getAllSalesInvoice", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoice.getSalesInvoice(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoice-getSalesInvoice", err);
        }
    });

    router.get('/salesorder/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoice.getSalesOrderOnInvoice(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoice-getSalesInvoice", err);
        }
    });

    router.get('/salesdeliverylist/:salesorderid/:salesinvoiceid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoice.getSalesDeliveryByOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoice-getSalesDeliveryByOrder", err);
        }
    });

    router.get('/deliverydetailsearch/:salesdeliveryids/:salesorderid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoice.getdeliverydetailsearchByOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoice-getSalesDeliveryByOrder", err);
        }
    });


    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await SalesInvoice.saveSalesInvoice(request, request.body);
            let result =  JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoice-saveSalesInvoice", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {            
             let result = await SalesInvoice.deleteSalesInvoice(request, request.body);
             response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoice-deleteSalesInvoice", err);
        }
    });

    router.get('/search/from_date/:from_date/to_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoice.getSalesInvoiceList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoice-getSalesInvoiceList", err);
        }
    });    


    // Issue items by sales invoice
    router.get('/issueitems/:salesinvoiceid/:userid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoice.salesInvoiceIssueItems(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoice-salesInvoiceIssueItems", err);
        }
    });

    return router;
}

