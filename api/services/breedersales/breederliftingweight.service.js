
var express = require('express');
var router = express.Router();

module.exports = function (breederliftingweight, oauth, log) {

    


    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await breederliftingweight.getAllBreederLfWeight(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederliftingweight.service-getAllBreederLfWeight", err);
        }
    });

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await breederliftingweight.getBreederLfWeight(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederliftingweight.service-getBreederLfWeight", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await breederliftingweight.saveBreederLfWeight(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederliftingweight.service-saveBreederLfWeight", err);
        }

    });

    router.get('/getwarehouse/:salesorderid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await breederliftingweight.getWarehouseBySalesOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederliftingweight.service-getWarehouseBySalesOrder", err);
        }
    });
  
    return router;
};