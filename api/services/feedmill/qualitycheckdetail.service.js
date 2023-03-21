

var express = require('express');
var router = express.Router();

module.exports = function (qualitycheckdetail, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:qualitycheckid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await qualitycheckdetail.getAllQualityCheckDetailResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("qualitycheckdetail-getAllQualityCheckDetailResult", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await qualitycheckdetail.getQualityCheckDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("qualitycheckdetail-getQualityCheckDetail", err);
        }
    });

            //SAVE SERVICE

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await qualitycheckdetail.saveQualityCheckDetail(request, request.body);
            let location = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(location);
        } catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("qualitycheckdetail-saveQualityCheckDetail", err);
        }

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await qualitycheckdetail.deleteQualityCheckDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("qualitycheckdetail.Service - deleteQualityCheckDetail", err);
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

    //get items by poid
    router.get('/getTestIdByFinding/:testid/:finding/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await qualitycheckdetail.getTestIdByFinding(request, request.params);
            console.log("item result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            
            log.dbErrorLog("qualitycheckdetail-getTestIdByFinding", err);
        }
    });

    router.get('/getTestIdByFindingvalue/:testid/:testvalue/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await qualitycheckdetail.getTestIdByFindingForTestvalue(request, request.params);
            console.log("item result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            
            log.dbErrorLog("qualitycheckdetail-getTestIdByFindingForTestvalue", err);
        }
    });


    return router;
}

