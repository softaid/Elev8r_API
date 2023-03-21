
var express = require('express');
var router = express.Router();

module.exports = function (commondashboard, oauth, log) {

    router.get('/SI/search/company_id/:company_id/to_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await commondashboard.getOverDueInvoices(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("commondashboard.service-getOverDueInvoices", err);
        }
    });
    router.get('/PI/search/company_id/:company_id/to_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await commondashboard.getOverDuePIInvoices(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("commondashboard.service-getOverDuePIInvoices", err);
        }
    });
    router.get('/pandl/search/to_date/:to_date/company_id/:company_id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await commondashboard.getCommonDashboardPandL(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("commondashboard.service-get_Profitandloss_data", err);
        }
    });

    return router;
}

