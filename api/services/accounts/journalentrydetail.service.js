
var express = require('express');
var router = express.Router();

module.exports = function (journalentrydetail, oauth, log) {

    router.get('/search/:journalentryid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await journalentrydetail.getAllJournalEntryDetail(request, request.params);
            console.log("-------------------------------result-------------------------------",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentrydetail.service-getAllJournalEntryDetail", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await journalentrydetail.getJournalEntryDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentrydetail.service-getJournalEntryDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await journalentrydetail.saveJournalEntryDetail(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentrydetail.service-saveJournalEntryDetail", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await journalentrydetail.deleteJournalEntryDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentrydetail.service - deleteJournalEntryDetail", err);
        }
    });

    router.post('/savebatchje/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await journalentrydetail.saveBatchJE(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentrydetail.service-saveBatchJE", err);
        }

    });
  router.post('/inoupayment/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await journalentrydetail.saveincominoutgoingJournalEntryDetail(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentrydetail.service-saveincominoutgoingJournalEntryDetail", err);
        }

    });
	
	router.get('/:ledgerid/:voucherdate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await journalentrydetail.checkBalance(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentrydetail.service-checkBalance", err);
        }
    });

    return router;
}

