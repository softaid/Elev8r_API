
var express = require('express');
var router = express.Router();

module.exports = function (AppSettings, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await AppSettings.getApplicationSettings(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("applicationsettings.service - getApplicationSettings", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await AppSettings.saveApplicationSettings(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("applicationsettings.service - saveApplicationSettings", err);
        }
    });
    
    return router;
}

