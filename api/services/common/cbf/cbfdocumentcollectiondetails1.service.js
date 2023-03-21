
var express = require('express');
var router = express.Router();

module.exports = function (DocumentCollectionDetails, oauth, log) {

    router.get('/search/:compnayid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await DocumentCollectionDetails.getAllDocumentCollectionDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("DocumentCollectionDetails-getAllDocumentCollectionDetails", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await DocumentCollectionDetails.getDocumentCollectionDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("DocumentCollectionDetails-getDocumentCollectionDetails", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await DocumentCollectionDetails.saveDocumentCollectionDetails(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("DocumentCollectionDetails-saveDocumentCollectionDetails", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await DocumentCollectionDetails.deleteDocumentCollectionDetails(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("DocumentCollectionDetails-deleteDocumentCollectionDetails", err);
        }
    });

    return router;
}



