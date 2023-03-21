
var express = require('express');
var router = express.Router();

module.exports = function (RoleAccess, oauth, log) {

    router.get('/search', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await RoleAccess.searchRoleAccess(request);

            console.log('result : ===', result);

            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageRoleAccess-search", err);
        }
    });

    router.get('/permissions', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await RoleAccess.getPermissions(request);

            console.log('result : ===', result);

            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageRoleAccess-getPermissions", err);
        }
    });

    router.get('/roles', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await RoleAccess.getRoles(request);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageRoleAccess-getRoles", err);
        }
    });


    // router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await RoleAccess.getRoleAccess(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageRoleAccess-getRoleAccess", err);
    //     }
    // });

    // router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

    //     try{
    //         let rows = await RoleAccess.saveRoleAccess(request, request.body);
    //         let result = JSON.parse(JSON.stringify(rows))[2][0]; 
    //         response.status(200).send(result);
    //     }
    //     catch(err){
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageRoleAccess-saveRoleAccess", err);
    //     }
    // });
        
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await RoleAccess.deleteRoleAccess(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageRoleAccess-deleteRoleAccess", err);
    //     }
    // });

   
    return router;
}

