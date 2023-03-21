

var express = require('express');
var router = express.Router();

module.exports = function (testtemplate, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await testtemplate.getAllTestTemplateResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("testtemplate-getAllTestTemplateResult", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await testtemplate.getTestTemplate(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("testtemplate-getTestTemplate", err);
        }
    });

            //SAVE SERVICE

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        let rows = await testtemplate.saveTestTemplate(request, request.body);
        let location = JSON.parse(JSON.stringify(rows))[2][0]; 
        response.status(200).send(location);

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await testtemplate.deleteTestTemplate(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("testtemplate.Service - deleteTestTemplate", err);
        }
    });

        
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await Warehouse.deleteLocation(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("location-deleteLocation", err);
    //     }
    // });

    router.get('/search/item/:item', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await testtemplate.getTestTemplateList(request, request.params);
            console.log("report result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("testtemplate-getTestTemplateList", err);
        }
    });

    return router;
}

