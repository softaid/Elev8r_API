
var express = require('express');
var router = express.Router();

module.exports = function (Company, oauth, log) {



    router.get('/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Company.getCompany(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Company-getCompany", err);
        }
    });

    return router;
}

