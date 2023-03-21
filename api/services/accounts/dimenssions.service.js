
var express = require('express');
var router = express.Router();

module.exports = function (Dimenssions, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Dimenssions.getAllDimenssions(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Dimenssions.service-getAllDimenssions", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Dimenssions.getDimenssions(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Dimenssions.service-getDimenssions", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await Dimenssions.saveDimenssions(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Dimenssions.service-saveDimenssions", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Dimenssions.deleteDimenssions(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Dimenssions.service - deleteDimenssions", err);
        }
    });

    //get all parent dimenssions
    router.get('/search/parentdimenssions/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Dimenssions.getAllParentDimenssions(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Dimenssions.service - getAllParentDimenssions", err);
        }
    });

    return router;
}

