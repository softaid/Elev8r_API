
var express = require('express');
var router = express.Router();

module.exports = function (SymptomsDetail, oauth, log) {

    router.get('/search/symptomsid/:symptomsid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SymptomsDetail.getAllSymptomsDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("SymptomsDetail-getAllSymptomsDetail", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SymptomsDetail.getSymptomsDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("SymptomsDetail-getSymptomsDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await SymptomsDetail.saveSymptomsDetail(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("SymptomsDetail-saveSymptomsDetail", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await SymptomsDetail.deleteSymptomsDetail(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("SymptomsDetail-deleteSymptomsDetail", err);
        }
    });

    return router;
}



