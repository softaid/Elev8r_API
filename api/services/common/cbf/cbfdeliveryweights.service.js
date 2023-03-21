
var express = require('express');
var router = express.Router();

module.exports = function (cbfdelivery, oauth, log) {

    // get all cbfdelivery
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdelivery.getAllCbfDeliveries(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdelivery-getAllCbfDeliveries", err);
        }
    });

    // get cbfdelivery
    router.get('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdelivery.getCbfDelivery(request, request.params);
            console.log("Breeder result: ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdelivery-getCbfDelivery", err);
        }
    });

     // save cbfdelivery
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try{
            let rows = await cbfdelivery.saveCbfDelivery(request, request.body);
            console.log("Rows : ",rows);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdelivery-saveCbfDelivery", err);
        }  
    });

    // delete cbfdelivery
    router.delete('/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdelivery.deleteCbfDelivery(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdelivery-deleteCbfDelivery", err);
        }
    });

    // get farmer enquiries by liftingschedule id
    router.get('/getFarmerEnquiries/:liftingscheduleid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdelivery.getFarmerEnquiriesByLiftingSchedule(request, request.params);
            console.log("Breeder result: ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdelivery-getFarmerEnquiriesByLiftingSchedule", err);
        }
    });

    // get bird sales order by farmer enquiry
    router.get('/getBirdsalesorder/:farmerenquryid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await cbfdelivery.getBirdSalesOrderIdByFarmerEnquiry(request, request.params);
            console.log("Breeder result: ",result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("cbfdelivery-getBirdSalesOrderIdByFarmerEnquiry", err);
        }
    });

    return router;
}

