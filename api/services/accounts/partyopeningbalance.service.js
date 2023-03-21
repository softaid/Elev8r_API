
var express = require('express');
var router = express.Router();

module.exports = function (Partyopnbal, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Partyopnbal.getAllPartyOpeningBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Partyopnbal.service-getAllPartyOpeningBalance", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Partyopnbal.getPartyOpeningBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Partyopnbal.service-getPartyOpeningBalance", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await Partyopnbal.savePartyOpeningBalance(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Partyopnbal.service-savePartyOpeningBalance", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Partyopnbal.deletePartyOpeningBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Partyopnbal.service - deletePartyOpeningBalance", err);
        }
    });

    return router;
}

