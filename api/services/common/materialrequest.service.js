
var express = require('express');
var router = express.Router();

module.exports = function (materialrequest, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialrequest.getAllMaterialRequests(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialrequest-getAllMaterialRequests", err);
        }
    });

    router.get('/search/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialrequest.getMaterialRequestByCompanyid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialrequest-getMaterialRequestByCompanyid", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialrequest.getMaterialRequest(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialrequest-getMaterialRequest", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await materialrequest.saveMaterialRequest(request, request.body);
            let result =  JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialrequest-saveMaterialRequest", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {            
             let result = await materialrequest.deleteMaterialRequest(request, request.body);
             response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialrequest-deleteMaterialRequest", err);
        }
    });

    //get batches by request target
    router.get('/search/:companyid/:requesttarget', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialrequest.getBatchesByRequesTtarget(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialrequest-getBatchesByRequesTtarget", err);
        }
    });

    return router;
}

