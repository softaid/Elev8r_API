
var express = require('express');
var router = express.Router();

module.exports = function (Employee, oauth, log) {

    router.get('/search/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Employee.getAllEmployee(request,request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Employee-getAllEmployee", err);
        }
    });


    router.get('/select/id/:id', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Employee.getEmployee(request,request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Employee-getEmployee", err);
        }
    });

    //get employee by role
    router.get('/roleids/:roleids/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Employee.getEmployeeByRole(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Employee.service - getEmployeeByRole", err);
        }
    });


    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await Employee.saveEmployee(request,request.body);
            let Result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(Result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Employee-saveEmployee", err);
        }

    });
        
    router.delete('/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Employee.deleteEmployee(request,request.body);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Employee-deleteEmployee", err);
        }
    });

    return router;
}



