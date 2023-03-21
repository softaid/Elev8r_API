
var express = require('express');
var router = express.Router();

module.exports = function (Warehouse, oauth, log) {

    router.get('/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Warehouse.getAllWarehouse(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("warehouse-getAllWarehouse", err);
        }
    });


   

    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        let rows = await Warehouse.saveWarehouse(request, request.body);
        let location = JSON.parse(JSON.stringify(rows))[2][0]; 
        response.status(200).send(location);

    });
        
    // router.delete('/:id', oauth.ensureLoggedIn, async function (request, response, next) {
    //     try {
    //         let result = await Warehouse.deleteLocation(request, request.params);
    //         response.send(result);
    //     }
    //     catch (err) {
    //         console.log(' Error in router : ', err);
    //         log.dbErrorLog("location-deleteLocation", err);
    //     }
    // });

    return router;
}

