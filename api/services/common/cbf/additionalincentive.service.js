
var express = require('express');
var router = express.Router();

module.exports = function (AdditionalIncentive, oauth, log) {

    router.get('/search/coststructureid/:coststructureid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await AdditionalIncentive.getAllAdditionalIncentive(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("AdditionalIncentive-getAllAdditionalIncentive", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await AdditionalIncentive.getAdditionalIncentive(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("AdditionalIncentive-getAdditionalIncentive", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await AdditionalIncentive.saveAdditionalIncentive(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("AdditionalIncentive-saveAdditionalIncentive", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await AdditionalIncentive.deleteAdditionalIncentive(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("AdditionalIncentive-deleteAdditionalIncentive", err);
        }
    });

    return router;
}



