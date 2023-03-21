
var express = require('express');
var router = express.Router();

module.exports = function (layereggscollection, oauth, log) {

    // Get all layereggscollection
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await layereggscollection.getAllLayerEggsCollections(request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("layereggscollection-getAllLayerEggsCollections", err);
        }
    });

     //select layereggscollection 
    router.get('/:collectiondate/eggscollectionid/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await layereggscollection.getLayerEggsCollection(request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("layereggscollection-getLayerEggsCollection", err);
        }
    });

 // save layereggscollection
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await layereggscollection.saveLayerEggsCollection(request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("layereggscollection-saveLayerEggsCollection", err);
        }

    });
    
    //   // Get all layereggs collections shed
      router.get('/searchbybatchid/companyid/:companyid/layerbatchid/:layerbatchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await layereggscollection.getAllLayerShedbyBatchid(request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("layereggscollection-getAllShedbyBatchid", err);
        }
    });

    //  //select layereggscollection by shedid and layerbatchid
     router.get('/shedid/:shedid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await layereggscollection.getLayerEggsCollByShedid(request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("layereggscollection-getEggsCollByShedid", err);
        }
    });

    // get live chicks live stock quantity and current hhp

    router.get('/shedid/:shedid/week/:week', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await layereggscollection.getLiveChicksInStock(request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("layereggscollection-getLiveChicksInStock", err);
        }
    });

   
    return router;
}

