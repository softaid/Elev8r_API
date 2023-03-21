
var express = require('express');
var router = express.Router();

module.exports = function (Party, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Party.getAllParties(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("party.service - getAllParties", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Party.getParty(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("party.service - getParty", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await Party.saveParty(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
	    console.log(' result in router : ', result );
	    console.log(' rows in router : ', rows );


            response.status(200).send(result);
            
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("party.service - saveParty", err);
        }

    });

    router.get('/partyaddress/:partyid/:addresstypeid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Party.getPartyAddresses(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("party.service - getAllParties", err);
        }
    });

    router.post('/partyaddress', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await Party.savePartyAddress(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("party.service - savePartyAddress", err);
        }
        
    });

    router.post('/partycontact', oauth.ensureLoggedIn, async function (request, response, next) {
        
        debugger;
        try{
            let rows = await Party.savePartyContact(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("party.service - savePartyContact", err);
        }
        
    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Party.deleteParty(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("party.service - deleteParty", err);
        }
    });

    //get rolewise parties
    router.get('/roleid/:roleid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Party.getRolewiseParties(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("party.service - getRolewiseParties", err);
        }
    });

    //get rolewise party groups
    router.get('/roleids/:partyroleids/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Party.getRolewisePartyGroups(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("party.service - getRolewisePartyGroups", err);
        }
    });

    return router;
}

