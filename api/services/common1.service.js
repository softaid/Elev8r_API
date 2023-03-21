
var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');

module.exports = function (Common, oauth, log, dev) {

    router.post('/emailnotification/send', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await Common.sendEmail(request, request.body);

            let result = JSON.parse(JSON.stringify(rows)); 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common - sendEmail", err);
        }
    });


    router.get('/transnotification/:transactioncode', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let resp = await Common.getTransactionNotification(request, request.params);
            //Common.sendEmail(request);

            response.send(resp);
        }
        catch (err) {

            console.log(' Error in router : ', err);
            log.dbErrorLog("Common - getTransactionNotification", err);
        }
    });

    router.get('/transnotificationall', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let resp = await Common.getTransactionNotificationAll(request);
            response.send(resp);
        }
        catch (err) {

            console.log(' Error in router : ', err);
            log.dbErrorLog("Common - getTransactionNotificationAll", err);
        }
    });

    router.get('/notificationhistory/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let resp = await Common.getNotificationHistorySearch(request, request.params);
            response.send(resp);
        }
        catch (err) {

            console.log(' Error in router : ', err);
            log.dbErrorLog("Common - getNotificationHistorySearch", err);
        }
    });

    router.post('/notificationhistory/read', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await Common.readNotificationHistory(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common - readNotificationHistory", err);
        }
    });

    
    router.get('/notificationhistorypopuplist/:userid/:limit', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let resp = await Common.getNotificationHistoryPopupList(request, request.params);
            response.send(resp);
        }
        catch (err) {

            console.log(' Error in router : ', err);
            log.dbErrorLog("Common - getNotificationHistoryPopupList", err);
        }
    });

    router.post('/savenotificationhistory', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await Common.saveNotificationHistory(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common - notificationhistroysave", err);
        }
    });
    
    router.get('/notificationcreatedfor/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getCreatedFor(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common - notificationcreatedfor", err);
        }
    });


    router.get('/newseries/:doccode/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let rows = await Common.getFinancialYearDocNewSeries(request, request.params);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getReference", err);
        }
    });

    router.get('/newseries/:doccode/:companyid/:roleid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let rows = await Common.getFinancialYearDocNewSeriesforparty(request, request.params);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-  getFinancialYearDocNewSeriesforparty", err);
        }
    });

    router.get('/newseriesforje/:doccode/:companyid/:vouchertypeid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let rows = await Common.  getFinancialYearDocNewSeriesforvouchertype(request, request.params);
            let result = JSON.parse(JSON.stringify(rows))[2][0];
            response.status(200).send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-  getFinancialYearDocNewSeriesforvouchertype", err);
        }
    });

  

    router.get('/currenttimestamp', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            response.send(new Date());
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-currenttimestamp", err);
        }
    });


    router.get('/reference/:typecode', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getReference(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getReference", err);
        }
    });


    //get location type
    router.get('/locationtype/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getLocationTypes(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getLocationTypes", err);
        }
    });

    //get locations
    router.get('/location/:companyid/:moduleids', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getLocations(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getLocations", err);
        }
    });

    //get warehouse
    router.get('/warehouse/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getWarehouse(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getWarehouse", err);
        }
    });

    // get warehousebin
    router.get('/warehousebin/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getWarehouseBin(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getWarehouseBin", err);
        }
    });

    //get country
    router.get('/country', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllCountries(request);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("country-getAllCountries", err);
        }
    });

    //get states by countryid
    router.get('/state/:countryid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getStatesByCountryid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getStatesByCountryid", err);
        }
    });

    //get cities by stateid
    router.get('/city/:stateid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getCitiesByStateid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getCitiesByStateid", err);
        }
    });

    //get item groups
    router.get('/list/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllItemgroup(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getAllItemgroup", err);
        }
    });

    //get items
    router.get('/item/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllItem(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("item-getAllItem", err);
        }
    });

    //get items
    router.get('/item/avgweight/:itemid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.ItemAvgWeight(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("item-getAllItem", err);
        }
    });

    //get employeelist
    router.get('/employeelist/:typeid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getEmployees(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getEmployees", err);
        }
    });


    //get warehouse
    router.get('/freightlist/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getFreights(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getFreights", err);
        }
    });

    //get ledgers
    router.get('/ledger/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getLedgers(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getLedgers", err);
        }
    });

    //get tax
    router.get('/tax/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getTax(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getLedgers", err);
        }
    });

    //get tax
    router.get('/singletax/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getSingleTax(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getLedgers", err);
        }
    });


    //get available sheds
    router.get('/shed/:companyid/statusid/:statusid/locationid/:locationid/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAvailableSheds(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common-getAvailableSheds", err);
        }
    });

    //get suppliers
    router.get('/user/:companyid/roleid/:roleid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getUser(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common-getuser", err);
        }
    });

  
    //get available hatchers
    router.get('/hatcher/:companyid/locationid/:locationid/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAvailableHatchers(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common-getAvailableHatchers", err);
        }
    });

    //get locationwise warehouses
    router.get('/warehouse/:companyid/locationid/:locationid/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getLocationWiseWarehouse(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common-getLocationWiseWarehouse", err);
        }
    });

    //get module wise warehouses
    router.get('/warehouse/:companyid/moduleid/:moduleid/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getModuleWiseWarehouses(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common.service - getModuleWiseWarehouses", err);
        }
    });

    //get warehousewise breeder batch
    router.get('/breederbatch/:companyid/warehouseid/:warehouseid/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getWarehousewiseBreederBatch(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common-getWarehousewiseBreederBatch", err);
        }
    });

    //get material requests
    router.get('/materialrequest/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllMaterialRequests(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common.service - getAllMaterialRequests", err);
        }
    });
    //get purchase rquest according to status
    router.get('/purchaserequest/:companyid/statusid/:statusid/', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getpurchaserequestbystatus(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common-getpurchaserequestbystatus", err);
        }
    });

    // get all breedersetting in

    router.get('/breedersettingsearch/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllBreederSetting(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common - getAllBreederSetting", err);
        }
    });

    //get all breederbatches with status 221 = 'new'
    router.get('/:companyid/bystatus/:statusid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllBreederBatchesByStatusid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederbatch-getAllBreederBatchesByStatusid", err);
        }
    });

    //locationwise and statuswise breeder batches
    router.get('/locationid/:locationid/statusid/:statusid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getLocationwiseBreederBatches(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederbatch.service - getLocationwiseBreederBatches", err);
        }
    });


    //locationwise breeder batches
    router.get('/locationwise/:locationid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getBreederBatchesByLocation(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("breederbatch.service - getBreederBatchesByLocation", err);
        }
    });


    // get item live stock
    router.get('/itemlivestock/:itemid/warehousebin/:warehousebinid/company/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log('itemlivestock : ', request.params);
        try {
            let result = await Common.getItemLiveStock(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common.service - getItemLiveStock", err);
        }
    });

      // get item qty by itemid
    
      router.get('/itembatchbyitemid/:itemid/:warehouseid/:warehousebinid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getitembatchbyitemid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common-getitembatchbyitemid", err);
        }
    });

    // get all partner
    router.get('/partnersearch/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllPartner(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common-getAllPartner", err);
        }
    });

    //get items
    router.get('/itemlivestock/:itemgroupid/:warehouseid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getItemsLiveStockByWHid(request, request.params);

            console.log('itemgroupid result : ', result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("item-getAllItem", err);
        }
    });

    //get items
    router.get('/itemlivestock/:itemgroupid/:warehouseid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getItemsLiveStockByWHid(request, request.params);

            console.log('itemgroupid result : ', result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("item-getAllItem", err);
        }
    });


    //get items
    router.get('/itemgroupid/:itemgroupid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getItemsByItemGroups(request, request.params);

            console.log('itemgroupid result : ', result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("item-getAllItem", err);
        }
    });


    //get items 
    router.get('/itemgroupid/:itemgroupid/taxcategoryid/:taxcategoryid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getItemsBytaxcategory(request, request.params);

            console.log('itemgroupid result : ', result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("item-getItemsBytaxcategory", err);
        }
    });

    //get items By Invoice Type (Transaction type)
    router.get('/itemgroupid/:itemgroupid/invoicetype/:invoicetypeid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getItemsByInvoiceType(request, request.params);

            console.log('itemgroupid result : ', result);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("item-getItemsByInvoiceType", err);
        }
    });

    //get default bin
    router.get('/defaultbin/:warehouseid/companyid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getDefaultBin(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("warehousebin-getDefaultBin", err);
        }
    });

    //get all users
    router.get('/user/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllUsers(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common.service - getAllUsers", err);
        }
    });

    //get all states
    router.get('/state', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllStates(request);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common.service - getAllStates", err);
        }
    });


    //get all cities
    router.get('/city', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllCities(request);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common.service - getAllCities", err);
        }
    });

    //get all Layer with status 981 = 'new'
    router.get('/:companyid/layerbatchstatus/:statusid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllLayerBatchesByStatusid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common-getAllLayerBatchesByStatusid", err);
        }
    });


    //get ledgers
    router.get('/accountledger/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAccountLedgers(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common.service - getAccountLedgers", err);
        }
    });

    //get locationwise batch started breeder sheds
    router.get('/locationwise/batchstartedsheds/:locationid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getLocationBatchStartedBreederShed(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common.service - getLocationBatchStartedBreederShed", err);
        }
    });

    //get modulewise started batches 
    router.get('/modulewise/batches/:moduleid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getModuleWiseStartedBatches(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common.service - getModuleWiseStartedBatches", err);
        }
    });

    //get item By materialtypeid
     router.get('/itembymaterialtype/materialtypeid/:materialtypeid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getItemByMaterialType(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common.service - getItemByMaterialType", err);
        }
    });
	
//get layer phse by week
      router.get('/layerphasebyweek/week/:week', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getLayerPhasebyweek(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common.service - getLayerPhasebyweek", err);
        }
    });
    // get CBF batches by statusid
    router.get('/cbfbatches/statusid/:statusid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getCbfBatchesByStatus(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common.service - getCbfBatchesByStatus", err);
        }
    });

    router.post('/masterdataexport', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let resp = await Common.masterDataExport(request, request.body);
            response.send(resp);
        }   
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common - masterDataExport", err);
            response.status(500).send({error : err.message, tabname : request.body.tabname});
        }
    });

      //get partner according to partnerrole

      router.get('/party/:roleid/:moduleid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getPartyModulewise(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getPartyModulewise", err);
        }
    });

    //get module wise itemgroup
    router.get('/itemgroupmodulewise/:moduleid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getItemGroupByModuleid(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getItemGroupByModuleid", err);
        }
    });
     //save common setting
    router.post('/commonsetting', oauth.ensureLoggedIn, async function (request, response, next) {

        try{
            let rows = await Common.saveCommonSetting(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common - commonsetting", err);
        }
    });

     //get module wise itemgroup
     router.get('/commonsetting/search/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllCommonSetting(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-commonsetting", err);
        }
    });
    
    //import master
    router.post('/', oauth.ensureLoggedIn, async function (request, response, next) {
        console.log("common------------");
        try{
            let rows = await Common.importMaster(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common.service - importMaster", err);
        }  
    });

      //get reolw wise shortcutkeys
      router.get('/usershortcutkey/search/:roleids/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getRolewisePageKey(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-usershortcutkey", err);
        }
    });

       //save usershortcut
       router.post('/usershortcutkey', oauth.ensureLoggedIn, async function (request, response, next) {
        
        try{
            let rows = await Common.saveUserShortcutKeys(request, request.body);
            let result = JSON.parse(JSON.stringify(rows))[2][0]; 
            response.status(200).send(result);
        }
        catch(err){
            console.log(' Error in router : ', err);
            log.dbErrorLog("Common.service - saveUserShortcutKeys", err);
        }  
    });

     //get reolw wise shortcutkeys
     router.get('/rolewiseentity/:roleid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getRolewiseEntity(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getRolewiseEntity", err);
        }
    });

    //get all entities
    router.get('/entity', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getAllEntities(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getAllEntities", err);
        }
    });
    
    //get reolw wise shortcutkeys
    router.get('/role', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.getRole(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getRole", err);
        }
    });

    // common dashboard

    router.get('/commondashboard/:userid', oauth.ensureLoggedIn, async function (request, response, next) {
      
        try {
            let result = await Common.getCommonDashboardData(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-getCommonDashboardData", err);
        }
    });

    //user logout
   /* router.get('/userlogout/:userid/:companyid', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let result = await Common.useLogout(request, request.params);
            response.send(result);
        }
        catch (err) {
            console.log(' Error in router : ', err);
            log.dbErrorLog("common-useLogout", err);
        }
    });
    */

    return router;
}


