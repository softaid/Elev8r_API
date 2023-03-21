
var express = require('express');
var router = express.Router();

module.exports = function (Purchase, oauth, log) {

        // get All PArty 
       
        router.get('/searchparty/companyid/:companyid/', oauth.ensureLoggedIn, async function (request, response, next) {
            try {
                let result = await Purchase.getAllParty(request, request.params);
                response.send(result);
            }
            catch (err) {
                console.log(' Error in router : ', err);
                log.dbErrorLog("Purchase-getAllParty", err);
            }
        });
        // get Purchaseregisterreport

    

    // // get eggscollection batch report
     router.post('/purchaseregisterreport', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await Purchase.getPurchaseRegisterReport(request, request.body);
            let result = JSON.parse(JSON.stringify(rows)); 
            response.status(200).send(rows);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Purchase-getPurchaseRegisterReport", err);
        }  
    });

    
  // get ItemSubgroup batch report
  router.post('/itemsubgroupreport/', oauth.ensureLoggedIn, async function (request, response, next) {
        
    try{
        let result = await Purchase.getItemSubGroupReport(request, request.body);
        response.send(result); 
        // response.status(200).send(result);
    }
    catch(err){
        console.log(' Error in router : ', err);
        log.dbErrorLog("Purchase-getItemSubGroupReport", err);
    }  
});
    

    
    // get itemstcok batch report
    router.post('/itemwisestockreport/', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let result = await Purchase.getItemWiseStock(request, request.body);
            response.send(result); 
            // response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Purchase-getItemWiseStock", err);
        }  
    });

    //   // get itemstcok batch report
    //   router.post('/locationwisewarehouse/', oauth.ensureLoggedIn, async function (request, response, next) {
        
    //     try{
    //         let result = await Purchase.getwarehousebylocation(request, request.body);
    //         response.send(result); 
    //         // response.status(200).send(result);
    //     }
    //     catch(err){
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("Purchase-getwarehousebylocation", err);
    //     }  
    // });




    router.get('/search/fromdate/:fromdate/todate/:todate/customerid/:customerid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Purchase.getPartywisePurchaseOrderReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Purchase-getPartywisePurchaseOrderReport", err);
        }
    });

   

    

    router.get('/locationwisewarehouse/locationid/:locationid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Purchase.getwarehousebylocation(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Purchase-getwarehousebylocation", err);
        }
    });

    router.get('/search/fromdate/:fromdate/todate/:todate/itemid/:itemid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Purchase.getGRNRegisterReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Purchase-getGRNRegisterReport", err);
        }
    });
  
    router.get('/pendingpurchaseordersearch/fromdate/:fromdate/todate/:todate/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Purchase.getPendingPurchaseOrderReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Purchase-getPendingPurchaseOrderReport", err);
        }
    });

    // service for dashboard

    router.get('/dashboard/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Purchase.dashboard(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Purchase-dashboard", err);
        }
    });
  
    router.get('/itemwisestockreport/fromdate/:fromdate/todate/:todate/itemid/:itemid/warehouseids/:warehouseids/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Purchase.getItemWiseStockReport(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Purchase-getItemWiseStockReport", err);
        }
    });
    

    return router;
}

