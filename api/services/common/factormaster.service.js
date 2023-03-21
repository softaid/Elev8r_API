
var express = require('express');
var router = express.Router();

module.exports = function (factormaster, oauth, log) {
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await factormaster.getAllfactormaster(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("factormaster-getAllfactormaster", err);
        }
    });

    router.get('/select/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await factormaster.getfactormaster(request, request.params);
            
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("factormaster-getfactormaster", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await factormaster.savefactormaster(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("factormaster-savefactormaster", err);
        }

    });

    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await factormaster.deletefactormaster(request, request.params);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("factormaster-deletefactormaster", err);
    //     }
    // });

    return router;

}