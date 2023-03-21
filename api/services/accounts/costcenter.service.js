
var express = require('express');
var router = express.Router();

module.exports = function (CostCenter, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CostCenter.getAllCostCenters(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CostCenter.service-getAllCostCenters", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CostCenter.getCostCenter(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CostCenter.service-getCostCenter", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await CostCenter.saveCostCenter(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CostCenter.service-saveCostCenter", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CostCenter.deleteCostCenter(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CostCenter.service - deleteCostCenter", err);
        }
    });

    //get all parent CostCenter
    router.get('/search/parentcostcenter/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CostCenter.getAllParentCostCenter(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CostCenter.service - getAllParentCostCenter", err);
        }
    });

    return router;
}

