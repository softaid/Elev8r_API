
var express = require('express');
var router = express.Router();

module.exports = function (Item, oauth, log) {
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Item.getAllItem(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("item-getAllItem", err);
        }
    });

    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Item.getItem(request, request.params);
			console.log("------------result--------------",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Item-getItem", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await Item.saveItem(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Item-saveItem", err);
        }

    });

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Item.deleteItem(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Item-deleteItem", err);
        }
    });

    return router;

}