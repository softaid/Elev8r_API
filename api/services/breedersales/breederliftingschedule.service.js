
var express = require('express');
var router = express.Router();

module.exports = function (breederLfSchedule, oauth, log) {

    //get location wise sales order
    
      router.get('/locationwisesalesorder/:locationid/:date/:moduleid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await breederLfSchedule.getSalesOrderByLocation(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederLfSchedule-getSalesOrderByLocation", err);
        }
    });

    // get all SalesDelivery
    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await breederLfSchedule.getAllBreederLfSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederLfSchedule-getAllBreederLfSchedule", err);
        }
    });


    router.get('/select/:id/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await breederLfSchedule.getBreederLfSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederLfSchedule-getBreederLfSchedule", err);
        }
    });


     // save 
     router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await breederLfSchedule.saveBreederLfSchedule(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederLfSchedule-saveBreederLfSchedule", err);
        }  
    });

    router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await breederLfSchedule.deleteBreederLfSchedule(request, request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederLfSchedule-deleteBreederLfSchedule", err);
        }
    });

    // get all lbirdsales Order BY Lf Schedule
    router.get('/birdsalesorderbylfschedule/:liftingscheduleid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await breederLfSchedule.getBirdSalesOrderByLfSchedule(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederLfSchedule.service - getBirdSalesOrderByLfSchedule", err);
        }
    });
   
    return router;
}