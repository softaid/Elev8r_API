
var express = require('express');
var router = express.Router();

module.exports = function (PaymentDetail, oauth, log) {

    router.get('/search/:incomingoutgoingpaymentid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PaymentDetail.getAllIncomingOutgoingPaymentDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("PaymentDetail.service-getAllIncomingOutgoingPaymentDetail", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PaymentDetail.getIncomingOutgoingPaymentDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("PaymentDetail.service-getIncomingOutgoingPaymentDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("------------CALLED___________________");
        try{
            let rows = await PaymentDetail.saveIncomingOutgoingPaymentDetail(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("PaymentDetail.service-saveIncomingOutgoingPaymentDetail", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PaymentDetail.deleteIncomingOutgoingPaymentDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("PaymentDetail.service - deleteIncomingOutgoingPaymentDetail", err);
        }
    });

    router.get('/vendorid/:vendorid/type/:type/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await PaymentDetail.getPurchaseInvoiceByVendorId(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("PaymentDetail.service-getPurchaseInvoiceByVendorId", err);
        }
    });

    return router;
}

