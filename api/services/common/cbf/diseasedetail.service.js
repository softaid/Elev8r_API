
var express = require('express');
var router = express.Router();

module.exports = function (DiseaseDetail, oauth, log) {

    router.get('/search/diseaseid/:diseaseid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await DiseaseDetail.getAllDiseaseDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("DiseaseDetail-getAllDiseaseDetail", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await DiseaseDetail.getDiseaseDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("DiseaseDetail-getDiseaseDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await DiseaseDetail.saveDiseaseDetail(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("DiseaseDetail-saveDiseaseDetail", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await DiseaseDetail.deleteDiseaseDetail(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("DiseaseDetail-deleteDiseaseDetail", err);
        }
    });

    return router;
}



