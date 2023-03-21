
var express = require('express');
var router = express.Router();

module.exports = function (Grpo, oauth, log) {

    //get material transfer by request id
    router.get('/:requestid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            console.log("Material transfer params : ", request.params);
            let result = await Grpo.getGrpoByRequestId(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("grpo-getGrpoByRequestId", err);
        }
    });

    router.get('/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            console.log("GRPO params : ", request.params);
            let result = await Grpo.getPurchaseOrderWithoutGrpo(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("grpo-getPurchaseOrderWithoutGrpo", err);
        }
    }); 

    
    router.get('/moduleid/:moduleid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            console.log("GRPO params : ", request.params);
            let result = await Grpo.getPurchaseOrderWithoutGrpobymoduleid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("grpo-getPurchaseOrderWithoutGrpobymoduleid", err);
        }
    }); 
    

    // get all Grpo
    router.get('/search/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Grpo.getAllGRPO(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Grpo-getAllGRPO", err);
        }
    });

    // get Grpo
    router.get('/select/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Grpo.getGRPO(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Grpo-getGRPO", err);
        }
    });

     // save Grpo
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await Grpo.saveGRPO(request, request.body);
            let result = JSON.parse(JSON.stringify(rows)); 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Grpo-saveGRPO", err);
        }  
    });

    // delete Grpo
    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Grpo.deleteGRPO(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Grpo-deleteGRPO", err);
        }
    });

     //get grpo  according to status
     router.get('/searchbystatus/companyid/:companyid/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Grpo.getgrposearchbystatus(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Grpo-getgrposearchbystatus", err);
        }
    });

    //grpo details by grpo id

    router.get('/searchbyid/id/:id/:isservice/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Grpo.getgrpodetailsbygrpoid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Grpo-getgrpodetailsbygrpoid", err);
        }
    });

    // get Chicks mortality
    router.get('/select/chicksmortalityid/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Grpo.getChicksMortality(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Grpo-getChicksMortality", err);
        }
    });

     // save Chicks mortality
     router.post('/chicksmortality/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await Grpo.saveChicksMortality(request, request.body);
            console.log("Rows : ",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Grpo-saveChicksMortality", err);
        }  
    });

         // save Chicks mortality
         router.post('/layerchicksmortality/', oauth.ensureLoggedIn, async function (request, response, next) {
            try{
                let rows = await Grpo.saveLayerChicksMortality(request, request.body);
                console.log("Rows : ",rows);
                let result = JSON.parse(JSON.stringify(rows))[2][0]; 
                response.status(200).send(result);
            }
            catch(err){
                console.log(' Error in router : ', err);
                log.dbErrorLog("Grpo-saveLayerChicksMortality", err);
            }  
        });
    

        router.get('/search/:fromdate/:todate/', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await Grpo.getGRPOList(request, request.params);
                console.log("report result : ",result);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("Grpo-getGRPOList", err);
            }
        });

	// save invoice by grpo
     router.post('/saveinvoicebygrpo/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await Grpo.saveInvoiceByGrpo(request, request.body);
            let result = JSON.parse(JSON.stringify(rows)); 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Grpo-saveInvoiceByGrpo", err);
        }  
    });


    return router;
}

