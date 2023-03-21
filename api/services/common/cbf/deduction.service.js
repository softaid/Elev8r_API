
var express = require('express');
var router = express.Router();

module.exports = function (Deduction, oauth, log) {

    router.get('/search/coststructureid/:coststructureid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Deduction.getAllDeduction(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Deduction-getAllDeduction", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Deduction.getDeduction(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Deduction-getDeduction", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await Deduction.saveDeduction(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Deduction-saveDeduction", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Deduction.deleteDeduction(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Deduction-deleteDeduction", err);
        }
    });

    return router;
}



