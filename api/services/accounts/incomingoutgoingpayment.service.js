
var express = require('express');
var router = express.Router();

module.exports = function (Payment, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Payment.getAllIncomingOutgoingPayment(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Payment.service-getAllIncomingOutgoingPayment", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Payment.getIncomingOutgoingPayment(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Payment.service-getIncomingOutgoingPayment", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await Payment.saveIncomingOutgoingPayment(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Payment.service-saveIncomingOutgoingPayment", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Payment.deleteIncomingOutgoingPayment(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Payment.service - deleteIncomingOutgoingPayment", err);
        }
    });

    router.get('/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Payment.getPartyWisePartyOpeningBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Payment.service-getPartyWisePartyOpeningBalance", err);
        }
    });

    router.get('/paymenttype/:paymenttypeid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Payment.getIncomingOutgoingPaymentByType(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Payment.service-getIncomingOutgoingPaymentByType", err);
        }
    });

    return router;
}

