
var express = require('express');
var router = express.Router();

module.exports = function (ManageEntity, oauth, log) {

    router.get('/search', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ManageEntity.searchManageEntity(request);

            console.log('result : ===', result);

            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageManageEntity-searchManageEntity", err);
        }
    });

    router.get('/searchbyrole/:roleid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ManageEntity.searchManageEntityByRole(request, request.params);

            console.log('result : ===', result);

            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageManageEntity-searchManageEntityByRole", err);
        }
    });

    router.get('/searchbyuser/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ManageEntity.searchManageEntityByUser(request, request.params);

            console.log('result : ===', result);

            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManageManageEntity-searchManageEntityByUser", err);
        }
    });


    // router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await ManageEntity.getManageEntity(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageManageEntity-getManageEntity", err);
    //     }
    // });

    // router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

    //     try{
    //         let rows = await ManageEntity.saveManageEntity(request, request.body);
    //         let result = JSON.parse(JSON.stringify(rows))[2][0]; 
    //         response.status(200).send(result);
    //     }
    //     catch(err){
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageManageEntity-saveManageEntity", err);
    //     }
    // });
        
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await ManageEntity.deleteManageEntity(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageManageEntity-deleteManageEntity", err);
    //     }
    // });

   
    return router;
}

