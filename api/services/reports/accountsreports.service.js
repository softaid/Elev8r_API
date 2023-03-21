
var express = require('express');
var router = express.Router();

module.exports = function (AccountsReports, oauth, log) {

        // get subledger register 
       
        router.get('/subledgerregister/:partyroleid/:partyid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getSubledgerRegister(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getSubledgerRegister", err);
            }
        });

	// get PayableBalance Report
       
         router.get('/payablebalance/:partyid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getPayableBalanceReport(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getPayableBalanceReport", err);
            }
        });

	 // get PayableBalance Report
       
          router.get('/receivablebalance/:partyid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getReceivableBalanceReport(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getReceivableBalanceReport", err);
            }
        });


          // get subledger register for single party 
       
          router.get('/subledgerregisterforsingleparty/:partyroleid/:partyid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getSubledgerRegisterforsingleparty(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getSubledgerRegisterforsingleparty", err);
            }
        });

        // get general ledger register

        router.get('/glregister/:ledgerid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getGLRegister(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getGLRegister", err);
            }
        });

	        // get general ledger register

          router.get('/glregistersinglrledger/:ledgerid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getGLRegistersingleledger(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getGLRegistersingleledger", err);
            }
        });

        //get bank book
        router.get('/bankbookregister/:ledgerid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getBankBookRegister(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getBankBookRegister", err);
            }
        });
        
       //get cash book
       router.get('/cashbookregister/:ledgerid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await AccountsReports.getCashBookRegister(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("AccountsReports-getCashBookRegister", err);
        }
    });

        //get general ledger trial balance
        router.get('/gltb/:branchid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getGLTrialBalance(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getGLTrialBalance", err);
            }
        });
        
  
        router.get('/daybooksearch/:date/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getDayBook(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getDayBook", err);
            }
        });

        //balance sheet 
        router.get('/balancesheet/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getBalanceSheet(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getBalanceSheet", err);
            }
        });

        //Profit and loss sheet 
        router.get('/profitandloss/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getProfitAndLoss(request, request.params);
                response.send(result);
                console.log("result : ",result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getProfitAndLoss", err);
            }
        });
  //Profit and loss sheet Diff
        router.get('/profitandlossdiff/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getProfitAndLossDiff (request, request.params);
                response.send(result);
                console.log("result : ",result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getProfitAndLoss", err);
            }
        });



        //get sub ledger trial balance
        router.get('/sltb/:branchid/:partyroleid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await AccountsReports.getSLTrialBalance(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("AccountsReports-getSLTrialBalance", err);
            }
        });
    return router;
}

