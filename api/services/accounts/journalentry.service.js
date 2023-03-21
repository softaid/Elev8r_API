
var express = require('express');
var router = express.Router();

module.exports = function (journalentry, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await journalentry.getAllJournalEntries(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentry.service-getAllJournalEntries", err);
        }
    });
    router.get('/search/voucher_type/:vouchertypeid/from_date/:from_date/to_date/:to_date/company_id/:company_id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await journalentry.getJournalEntrieList(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentry.service-getJournalEntrieList", err);
        }
    });
    router.get('/search/voucher_mode/:vouchermodeid/from_date/:from_date/to_date/:to_date/company_id/:company_id/vouchertypeid/:vouchertypeid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await journalentry.getincomingpaymentList(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentry.service-getincomingpaymentList", err);
        }
    });
    router.get('/search/voucher_type_id/:voucher_type_id/from_date/:from_date/to_date/:to_date/company_id/:company_id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await journalentry.getcrdrList(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentry.service-getcrdrList", err);
        }
    });


    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await journalentry.getJournalEntry(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentry.service-getJournalEntry", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let rows = await journalentry.saveJournalEntry(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows));
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentry.service-saveJournalEntry", err);
        }

    });

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await journalentry.deleteJournalEntry(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentry.service - deleteJournalEntry", err);
        }
    });


    // get je entries for bank reconciliation
    router.get('/searchpostdatedsearch/:bankid/:bankledgerid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await journalentry.getPostdatedCheques(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentry.service-getPostdatedCheques", err);
        }
    });

    // save bank reconciliation

    router.post('/savebankreconciliation/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let rows = await journalentry.saveBankReconciliation(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows));
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("journalentry.service-saveBankReconciliation", err);
        }

    });



    return router;
}

