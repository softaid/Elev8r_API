
var express = require('express');
var router = express.Router();

module.exports = function (LedgerOpBal, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LedgerOpBal.getAllLedgerOpeningBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ledgeropeningbalance.service - getAllLedgerOpeningBalance", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LedgerOpBal.getLedgerOpeningBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ledgeropeningbalance.service - getLedgerOpeningBalance", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await LedgerOpBal.saveLedgerOpeningBalance(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("ledgeropeningbalance.service - saveLedgerOpeningBalance", err);
        }
    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LedgerOpBal.deleteLedgerOpeningBalance(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ledgeropeningbalance.service - deleteLedgerOpeningBalance", err);
        }
    });

    return router;
}

