
var express = require('express');
var router = express.Router();

module.exports = function (SalesInvoiceDetail, oauth, log) {

    router.get('/search/:salesinvoiceid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoiceDetail.getAllSalesInvoiceDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoicedetail-getAllSalesInvoiceDetail", err);
        }
    });


    router.get('/invoicesearch/:salesinvoiceid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoiceDetail.getSalesInvoiceDetailByInvoice(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoicedetail-getSalesInvoiceDetailByInvoice", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoiceDetail.getSalesInvoiceDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoicedetail-getSalesInvoiceDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await SalesInvoiceDetail.saveSalesInvoiceDetail(request, request.body);
            let result =  JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoicedetail-saveSalesInvoiceDetail", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {            
             let result = await SalesInvoiceDetail.deleteSalesInvoiceDetail(request, request.body);
             response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesinvoicedetail-deleteSalesInvoiceDetail", err);
        }
    });
    
    //get save JE
    
    router.get('/savesalesinvoiceje/:salesinvoiceid/companyid/:companyid/userid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesInvoiceDetail.saveSalesInvoiceJE(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("SalesInvoiceDetail-saveSalesInvoiceJE", err);
        }
    });


    return router;
}

