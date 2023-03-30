var express = require("express");
var router = express.Router;

module.exports = function (lead, oauth, log) {

    // start leads services

    // get all leads by companyid
    router.get('/searchlead/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await lead.getAllLeads(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("lead.service-getAllLeads", err);
        }
    });

    // get leads by id
    router.get('/leadselect/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await lead.getLeads(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("lead.service-getLeads", err);
        }
    });

    // save leads 
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let rows = await lead.saveLead(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("lead.service-saveLead", err);
        }

    });

    // delete  leads by id
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await lead.deletelead(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("lead.service - deletelead", err);
        }
    });

    // END leads services
    // start leadaddress services


    // get all leadaddress by companyid
    router.get('/searchleadaddress/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await lead.getAllLeadAddress(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("lead.service-getAllLeadAddress", err);
        }
    });

    // get leadaddress by id
    router.get('/leadaddressselect/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await lead.getLeadAddress(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("lead.service-getLeadAddress", err);
        }
    });

    // save leadaddress 
    router.post('/leadaddress', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let rows = await lead.saveLeadAddress(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("lead.service-saveLeadAddress", err);
        }

    });

    // delete  leadaddress by id
    router.delete('/leadaddressdelete/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await lead.deleteLeadAddress(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("lead.service - deleteLeadAddress", err);
        }
    });

    // END leadaddress service

}