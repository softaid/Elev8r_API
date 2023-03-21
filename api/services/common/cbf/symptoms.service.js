
var express = require('express');
var router = express.Router();

module.exports = function (Symptoms, oauth, log) {

    router.get('/search/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Symptoms.getAllSymptoms(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Symptoms-getAllSymptoms", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Symptoms.getSymptoms(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Symptoms-getSymptoms", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await Symptoms.saveSymptoms(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Symptoms-saveSymptoms", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Symptoms.deleteSymptoms(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Symptoms-deleteSymptoms", err);
        }
    });

    //get leaionby organ id
    router.get('/organid/:organid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Symptoms.getLesionbyOrganId(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Symptoms-getLesionbyOrganId", err);
        }
    });

    //get symptoms by leasionid
    router.get('/lesionid/:lesionid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Symptoms.getSymptomsbyLesionidId(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Symptoms-getSymptomsbyLesionidId", err);
        }
    });

    return router;
}




