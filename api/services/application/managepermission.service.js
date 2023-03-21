
var express = require('express');
var router = express.Router();

module.exports = function (ManagePermission, oauth, log) {

    router.get('/search', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await ManagePermission.searchManagePermission(request);

            console.log('result : ===', result);

            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("ManagePermission-searchManagePermission", err);
        }
    });


    // router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await ManagePermission.getManagePermission(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageManagePermission-getManagePermission", err);
    //     }
    // });

    // router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

    //     try{
    //         let rows = await ManagePermission.saveManagePermission(request, request.body);
    //         let result = JSON.parse(JSON.stringify(rows))[2][0]; 
    //         response.status(200).send(result);
    //     }
    //     catch(err){
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageManagePermission-saveManagePermission", err);
    //     }
    // });
        
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await ManagePermission.deleteManagePermission(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("ManageManagePermission-deleteManagePermission", err);
    //     }
    // });

   
    return router;
}

