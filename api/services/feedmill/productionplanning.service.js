var express = require('express');
var router = express.Router();

module.exports = function (ProductionPlanning, oauth, log) {

    router.get('/locationsearch/lid/:lid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionPlanning.getModule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionPlanning-getModule", err);
        }
    });

    router.get('/generateplan/:moduleids/:locationid/:fromdate/:todate/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionPlanning.getgenerateProductionPlan(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionPlanning-getgenerateProductionPlan", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        let rows = await ProductionPlanning.saveproductionplan(request, request.body);
        let location = JSON.parse(JSON.stringify(rows))[2][0]; ``
        response.status(200).send(location);

    });

    router.post('/saveproductionplanparent', oauth.ensureLoggedIn, async function (request, response, next) {

        let rows = await ProductionPlanning.saveproductionplanparent(request, request.body);
        let location = JSON.parse(JSON.stringify(rows))[2][0]; ``
        response.status(200).send(location);

    });

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionPlanning.getproductanditems(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionPlanning-getproductanditems", err);
        }
    });

    router.get('/search/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionPlanning.getAllProductionPlanning(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionPlanning-getAllProductionPlanning", err);
        }
    });

    router.get('/selectProductionPlanning/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionPlanning.getProductionPlanning(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionPlanning-getProductionPlanning", err);
        }
    });

    router.get('/search/productionplanningid/:productionplanningid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionPlanning.getProductionPlanningDetail(request, request.params);
            console.log("result",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionPlanning-getProductionPlanningDetail", err);
        }
    });

     //save REceipt  for production
     router.get('/productionordersave/:id/:companyid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ProductionPlanning.saveProducctionOrder(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ProductionPlanning-saveProducctionOrder", err);
        }
    });





    return router;
}    