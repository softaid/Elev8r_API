
var express = require('express');
var router = express.Router();

module.exports = function (CbfShed, oauth, log) {

    // get all CbfShed
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfShed.getAllCbfShedreadyRecords(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfShed-getAllCbfShedreadyRecords", err);
        }
    });

    // get cbfshed
    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfShed.getCbfShedready(request, request.params);
            console.log("Breeder result: ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfShed-getCbfShedready", err);
        }
    });

     // save cbfshed
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await CbfShed.saveCbfShedready(request, request.body);
            console.log("Rows : ",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfShed-saveCbfShedready", err);
        }  
    });

    // delete cbfshed
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfShed.deleteCbfShedready(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfShed-deleteCbfShedready", err);
        }
    });

    // branch wise shed ready
    
    router.get('/branchwise/:branchid/:shedreadystatus/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfShed.getBranchwiseCbfShedready(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfShed-getBranchwiseCbfShedready", err);
        }
    });


    return router;
}

