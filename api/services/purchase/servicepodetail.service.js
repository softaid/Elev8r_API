
var express = require('express');
var router = express.Router();

module.exports = function (servicepodetail, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await servicepodetail.getAllServicePoDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("servicepodetail-getAllServicePoDetail", err);
        }
    });


    router.get('/select/servicepoid/:servicepoid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await servicepodetail.getServicePoDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("servicepodetail-getServicePoDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await servicepodetail.saveServicePoDetail(request, request.body);
            let serviceresult = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(serviceresult);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("servicepodetail-saveServicePoDetail", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await servicepodetail.deleteServicePoDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("servicepodetail-deleteServicePoDetail", err);
        }
    });

    return router;
}

