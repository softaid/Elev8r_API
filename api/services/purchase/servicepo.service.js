
var express = require('express');
var router = express.Router();

module.exports = function (servicepo, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await servicepo.getAllServicePo(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("servicepo-getAllServicePo", err);
        }
    });


    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await servicepo.getServicePo(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("servicepo-getServicePo", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("request",request);
        try{
            let rows = await servicepo.saveServicePo(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 

            console.log("servicePob n.. ",result);
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("servicePo-saveServicePo", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await servicepo.deleteServicePo(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("servicepo-deleteServicePo", err);
        }
    });
    
    router.get('/withoutgrposearch/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await servicepo.getAllServicePoWithoutGrpo(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("servicepo-getAllServicePo", err);
        }
    });

    router.get('/search/from_date/:from_date/to_date/:to_date', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await servicepo.getServicePoList(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("servicepo-getServicePoList", err);
        }
    });

    return router;
}

