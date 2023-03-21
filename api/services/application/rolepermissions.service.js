
var express = require('express');
var router = express.Router();

module.exports = function (RolePermissions, oauth, log) {

    router.get('/search', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await RolePermissions.searchRolePermissions(request);

            console.log('result : ===', result);

            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageRolePermissions-search", err);
        }
    });

    router.get('/permissions', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await RolePermissions.getPermissions(request);

            console.log('result : ===', result);

            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageRolePermissions-getPermissions", err);
        }
    });

    router.get('/roles', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await RolePermissions.getRoles(request);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageRolePermissions-getRoles", err);
        }
    });


    // router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await RolePermissions.getRolePermissions(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageRolePermissions-getRolePermissions", err);
    //     }
    // });

    // router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

    //     try{
    //         let rows = await RolePermissions.saveRolePermissions(request, request.body);
    //         let result = JSON.parse(JSON.stringify(rows))[2][0]; 
    //         response.status(200).send(result);
    //     }
    //     catch(err){
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageRolePermissions-saveRolePermissions", err);
    //     }
    // });
        
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await RolePermissions.deleteRolePermissions(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageRolePermissions-deleteRolePermissions", err);
    //     }
    // });

   
    return router;
}

