
var express = require('express');
var router = express.Router();

module.exports = function (cbfshedreadydetail, oauth, log) {

    // get all cbfshedreadydetail
    router.get('/search/:cbfshedreadyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfshedreadydetail.getAllCbfShedreadyDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfshedreadydetail-getAllCbfShedreadyDetail", err);
        }
    });

    // get cbfshedreadydetail
    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfshedreadydetail.getCbfShedreadyDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfshedreadydetail-getCbfShedreadyDetail", err);
        }
    });

     // save cbfshedreadydetail
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await cbfshedreadydetail.saveCbfShedreadyDetail(request, request.body);
            console.log("Rows : ",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfshedreadydetail-saveCbfShedreadyDetail", err);
        }  
    });

    // delete cbfshedreadydetail
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfshedreadydetail.deleteCbfShedreadyDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfshedreadydetail-deleteCbfShedreadyDetail", err);
        }
    });

    return router;
}

