
var express = require('express');
var router = express.Router();

module.exports = function (FarmGrade, oauth, log) {

    router.get('/search/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmGrade.getAllFarmGrade(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmGrade-getAllFarmGrade", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmGrade.getFarmGrade(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmGrade-getFarmGrade", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await FarmGrade.saveFarmGrade(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmGrade-saveFarmGrade", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await FarmGrade.deleteFarmGrade(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("FarmGrade-deleteFarmGrade", err);
        }
    });

    return router;
}

