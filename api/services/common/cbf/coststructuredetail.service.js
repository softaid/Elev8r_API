
var express = require('express');
var router = express.Router();

module.exports = function (CostStructuredetail, oauth, log) {

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await CostStructuredetail.saveSchemeManagement(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("CostStructuredetail.service - saveSchemeManagement", err);
        }  
    });


    router.get('/search/coststructureid/:coststructureid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CostStructuredetail.getAllCostStructuredetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CostStructuredetail-getAllCostStructuredetail", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CostStructuredetail.getCostStructuredetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CostStructuredetail-getCostStructuredetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await CostStructuredetail.saveCostStructuredetail(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CostStructuredetail-saveCostStructuredetail", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CostStructuredetail.deleteCostStructuredetail(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CostStructuredetail-deleteCostStructuredetail", err);
        }
    });

    return router;
}



