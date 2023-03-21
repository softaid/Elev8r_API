
var express = require('express');
var router = express.Router();

module.exports = function (agreementdetail, oauth, log) {

    router.get('/search/:farmeragreementid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await agreementdetail.getAllFarmerAgreementDocument(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("agreementdetail.service-getAllFarmerAgreementDocument", err);
        }
    });

    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await agreementdetail.getFarmerAgreementDocument(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("agreementdetail.service-getFarmerAgreementDocument", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await agreementdetail.saveFarmerAgreementDocument(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("agreementdetail.service-saveFarmerAgreementDocument", err);
        }

    });
        
    router.delete('/delete/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await agreementdetail.deleteFarmerAgreementDocument(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("agreementdetail.service - deleteFarmerAgreementDocument", err);
        }
    });

    return router;
}

