
var express = require('express');
var router = express.Router();

module.exports = function (incentiveschemeDetail, oauth, log) {

    router.get('/search/incentiveschemedetail/:incentiveschemeid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await incentiveschemeDetail.getAllincentiveschemeDetail(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("incentiveschemeDetail.service-getAllincentiveschemeDetail", err);
        }
    });

    // start rate per kg on EEF
    router.get('/selectrateperkgoneef/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await incentiveschemeDetail.getIncentiveSchemeRateperkgoneef(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("incentiveschemeDetail.service-getIncentiveSchemeRateperkgoneef", err);
        }
    });

    router.post('/saverateperkgoneef/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await incentiveschemeDetail.saveIncentiveSchemeRateperkgoneef(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("incentiveschemeDetail.service-saveIncentiveSchemeRateperkgoneef", err);
        }

    });
        
    router.delete('/deleterateperkgoneef/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await incentiveschemeDetail.deleteIncentiveSchemeRateperkgoneef(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("incentiveschemeDetail.service - deleteIncentiveSchemeRateperkgoneef", err);
        }
    });

    // End rate per kg on EEF

    // Start employee position

    router.get('/selectemployeeorposition/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await incentiveschemeDetail.getIncentiveSchemeEmployeeOrPosition(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("incentiveschemeDetail.service-getIncentiveSchemeEmployeeOrPosition", err);
        }
    });

    router.post('/saveemployeeorposition/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await incentiveschemeDetail.saveIncentiveSchemeEmployeeOrPosition(request, request.body);
            let reason = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(reason);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("incentiveschemeDetail.service-saveIncentiveSchemeEmployeeOrPosition", err);
        }

    });
        
    router.delete('/deleteemployeeorposition/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await incentiveschemeDetail.deleteIncentiveSchemeEmployeeOrPosition(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("incentiveschemeDetail.service - deleteIncentiveSchemeEmployeeOrPosition", err);
        }
    });

    // End employee position

    return router;
}

