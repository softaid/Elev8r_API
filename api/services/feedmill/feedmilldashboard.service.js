

var express = require('express');
var router = express.Router();

module.exports = function (feedmilldashboard, oauth, log) {

    router.get('/productionsearch/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await feedmilldashboard.getAllProductiondata(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("feedmilldashboard-getAllProductiondata", err);
        }
    });

    router.get('/gainandlosssearch/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await feedmilldashboard.getAllGainandLossdata(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("feedmilldashboard-getAllGainandLossdata", err);
        }
    });

   
    return router;
}

