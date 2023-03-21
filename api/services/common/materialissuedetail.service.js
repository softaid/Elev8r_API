
var express = require('express');
var router = express.Router();

module.exports = function (materialissuedetail, oauth, log) {

    // get all materialissuedetail
    router.get('/search/:materialissueid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialissuedetail.getAllMaterialIssueDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialissuedetail-getAllMaterialIssueDetail", err);
        }
    });

    // get materialissuedetail
    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialissuedetail.getMaterialIssueDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialissuedetail-getMaterialIssueDetail", err);
        }
    });

     // save materialissuedetail
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await materialissuedetail.saveMaterialIssueDetail(request, request.body);
            console.log("Rows : ",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialissuedetail-saveMaterialIssueDetail", err);
        }  
    });

    // delete materialissuedetail
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialissuedetail.deleteMaterialIssueDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialissuedetail-deleteMaterialIssueDetail", err);
        }
    });

    return router;
}

