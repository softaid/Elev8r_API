
var express = require('express');
var router = express.Router();

module.exports = function (NotificationSetting, oauth, log) {


    router.get('/apptransactions', [], async function (request, response, next) {
        try {
            let resp = await NotificationSetting.getAppTransactions(request);
            response.send(resp);
        }
        catch (err) {

            console.log(' Error in router : ', err);
            log.dbErrorLog("NotificationSetting - getAppTransactions", err);
        }
    });

    router.get('/notificationplaceholders/:transactiontypeid', [], async function (request, response, next) {
        try {
            let resp = await NotificationSetting.getNotificationPlaceholder(request, request.params);
            response.send(resp);
        }
        catch (err) {

            console.log(' Error in router : ', err);
            log.dbErrorLog("NotificationSetting - getNotificationPlaceholder", err);
        }
    });

    router.get('/search', [], async function (request, response, next) {
        try {
            let data = await NotificationSetting.getNotificationSetting(request);
            response.send(data);
        }
        catch (err) {

            console.log(' Error in router : ', err);
            log.dbErrorLog("NotificationSetting - getNotifigetNotificationSettingcationSettingById", err);
        }
    });

    router.get('/:id', [], async function (request, response, next) {
        try {
            let data = await NotificationSetting.getNotificationSettingById(request, request.params);
            response.send(data);
        }
        catch (err) {

            console.log(' Error in router : ', err);
            log.dbErrorLog("NotificationSetting - getNotificationSettingById", err);
        }
    });

    router.post('/', [], async function (request, response, next) {

        try{
            let rows = await NotificationSetting.saveNotificationSetting(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("NotificationSetting-savenotificationsetting", err);
        }

    });

         
    router.delete('/:id', [], async function (request, response, next) {
        try {
            let result = await NotificationSetting.deleteNotificationSetting(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("NotificationSetting-deleteNotificationSetting", err);
        }
    });

    return router;
}
