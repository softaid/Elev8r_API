
var express = require('express');
var router = express.Router();

module.exports = function (agreement, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await agreement.getAllFarmerAgreement(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("agreement.service-getAllFarmerAgreement", err);
        }
    });

    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await agreement.getFarmerAgreement(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("agreement.service-getFarmerAgreement", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await agreement.saveFarmerAgreement(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            console.log("saved data : ",rows);
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("agreement.service-saveFarmerAgreement", err);
        }

    });
        
    router.delete('/delete/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await agreement.deleteFarmerAgreement(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("agreement.service - deleteFarmerAgreement", err);
        }
    });

    return router;
}

