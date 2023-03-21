var express = require('express');
var router = express.Router();

module.exports = function (salesReports, oauth, log) {

    // get setting batch report
    // router.get('/itemwisesalereport/fromdate/:fromdate/todate/:todate/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

    //     try {
    //         let result = await salesReports.getItemWiseSaleReport(request, request.params);
    //         response.send(result);
    //         
   //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("salesReports-getItemWiseSaleReport", err);
    //     }
    // });

    router.get('/itemwisesalereport/fromdate/:fromdate/todate/:todate/partyid/:partyid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {

        try {
            let result = await salesReports.getItemWiseSaleReport(request, request.params);
            response.send(result);
                    }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("salesReports-getItemWiseSaleReport", err);
        }
    });

    return router;
}
