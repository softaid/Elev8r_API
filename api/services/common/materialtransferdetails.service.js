
var express = require('express');
var router = express.Router();

module.exports = function (MaterialTransferDetails, oauth, log) {

    router.get('/search/:materialtransferid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await MaterialTransferDetails.getMaterialTransferDetailsByTransferId(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialtransferdetails.service - getMaterialTransferDetailsByTransferId", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await MaterialTransferDetails.getMaterialTransferDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialtransferdetails.service - getMaterialTransferDetail", err);
        }
    });

     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await MaterialTransferDetails.saveMaterialTransferDetail(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialtransferdetails.service - saveMaterialTransferDetail", err);
        }  
    });

     router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await MaterialTransferDetails.deleteMaterialTransferDetail(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("materialtransferdetails.service - deleteMaterialTransferDetail", err);
        }
    });

    return router;
}

