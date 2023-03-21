
var express = require('express');
var router = express.Router();

module.exports = function (CbfStandardChartdetail, oauth, log) {

 


    router.get('/search/cbfstandardchartid/:cbfstandardchartid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfStandardChartdetail.getAllCbfStandardChartdetail(request, request.params);
            console.log("result",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfStandardChartdetail-getAllCbfStandardChartdetail", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfStandardChartdetail.getCbfStandardChartdetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfStandardChartdetail-getCbfStandardChartdetail", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await CbfStandardChartdetail.saveCbfStandardChartdetail(request, request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfStandardChartdetail-saveCbfStandardChartdetail", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await CbfStandardChartdetail.deleteCbfStandardChartdetail(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("CbfStandardChartdetail-deleteCbfStandardChartdetail", err);
        }
    });

    return router;
}



