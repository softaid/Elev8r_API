
var express = require('express');
var router = express.Router();

module.exports = function (cbfopening, oauth, log) {

    router.get('/search/:cbfopeningbalanceid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfopening.getAllCbfOpeningBalanceDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfopening.service-getAllCbfOpeningBalanceDetail", err);
        }
    });

    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfopening.getCbfOpeningBalanceDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfopening.service-getCbfOpeningBalanceDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await cbfopening.saveCbfOpeningBalanceDetail(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfopening.service-saveCbfOpeningBalanceDetail", err);
        }

    });
        
    router.delete('/delete/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfopening.deleteCbfOpeningBalanceDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfopening.service - deleteCbfOpeningBalanceDetail", err);
        }
    });

    router.get('/searchshed/:farmerenquiryid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfopening.getAllShedDimension(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfopening.service-getAllShedDimension", err);
        }
    });


    return router;
}

