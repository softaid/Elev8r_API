
var express = require('express');
var router = express.Router();

module.exports = function (User, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await User.searchUser(request, request.params);

            console.log('result : ===', result);

            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageUser-searchUser", err);
        }
    });

    router.get('/userpermissions/:userid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await User.getUserPermissions(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageUser-searchUser", err);
        }
    });


    

    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await User.getUser(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageUser-getUser", err);
        }
    });

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await User.saveUser(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageUser-saveUser", err);
        }
    });
        
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await User.deleteUser(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageUser-deleteUser", err);
        }
    });

   
    return router;
}

