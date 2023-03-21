
var express = require('express');
var router = express.Router();

module.exports = function (itemgroup, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await itemgroup.getAllItemGroup(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("itemgroup-getAllItemGroup", err);
        }
    });


    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await itemgroup.getItemGroup(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ItemGroup-getItemGroup", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await itemgroup.saveItemGroup(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("itemgroup-saveItemGroup", err);
        }

    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await itemgroup.deleteItemGroup(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ItemGroup-deleteItemGroup", err);
        }
    });

    return router;
}

