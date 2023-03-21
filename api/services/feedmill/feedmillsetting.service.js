

var express = require('express');
var router = express.Router();

module.exports = function (feedmillsetting, oauth, log) {

            //SEARCH SERVICE

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await feedmillsetting.getAllFeedMillSettingResult(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("feedmillsetting-getAllFeedMillSettingResult", err);
        }
    });

            // SELECT SERVICE

    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await feedmillsetting.getFeedMillSetting(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("feedmillsetting-getFeedMillSetting", err);
        }
    });

            //SAVE SERVICE

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        let rows = await feedmillsetting.saveFeedMillSetting(request, request.body);
        let location = JSON.parse(JSON.stringify(rows))[2][0]; 
        response.status(200).send(location);

    });

            //DELETE SERVICE

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await feedmillsetting.deleteFeedMillSetting(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("feedmillsetting.Service - deleteFeedMillSetting", err);
        }
    });

        
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await Warehouse.deleteLocation(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("location-deleteLocation", err);
    //     }
    // });

    return router;
}

