
var express = require('express');
var router = express.Router();

module.exports = function (LesionDetail, oauth, log) {

    router.get('/search/lesionid/:lesionid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LesionDetail.getAllLesionDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LesionDetail-getAllLesionDetail", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LesionDetail.getLesionDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LesionDetail-getLesionDetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await LesionDetail.saveLesionDetail(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LesionDetail-saveLesionDetail", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await LesionDetail.deleteLesionDetail(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("LesionDetail-deleteLesionDetail", err);
        }
    });

    return router;
}



