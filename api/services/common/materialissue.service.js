
var express = require('express');
var router = express.Router();

module.exports = function (materialissue, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialissue.getAllMaterialIssue(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialissue-getAllMaterialIssue", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialissue.getMaterialIssue(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialissue-getMaterialIssue", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await materialissue.saveMaterialIssue(request, request.body);
            let result =  JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialissue-saveMaterialIssue", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {            
             let result = await materialissue.deleteMaterialIssue(request, request.body);
             response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialissue-deleteMaterialIssue", err);
        }
    });

    router.get('/hatcherbatchsearch/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialissue.getmaterialIssueTypeHatcherBatch(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialissue-getmaterialIssueTypeHatcherBatch", err);
        }
    });

    return router;
}

