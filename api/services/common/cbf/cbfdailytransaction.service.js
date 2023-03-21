
var express = require('express');
var router = express.Router();

module.exports = function (cbfdailytransaction, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailytransaction.getAllCbfDailyTransaction(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailytransaction.service - getAllCbfDailyTransaction", err);
        }
    });

    // get cbf daily transaction
    router.get('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailytransaction.getCbfDailyTransaction(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailytransaction.service - getCbfDailyTransaction", err);
        }
    });

    // get cbf daily consumption
    router.get('/consumption/:cbfdailytransactionid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailytransaction.getCbfDailyConsumption(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailytransaction.service - getCbfDailyConsumption", err);
        }
    });


    // get shed placement details
    router.get('/shedwiseplacementdetails/:ShedId', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailytransaction.getShedWiseCbfPlacementDetails(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log('Error in router : ', err);
            log.dbErrorLog("cbfdailytransaction.service - getShedWiseCbfPlacementDetails", err);
        }
    });

     // get culls reasons
     router.get('/cbfreasons/:companyid/typeid/:typeid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailytransaction.getCullsOrMortalityReasons(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log('Error in router : ', err);
            log.dbErrorLog("cbfdailytransaction.service - getCullsOrMortalityReasons", err);
        }
    });
    
    // save cbf daily transaction
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await cbfdailytransaction.saveCbfDailyTransaction(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailytransaction.service - saveCbfDailyTransaction", err);
        }  
    });

     // get cbf Daily Mortality By cbf Batch Id
     router.get('/:companyid/breederbatchid/:breederbatchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailytransaction.getCbfDailyMortalityByCbfBatchId(request, request.params);
            console.log("result : ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailytransaction-getCbfDailyMortalityByCbfBatchId", err);
        }
    });

    
    // update breederbatchbalance table to update live quantity of chicks after daily culls/mortality
    // router.post('/transactionid', oauth.ensureLoggedIn, async function (request, response, next) {
        
    //     try{
    //         let rows = await cbfdailytransaction.updateBreederBatchLiveQuantity(request, request.body);
    //         let result = JSON.parse(JSON.stringify(rows))[2][0]; 
    //         response.status(200).send(result);
    //     }
    //     catch(err){
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("cbfdailytransaction.service - updateBreederBatchLiveQuantity", err);
    //     }  
    // });
     // issue consumed items for layer daily transaction
     router.get('/age/:age/itemid/:itemid/:breednameid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
 
        try {
            let result = await cbfdailytransaction.getCbffeedstandardsitemwise(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailytransaction - getCbffeedstandardsitemwise", err);
        }
    });

    //get save JE
    
    // router.get('/dailytransactonje/:cbfdailytransactionid/companyid/:companyid/userid/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await cbfdailytransaction.savecbfdailytransactionJE(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("cbfdailytransaction-savecbfdailytransactionJE", err);
    //     }
    // });

    //get daily transaction by shed id
    router.get('/dailytransactonbyshedid/:shedid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailytransaction.getcbfdailytransactionbyshedid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailytransaction-getcbfdailytransactionbyshedid", err);
        }
    });

    // get farmer enquiries with agreement
    router.get('/agreementbybranch/:companyid/:branchid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailytransaction.getBranchWiseFarmerEnquiries(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailytransaction-getBranchWiseFarmerEnquiries", err);
        }
    });

    // get CBF batches by farmer enquiry
    router.get('/batchbyenquiry/:farmerenquiryid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdailytransaction.getEnquiryhWiseCbfBatches(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdailytransaction-getEnquiryhWiseCbfBatches", err);
        }
    });

    return router;
}

