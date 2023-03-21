
var express = require('express');
var router = express.Router();

module.exports = function (itemhsn, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await itemhsn.getAllItemHSN(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("itemhsn-getAllItemHSN", err);
        }
    });

    router.get('/list/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await itemhsn.getHSNList(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("itemhsn-getHSNList", err);
        }
    });

    

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await itemhsn.getItemHSN(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ItemHSN-getItemHSN", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await itemhsn.saveItemHSN(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("itemhsn-saveItemHSN", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await itemhsn.deleteItemHSN(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ItemHSN-deleteItemHSN", err);
        }
    });

    return router;
}

