
var express = require('express');
var router = express.Router();

module.exports = function (materialrequestdetail, oauth, log) {

    // get all materialrequestdetail
    router.get('/search/:materialrequestid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialrequestdetail.getMaterialRequestDetailsFromRequest(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialrequestdetail-getAllMaterialRequestDetail", err);
        }
    });

    // get materialrequestdetail
    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialrequestdetail.getMaterialRequestDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialrequestdetail-getMaterialRequestDetail", err);
        }
    });

     // save materialrequestdetail
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await materialrequestdetail.saveMaterialRequestDetail(request, request.body);
            console.log("Rows : ",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialrequestdetail-saveMaterialRequestDetail", err);
        }  
    });

    // delete materialrequestdetail
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await materialrequestdetail.deleteMaterialRequestDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialrequestdetail-deleteMaterialRequestDetail", err);
        }
    });

    return router;
}

