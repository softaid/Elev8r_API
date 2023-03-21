
var express = require('express');
var router = express.Router();

module.exports = function (breederliftingweightdetail, oauth, log) {

    


    router.get('/search/:breederliftingweightid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await breederliftingweightdetail.getAllBreederLfWeightDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederliftingweightdetail.service-getAllBreederLfWeightDetail", err);
        }
    });

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await breederliftingweightdetail.getBreederLfWeightDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederliftingweightdetail.service-getBreederLfWeightDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await breederliftingweightdetail.saveBreederLfWeightDetail(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederliftingweightdetail.service-saveBreederLfWeightDetail", err);
        }

    });
  
    return router;
};