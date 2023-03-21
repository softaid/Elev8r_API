
var express = require('express');
var router = express.Router();

module.exports = function (cbfdailymortality, oauth, log) {

    // save CBF daily culls mortality
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await cbfdailymortality.saveCbfDailyCullsMortality(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailymortality.service - saveCbfDailyCullsMortality", err);
        }  
    });

    // delete CBF daily culls-mortality detail
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailymortality.deleteCbfDailyCullsMortality(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailymortality.service - deleteCbfDailyCullsMortality", err);
        }
    });

   

    return router;
}

