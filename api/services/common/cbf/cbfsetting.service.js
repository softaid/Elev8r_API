
var express = require('express');
var router = express.Router();

module.exports = function (CbfSetting, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfSetting.getCbfSetting(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfSetting-getCbfSetting", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await CbfSetting.saveCbfSetting(request, request.body);
            console.log("rows",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfSetting-saveCbfSetting", err);
        }

    });
   
    return router;
}

