
var express = require('express');
var router = express.Router();

module.exports = function (FarmParameter, oauth, log) {


    router.get('/search/:companyid/parametertypeid/:parametertypeid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmParameter.getAllFarmParameters(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmParameter-getAllFarmParameters", err);
        }
    });

    router.get('/select/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmParameter.getFarmParameter(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmParameter-getFarmFarmParameter", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await FarmParameter.saveFarmParameter(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
       catch(err){
           console.log(' Error in router : ', err);
           log.dbErrorLog("FarmParameter-saveFarmFarmParameter", err);
       }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmParameter.deleteFarmParameter(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmParameter-deleteFarmParameter", err);
        }
    });

    
    router.get('/getAll/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmParameter.getFarmParameterByCompany(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmParameter-getFarmParameterByCompany", err);
        }
    });

    return router;
}

