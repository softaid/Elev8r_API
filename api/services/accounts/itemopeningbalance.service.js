
var express = require('express');
var router = express.Router();

module.exports = function (ItemOpBal, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ItemOpBal.getAllItemOpeningBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("itemopeningbalance.service - getAllItemOpeningBalance", err);
        }
    });

    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ItemOpBal.getItemOpeningBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("itemopeningbalance.service - getItemOpeningBalance", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await ItemOpBal.saveItemOpeningBalance(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("itemopeningbalance.service - saveItemOpeningBalance", err);
        }
    });
        
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ItemOpBal.deleteItemOpeningBalance(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("itemopeningbalance.service - deleteItemOpeningBalance", err);
        }
    });

    return router;
}

