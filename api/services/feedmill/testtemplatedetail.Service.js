

var express = require('express');
var router = express.Router();

module.exports = function (testtemplatedetail, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:testtemplateid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await testtemplatedetail.getAllTestTemplateDetailResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("testtemplatedetail-getAllTestTemplateDetailResult", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await testtemplatedetail.getTestTemplateDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("testtemplatedetail-getTestTemplateDetail", err);
        }
    });

            //SAVE SERVICE

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        let rows = await testtemplatedetail.saveTestTemplateDetail(request, request.body);
        let location = JSON.parse(JSON.stringify(rows))[2][0]; 
        response.status(200).send(location);

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await testtemplatedetail.deleteTestTemplateDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("testtemplatedetail.Service - deleteTestTemplateDetail", err);
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

    return router;
}

