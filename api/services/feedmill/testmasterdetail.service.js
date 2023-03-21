

var express = require('express');
var router = express.Router();

module.exports = function (testmasterdetail, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:testmasterid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await testmasterdetail.getAllTestMasterDetailResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("testmasterdetail-getAllTestMasterDetailResult", err);
        }
    });

      //SEARCH SERVICE For GetAllTestValue

      router.get('/testvaluesearch/:testid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await testmasterdetail.getAllTestMasterDetailtestValue(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("testmasterdetail-getAllTestMasterDetailtestValue", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await testmasterdetail.getTestMasterDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("testmasterdetail-getTestMasterDetail", err);
        }
    });

            //SAVE SERVICE

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await testmasterdetail.saveTestMasterDetail(request, request.body);
            let location = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(location);
        } catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("testmasterdetail-saveTestMasterDetail", err);
        }

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await testmasterdetail.deleteTestMasterDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("testmasterdetail.Service - deleteTestMasterDetail", err);
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

