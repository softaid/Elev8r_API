
var express = require('express');
var router = express.Router();

module.exports = function (line, oauth, log) {

    router.get('/search/:companyid/:branchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await line.getAllLine(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("line.service-getAllLine", err);
        }
    });

    router.get('/select/:companyid/:id/:branchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await line.getLine(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("line.service-getLine", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await line.saveLine(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("line.service-saveLine", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await line.deleteLine(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("line.service - deleteLine", err);
        }
    });

    return router;
}

