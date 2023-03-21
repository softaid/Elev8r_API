
var express = require('express');
var router = express.Router();

module.exports = function (incentiveScheme, oauth, log) {

    router.get('/search/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await incentiveScheme.getAllIncentiveSchemes(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("incentiveScheme.service-getAllIncentiveSchemes", err);
        }
    });

    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await incentiveScheme.getIncentiveScheme(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("incentiveScheme.service-getIncentiveScheme", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await incentiveScheme.saveIncentiveScheme(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("incentiveScheme.service-saveIncentiveScheme", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await incentiveScheme.deleteIncentiveScheme(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("incentiveScheme.service - deleteIncentiveScheme", err);
        }
    });

    return router;
}

