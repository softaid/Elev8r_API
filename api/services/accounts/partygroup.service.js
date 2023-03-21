
var express = require('express');
var router = express.Router();

module.exports = function (partygroup, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await partygroup.getAllPartyGroups(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("partygroup.service-getAllPartyGroups", err);
        }
    });

    router.get('/:id/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await partygroup.getPartyGroup(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("partygroup.service-getPartyGroup", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await partygroup.savePartyGroup(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("partygroup.service-savePartyGroup", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await partygroup.deletePartyGroup(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("partygroup.service - deletePartyGroup", err);
        }
    });

    return router;
}

