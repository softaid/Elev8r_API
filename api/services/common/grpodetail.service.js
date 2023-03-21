
var express = require('express');
var router = express.Router();

module.exports = function (GrpoDetail, oauth, log) {

    // get all GrpoDetail
    router.get('/search/:grpoid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await GrpoDetail.getAllGRPODetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("GrpoDetail-getAllGRPODetail", err);
        }
    });

    // get GrpoDetail
    router.get('/select/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await GrpoDetail.getGRPODetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("GrpoDetail-getGRPODetail", err);
        }
    });

     // save GrpoDetail
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await GrpoDetail.saveGRPODetail(request, request.body);
            let result = JSON.parse(JSON.stringify(rows)); 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("GrpoDetail-saveGRPODetail", err);
        }  
    });

    // delete GrpoDetail
    router.delete('/:id/:companyid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await GrpoDetail.deleteGRPODetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("GrpoDetail-deleteGRPODetail", err);
        }
    });

    //get grpoby servicepo
    
    router.get('/grposearch/:grpoid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await GrpoDetail.getAllGRPODetailBySerPO(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("GrpoDetail-getAllGRPODetailBySerPO", err);
        }
    });

    //get save JE
    
    router.get('/saveje/:grpoid/moduleid/:moduleid/companyid/:companyid/userid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await GrpoDetail.saveJE(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("GrpoDetail-saveJE", err);
        }
    });
	
	router.get('/savegrpoje/:grpoid/companyid/:companyid/userid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await GrpoDetail.saveGRPOJE(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("GrpoDetail-saveGRPOJE", err);
        }
    });

    // get GrpoDetail by grpoids
    router.get('/grpoids/:grpoid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await GrpoDetail.getGRPODetailByGRPOids(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("GrpoDetail-getGRPODetailByGRPOids", err);
        }
    });

    return router;
}

