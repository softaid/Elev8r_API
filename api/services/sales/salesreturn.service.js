
var express = require('express');
var router = express.Router();

module.exports = function (SalesReturn, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesReturn.getAllSalesReturn(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("SalesReturn-getAllSalesReturn", err);
        }
    });


    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesReturn.getSalesReturn(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("SalesReturn-getSalesReturn", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request",request);
        try{
            let rows = await SalesReturn.saveSalesReturn(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("SalesReturn-saveSalesReturn", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SalesReturn.deleteSalesReturn(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("SalesReturn-deleteSalesReturn", err);
        }
    });
    
    return router;
}

