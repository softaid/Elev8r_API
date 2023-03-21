
var express = require('express');
var router = express.Router();

module.exports = function (CommonBranchLine, oauth, log) {

    router.get('/search/branchid/:branchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CommonBranchLine.getAllCommonBranchLine(request,request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CommonBranchLine-getAllCommonBranchLine", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CommonBranchLine.getCommonBranchLine(request,request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CommonBranchLine-getCommonBranchLine", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await CommonBranchLine.saveCommonBranchLine(request,request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CommonBranchLine-saveCommonBranchLine", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CommonBranchLine.deleteCommonBranchLine(request,request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CommonBranchLine-deleteCommonBranchLine", err);
        }
    });

    return router;
}



