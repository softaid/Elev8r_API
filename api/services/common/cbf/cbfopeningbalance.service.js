
var express = require('express');
var router = express.Router();

module.exports = function (cbfopening, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfopening.getAllCbfOpeningBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfopening.service-getAllCbfOpeningBalance", err);
        }
    });

    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfopening.getCbfOpeningBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfopening.service-getCbfOpeningBalance", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await cbfopening.saveCbfOpeningBalance(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfopening.service-saveCbfOpeningBalance", err);
        }

    });
        
    router.delete('/delete/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfopening.deleteCbfOpeningBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfopening.service - deleteCbfOpeningBalance", err);
        }
    });

    router.get('/locationwise/:locationid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfopening.getLocationwiseFarmerenquiry(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfopening.service-getLocationwiseFarmerenquiry", err);
        }
    });

    return router;
}

