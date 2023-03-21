
var express = require('express');
var router = express.Router();

module.exports = function (salesdelivery, oauth, log) {

    // get all SalesDelivery
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesdelivery.getAllSalesDelivery(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdelivery-getAllSalesDelivery", err);
        }
    });


    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesdelivery.getSalesDelivery(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdelivery-getSalesDelivery", err);
        }
    });


     // save 
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await salesdelivery.saveSalesDelivery(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdelivery-saveSalesDelivery", err);
        }  
    });

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesdelivery.deleteSalesDelivery(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdelivery-deleteSalesDelivery", err);
        }
    });
   

    router.get('/orderdetailsearch/:salesorderid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request.params : ",request.params);
        try {
            let result = await salesdelivery.getSalesOrderDetailOnDelivery(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdelivery-getSalesOrderDetailOnDelivery", err);
        }
    });

    //get save JE
    
    router.get('/savesalesdeliveryje/:salesdeliveryid/companyid/:companyid/userid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesdelivery.saveSalesDeliveryJE(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdelivery-saveSalesDeliveryJE", err);
        }
    });

    router.get('/search/from_date/:from_date/to_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesdelivery.getSalesDeliveryList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdelivery-getSalesDeliveryList", err);
        }
    });

    //save sales invoice by sales delivery id
    
    router.get('/savesalesinvoicebysalesdelivery/:salesdeliveryid/companyid/:companyid/userid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesdelivery.saveSalesInvoiceBySalesDelivery(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdelivery-saveSalesInvoiceBySalesDelivery ", err);
        }
    });


    router.get('/issueitems/:salesdeliveryid/:userid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await salesdelivery.salesDeliveryIssueItems(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesdelivery-salesDeliveryIssueItems", err);
        }
    });

    return router;
}