
var express = require('express');
var router = express.Router();

module.exports = function (Subscription, oauth, log) {

    router.get('/activelicenses/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {

            let result = await Subscription.activeLicenses(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageSubscription-activeLicenses", err);
        }
    });

    router.get('/userlicenses/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {

            let result = await Subscription.userLicenses(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageSubscription-userLicenses", err);
        }
    });

    router.get('/userlicensesddl/:userid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {

            let result = await Subscription.userLicensesDdl(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageSubscription-userLicensesDdl", err);
        }
    });
    
    

    // router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await User.getUser(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageUser-getUser", err);
    //     }
    // });

    router.post('/saveuserlicenses', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await Subscription.saveUserLicenses(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageSubscription-saveUserLicenses", err);
        }
    });
        
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await User.deleteUser(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageUser-deleteUser", err);
    //     }
    // });

   
    return router;
}

