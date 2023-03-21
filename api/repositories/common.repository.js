// var nodeMailer = require('nodemailer');
var https = require('https');

let commonRepository = function (pool, log) {


    this.sendEmail = async function (req, Params) {
        // console.log("Email notification**************** : ",Notification);
        // var nodemailer = require('nodemailer');
        // let transporter = nodeMailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     port: 587,
        //     secure: false,
        //     requireTLS: true,
        //     auth: {
        //         user: 'poultryos.user@gmail.com',
        //         pass: "PTS@99remote"
        //     }
        // });

        // if (Notification.emailFrom == null || Notification.emailFrom == "") {
        //     Notification.emailFrom = '"PoultryOS" <poultryos.user@gmail.com>';
        // }

        // var FILE_CONTENT = "";

        // let mailOptions = {
        //     from:'poultryos.user@gmail.com', // sender address
        //     to: Notification.emailTo, // list of receivers
        //     subject: Notification.subject, // Subject line
        //     text: Notification.content // plain text body
        // html: Notification.content, // html body
        // attachments: [{
        //     filename: 'PurchaseOrder.pdf',
        //     content: new Buffer(FILE_CONTENT, 'base64'),
        //     contentType: 'application/pdf'
        // }]
        // };

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'poultryos.user@gmail.com',
                pass: 'PTS@99remote'
            }
        });

        var FILE_CONTENT = "";

        var mailOptions = {
            from: 'poultryos.user@gmail.com',
            to: Params.emailTo,
            subject: Params.subject,
            text: Params.content,
            // html: Params.content, // html body
            // attachments: [{
            //     filename: 'PurchaseOrder.pdf',
            //     content: new Buffer(FILE_CONTENT, 'base64'),
            //     contentType: 'application/pdf'
            // }]
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return await transporter.sendMail(mailOptions);
    };
    this.getTransactionNotification = async function (req, NotificationSetting) {
        try {
            return await pool.query(req, "call spc_notificationtemplate_transactioncode(?)", [
                NotificationSetting.transactioncode
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getTransactionNotification", err);
        }
        return null;
    };

    this.getTransactionNotificationAll = async function (req) {
        try {
            return await pool.query(req, "call spk_notificationtemplate_search()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getTransactionNotificationAll", err);
        }
        return null;
    };


    this.getNotificationHistorySearch = async function (req, NotificationSetting) {
        try {
            return await pool.query(req, "call spc_notificationhistory_search(?)", [
                NotificationSetting.userid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getNotificationHistorySearch", err);
        }
        return null;
    };

    this.getNotificationHistoryPopupList = async function (req, NotificationSetting) {
        try {
            return await pool.query(req, "call spc_notificationhistory_popuplist(?,?)", [
                NotificationSetting.userid,
                NotificationSetting.limit
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getNotificationHistoryPopupList", err);
        }
        return null;
    };

    this.saveNotificationHistory = async function (req, Notification) {
        console.log("Notification?????????????", Notification);
        try {
            // var headers = {
            //     "Content-Type": "application/json; charset=utf-8",
            //     "Authorization": "Basic NDZkMzgzYzktMjUwMS00NmU5LWE5MDItZWUyYzViYWUxNjMx"
            // };
            // var options = {
            //     host: "onesignal.com",
            //     port: 443,
            //     path: "/api/v1/notifications",
            //     method: "POST",
            //     headers: headers
            // };
            // var message = {
            //     app_id: "69ddb77d-4aa5-488c-afcb-e1146ab59fe4",
            //     contents: { "en": Notification.content },
            //     headings: { "en": "PoultryOS Notification" },
            //     include_player_ids: Notification.filteredUserKeys
            // };
            // var req1 = https.request(options, function (res) {
            //     res.on('data', function (data) {
            //         console.log("Response:");
            //         console.log(JSON.parse(data));
            //     });
            // });

            // req1.on('error', function (e) {
            //     console.log("ERROR:");
            //     console.log(e);
            // });
            // req1.write(JSON.stringify(message));
            // req1.end();
            var sp_text = "SET @out_id = 0; call spc_notificationhistory_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(req, sp_text,
                [
                    Notification["id"] != null ? parseInt(Notification.id) : null,
                    parseInt(Notification.moduleid),
                    parseInt(Notification.transactiontypeid),
                    parseInt(Notification.transactionid),
                    Notification.content,
                    Notification.roleids,
                    Notification.inappusers,
                    Notification.inappviewedusers,
                    parseInt(Notification.occurances),
                    Notification["inapp"] != null ? parseInt(Notification.inapp) : null,
                    Notification["sms"] != null ? parseInt(Notification.sms) : null,
                    Notification["email"] != null ? parseInt(Notification.email) : null,
                    parseInt(Notification.statusid),
                    parseInt(Notification.userid),
                    parseInt(Notification.companyid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service-saveNotificationHistory", err);
        }
        return null;
    }

    this.readNotificationHistory = async function (req, Notification) {
        try {
            var sp_text = "SET @out_id = 0; call spc_notificationhistory_readsave(?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(req, sp_text,
                [
                    Notification["userid"] != null ? parseInt(Notification.userid) : null,
                    Notification.notificationids
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service-readNotificationHistory", err);
        }
        return null;
    }


    this.getCreatedFor = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_user_createdfor(?)", [
                Common.userid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("login.service-getCreatedFor", err);
        }
        return null;
    }

    this.getFinancialYearDocNewSeries = async function (req, Common) {
        try {
            var sp_text = "SET @newseries = ''; call spc_financialyeardocseries_newseries(?,?, @newseries); SELECT @newseries as newseries;";
            return await pool.query(req, sp_text,
                [
                    Common.doccode,
                    Common.companyid
                ]);
        }
        catch (err) {
            log.dbErrorLog("common.service - getFinancialYearDocNewSeries", err);
        }
        return null;
    };

    this.getFinancialYearDocNewSeriesforparty = async function (req, Common) {
        try {
            var sp_text = "SET @newseries = ''; call spc_financialyeardocseries_newseries_forparty(?,?,?, @newseries); SELECT @newseries as newseries;";
            return await pool.query(req, sp_text,
                [
                    Common.doccode,
                    Common.companyid,
                    Common.roleid

                ]);
        }
        catch (err) {
            log.dbErrorLog("common.service - getFinancialYearDocNewSeriesforparty", err);
        }
        return null;
    };

    this.getFinancialYearDocNewSeriesforvouchertype = async function (req, Common) {
        try {
            var sp_text = "SET @newseries = ''; call spc_financialyeardocseries_newseries_forvouchertypr(?,?,?, @newseries); SELECT @newseries as newseries;";
            return await pool.query(req, sp_text,
                [
                    Common.doccode,
                    Common.companyid,
                    Common.vouchertypeid

                ]);
        }
        catch (err) {
            log.dbErrorLog("common.service - getFinancialYearDocNewSeriesforvouchertype", err);
        }
        return null;
    };

    this.getReference = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_reference_select(?)", [
                Common.typecode,
            ]);
        }
        catch (err) {
            log.dbErrorLog("common.service - getReference", err);
        }
        return null;
    };

    this.getLocationTypes = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_locationtype_ddl(?)", [
                Common.companyid,
            ]);
        }
        catch (err) {
            log.dbErrorLog("common.service - getLocationTypes", err);
        }
        return null;
    };

    this.getLocations = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_location_ddl(?,?)", [
                Common.companyid,
                Common.moduleids

            ]);
        }
        catch (err) {
            log.dbErrorLog("common.service - getLocations", err);
        }
        return null;
    };

    this.getWarehouse = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_warehouse_ddl(?)", [
                Common.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getWarehouse", err);
        }
        return null;
    };

    this.getWarehouseBin = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_warehousebin_dll(?)", [
                Common.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getWarehouseBin", err);
        }
        return null;
    };

    this.getAllCountries = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_country_search()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getAllCountries", err);
        }
        return null;
    };

    this.getStatesByCountryid = async function (req, Common) {
        console.log("Common : ", Common);
        try {
            return await pool.query(req, "call spc_state_search(?)", [
                Common.countryid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getStatesByCountryid", err);
        }
        return null;
    };

    this.getCitiesByStateid = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_city_search(?)", [
                Common.stateid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getCitiesByStateid", err);
        }
        return null;
    };

    this.getAllItemgroup = async function (req, Item) {
        try {
            return await pool.query(req, "call spc_itemgroup_ddl(?)",
                [
                    Item.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getAllItemgroup", err);
        }
        return null;
    }

    this.getAllItem = async function (req, Item) {
        console.log("Item: ", Item);
        try {
            return await pool.query(req, "call spc_item_ddl(?)",
                [
                    Item.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getAllItem", err);
        }
        return null;
    };

    this.ItemAvgWeight = async function (req, Item) {
        try {
            return await pool.query(req, "call spc_item_getavgweight(?,?)",
                [
                    Item.itemid,
                    Item.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getAllItem", err);
        }
        return null;
    };

    this.getFreights = async function (req, Freight) {
        try {
            return await pool.query(req, "call spc_freight_ddl(?)",
                [
                    Freight.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getAllItem", err);
        }
        return null;
    };

    this.getEmployees = async function (req, Employee) {
        try {
            return await pool.query(req, "call spc_employee_ddl(?,?)",
                [
                    Employee.typeid,
                    Employee.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getEmployees", err);
        }
        return null;
    };

    //get available sheds 
    this.getAvailableSheds = async function (req, shed) {
        console.log(shed)
        try {
            return await pool.query(req, "call spc_breedershed_availablesheds_search(?,?,?)",
                [
                    shed.companyid,
                    shed.statusid,
                    shed.locationid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("shed.service - getAvailableSheds", err);
        }
        return null;
    };

    //get suppliers
    this.getUser = async function (req, user) {
        console.log(user)
        try {
            return await pool.query(req, "call spc_rolewiseuser_search(?,?)",
                [
                    parseInt(user.companyid),
                    user.roleid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("user.service - getUser", err);
        }
        return null;
    };

    this.getLedgers = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_ledgers_search(?)", [
                Common.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getLedgers", err);
        }
        return null;
    };

    this.getTax = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_tax_search(?)", [
                Common.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getTax", err);
        }
        return null;
    };

    this.getSingleTax = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_tax_singletaxsearch(?)", [
                Common.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getSingleTax", err);
        }
        return null;
    };

    // get partner according to partner role(id)

    this.getAllVendor = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_partner_ddlonrole(?)", [
                parseInt(Common.partnerroleid),
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - getAllVendor", err);
        }
        return null;
    };

    //get available hatchers 
    this.getAvailableHatchers = async function (req, Common) {
        console.log(Common)
        try {
            return await pool.query(req, "call spc_hatcherforcurrentlocation_search(?,?)",
                [
                    Common.companyid,
                    Common.locationid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getAvailableHatchers", err);
        }
        return null;
    };

    //get locationwise warehouses 
    this.getLocationWiseWarehouse = async function (req, Common) {
        console.log(Common)
        try {
            return await pool.query(req, "call spc_warehouse_bylocation_search(?,?)",
                [
                    Common.companyid,
                    Common.locationid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getLocationWiseWarehouse", err);
        }
        return null;
    };

    //get module wise warehouses 
    this.getModuleWiseWarehouses = async function (req, Common) {
        console.log("common : ", Common);
        try {
            return await pool.query(req, "call spc_warehouse_bymodule_search(?,?)",
                [
                    parseInt(Common.companyid),
                    parseInt(Common.moduleid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getModuleWiseWarehouses", err);
        }
        return null;
    };

    //get warehousewise breeder batches
    this.getWarehousewiseBreederBatch = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_warehousewisebreederbatch_select(?,?)",
                [
                    Common.companyid,
                    Common.warehouseid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getWarehousewiseBreederBatch", err);
        }
        return null;
    };

    // get material requests
    this.getAllMaterialRequests = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_materialrequest_search(?)",
                [
                    Common.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getAllMaterialRequests", err);
        }
        return null;
    };

    //get purchaserquest According to status
    this.getpurchaserequestbystatus = async function (req, Common) {
        console.log(Common)
        try {
            return await pool.query(req, "call spc_purchaserequest_searchbystatus(?,?,?)",
                [
                    Common.companyid,
                    Common.statusid,
                    Common.moduleid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getpurchaserequestbystatus", err);
        }
        return null;
    };

    this.getAllBreederSetting = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_breedersetting_search(?)",
                [
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getAllBreederSetting", err);
        }
        return null;
    };

    //get all breederbatches with status 221 = 'new'
    this.getAllBreederBatchesByStatusid = async function (req, Common) {
        console.log("Common", Common);
        try {
            return await pool.query(req, "call spc_breederbatch_bystatusid(?,?)",
                [
                    Common.companyid,
                    Common.statusid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getAllBreederBatchesByStatusid", err);
        }
        return null;
    };

    //locationwise breeder batches
    this.getLocationwiseBreederBatches = async function (req, Common) {
        console.log("Location Common : ", Common);
        try {
            return await pool.query(req, "call spc_breederbatch_locationwise(?,?,?)",
                [
                    Common.locationid,
                    Common.statusid,
                    Common.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getLocationwiseBreederBatches", err);
        }
        return null;
    };

    //locationwise breeder batches
    this.getBreederBatchesByLocation = async function (req, Common) {
        console.log("Location Common : ", Common);
        try {
            return await pool.query(req, "call spc_breederbatch_bylocation(?,?)",
                [
                    Common.locationid,
                    Common.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getBreederBatchesByLocation", err);
        }
        return null;
    };

    // get item live stock
    this.getItemLiveStock = async function (req, Common) {
        console.log("item data : ", Common);
        try {
            return await pool.query(req, "call spc_get_itemlivestock(?,?,?)",
                [
                    Common.itemid,
                    Common.warehousebinid,
                    Common.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getItemLiveStock", err);
        }
        return null;
    };



    // get item and warehouse wise batch
    this.getitembatchbyitemid = async function (req, Common) {
        console.log("item data : ", Common);
        try {
            return await pool.query(req, "call spc_itembatch_byitemid(?,?,?,?)",
                [
                    Common.itemid,
                    Common.warehouseid,
                    Common.warehousebinid,
                    Common.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getitembatchByitemid", err);
        }
        return null;
    };

    // get item instock

    this.getItemInStock = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_iteminstock(?,?,?,?)",
                [
                    Common.itemid,
                    Common.warehousebinid,
                    Common.transactiondate,
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getItemInStock", err);
        }
        return null;
    };

    // get all partner
    this.getAllPartner = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_partner_search(?)",
                [
                    parseInt(Common.companyid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getAllPartner", err);
        }
        return null;
    };


    // get All Item Live stock by Warehouseid

    this.getItemsLiveStockByWHid = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_salesdelivery_itemlivestock(?,?,?,?)",
                [
                    Common.warehouseid,
                    Common.warehousebinid,
                    Common.itemgroupid,
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getAllPartner", err);
        }
        return null;
    };

    // get All Item by itemGroup

    this.getItemsByItemGroups = async function (req, Common) {
        try {


            return await pool.query(req, "call spc_itembyitemgroups_search(?,?)",
                [
                    Common.itemgroupid,
                    parseInt(Common.companyid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getAllPartner", err);
        }
        return null;
    };

    // get All Item by itemGroup wise And taxcategory

    this.getItemsBytaxcategory = async function (req, Common) {
        try {


            return await pool.query(req, "call spc_itembytexcategory_search(?,?,?)",
                [
                    Common.itemgroupid,
                    isNaN(Common.taxcategoryid) ? null : Common.taxcategoryid,
                    parseInt(Common.companyid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getItemsBytaxcategory", err);
        }
        return null;
    };

    this.getItemsByInvoiceType = async function (req, Common) {
        try {


            return await pool.query(req, "call spc_itembyinvoicetype_search(?,?,?)",
                [
                    Common.itemgroupid,
                    Common.invoicetypeid,
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getItemsByInvoiceType", err);
        }
        return null;
    };

    //get all users
    this.getAllUsers = async function (req, Params) {

        try {
            return await pool.query(req, "call spc_user_search(?,?)",
                [
                    Params.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.repository - getAllUsers", err);
        }
        return null;
    };

    // get all states 
    this.getAllStates = async function (req) {
        try {
            return await pool.query(req, "call spc_state_ddl()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.repository - getAllStates", err);
        }
        return null;
    };

    // get all cities 
    this.getAllCities = async function (req) {
        try {
            return await pool.query(req, "call spc_city_ddl()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.repository - getAllCities", err);
        }
        return null;
    };

    //get default bin
    this.getDefaultBin = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_warehousebin_defaultbin(?,?)",
                [
                    Common.warehouseid,
                    parseInt(Common.companyid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getDefaultBin", err);
        }
    };

    this.getAccountLedgers = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_accountledgers_search(?)", [
                Common.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.repository - getAccountLedgers", err);
        }
        return null;
    };

    //get all layerbatches with status 981 = 'new'
    this.getAllLayerBatchesByStatusid = async function (req, Common) {

        try {
            return await pool.query(req, "call spc_layerbatch_bystatusid(?,?)",
                [
                    Common.companyid,
                    Common.statusid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getAllLayerBatchesByStatusid", err);
        }
        return null;
    };

    //location wise batch started sheds
    this.getLocationBatchStartedBreederShed = async function (req, Common) {

        try {
            return await pool.query(req, "call spc_breedershed_batch_started(?,?)",
                [
                    Common.locationid,
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getLocationBatchStartedBreederShed", err);
        }
        return null;
    };

    //module wise started batches
    this.getModuleWiseStartedBatches = async function (req, Common) {

        try {
            return await pool.query(req, "call spc_modulewise_batches(?,?)",
                [
                    Common.moduleid,
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getModuleWiseStartedBatches", err);
        }
        return null;
    };

    //Item By material Type id
    this.getItemByMaterialType = async function (req, Common) {
        console.log("Common", Common);
        try {
            return await pool.query(req, "call spc_item_bymaterialtype(?,?)",
                [
                    Common.materialtypeid,
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getItemByMaterialType", err);
        }
        return null;
    };

    //gat Layer Pahse by week
    this.getLayerPhasebyweek = async function (req, Common) {
        console.log("Common", Common);
        try {
            return await pool.query(req, "call spc_layerphase_byweek(?)",
                [
                    Common.week
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getLayerPhasebyweek", err);
        }
        return null;
    };
    // get CBF batches by statusid
    //
    this.getCbfBatchesByStatus = async function (req, Common) {
        console.log("Common", Common);
        try {
            return await pool.query(req, "call spc_cbfbatchdetails_bystatusid(?,?)",
                [
                    Common.statusid,
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getCbfBatchesByStatus", err);
        }
        return null;
    };

    this.masterDataExport = async function (req, Common) {
        console.log()
        try {
            return await pool.query(req, Common.query, []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.service - masterDataExport", err);
            throw new Error(err);
        }
        return null;
    };
    //get module wise role wise party 
    this.getPartyModulewise = async function (req, Common) {
        console.log("common : ", Common);
        try {
            return await pool.query(req, "call spc_party_moduleandrolewise(?,?,?)",
                [
                    Common.roleid,
                    Common.moduleid,
                    parseInt(Common.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getPartyModulewise", err);
        }
        return null;
    };

    //get module wise itemgroup 
    this.getItemGroupByModuleid = async function (req, Common) {
        console.log("common : ", Common);
        try {
            return await pool.query(req, "call spc_itemgroup_search_bymoduleid(?,?)",
                [
                    parseInt(Common.companyid),
                    Common.moduleid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getItemGroupByModuleid", err);
        }
        return null;
    };
    // save common setting

    this.saveCommonSetting = async function (req, commonsetting) {

        try {
            var sp_text = "SET @out_id = 0; call spc_common_setting_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(req, sp_text,
                [
                    commonsetting["id"] != null ? parseInt(commonsetting.id) : null,
                    parseInt(commonsetting.discountledgerid),
                    parseInt(commonsetting.cogsledgerid),
                    parseInt(commonsetting.cashledgerid),
                    parseInt(commonsetting.grpowithoutinvoiceledgerid),
                    parseInt(commonsetting.inventorygainandlossledgerid),
                    parseInt(commonsetting.profitandlossledgerid),
                    commonsetting.grpowithoutpo,
                    commonsetting.purchaseinvoicewithoutgrpo,
                    commonsetting.purchaseinvoicewithoutpo,
                    commonsetting.opening_balance_ledger_id,
                    commonsetting.customer_ledger_group_id,
                    commonsetting.supplier_ledger_group_id,
                    parseInt(commonsetting.controlaccountledgerid),
                    commonsetting.deliverywithoutso,
                    commonsetting.salesinvoicewithoutdelivery,
                    commonsetting.salesinvoicewithoutso,
                    parseInt(commonsetting.companyid),
                    parseInt(commonsetting.userid)]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("common.repository-commonsetting", err);
        }
        return null;
    }

    // get All common setting
    this.getAllCommonSetting = async function (req, commonsetting) {

        try {
            return await pool.query(req, "call spc_common_setting_search(?)",
                [
                    parseInt(commonsetting.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - commonsetting", err);
        }
        return null;
    };

    //import master
    //import master


    //import master

    this.importMaster = async function (req, Common) {
        try {
            var sp_text = "SET @out_id = 0; call spc_importdata(?,?,?,?,@out_id); SELECT @out_id as id;";
            return await pool.query(req, sp_text,
                [
                    Common.jsondata,
                    Common.table,
                    Common.company_id,
                    Common.user_id
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - importMaster", err);

        }
        return null;
    };
    //get rolewisepagekey
    this.getRolewisePageKey = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_user_keyshortcuts_search(?,?)",
                [
                    Common.roleids,
                    parseInt(Common.companyid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getRolewisePageKey", err);
        }
        return null;
    };

    // save userkey shortcu key
    this.saveUserShortcutKeys = async function (req, Common) {
        console.log("Common shortcuts------------- : ", Common);
        try {
            var sp_text = "SET @out_id = 0; call spc_user_keyshortcuts_save(?,?,?,?,?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(req, sp_text,
                [
                    Common["id"] != null ? parseInt(Common.id) : null,
                    parseInt(Common.roleid),
                    Common.key,
                    Common.pagekey,
                    Common.pagename,
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service-saveUserShortcutKeys", err);
        }
        return null;
    };

    //get Role Wise Entity
    this.getRolewiseEntity = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_rolewiseentity_search(?)",
                [
                    Common.roleid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getRolewiseEntity", err);
        }
        return null;
    };

    //get Role Wise Entity
    this.getAllEntities = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_entity_search()",
                [
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getAllEntities", err);
        }
        return null;
    };

    //get Role 
    this.getRole = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_role_ddl()",
                [

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getRole", err);
        }
        return null;
    };

    // common dashboard
    this.getCommonDashboardData = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_commondashboard(?)",
                [
                    Common.userid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getCommonDashboardData", err);
        }
        return null;
    };

    // get batch and module wise shed
    this.getBatchWiseShed = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_batch_and_modulewise_shed(?,?)",
                [
                    Common.moduleid,
                    Common.batchid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getBatchWiseShed", err);
        }
        return null;
    };

    // get batch and module wise cumulative feed consumption
    this.getBatchWiseCumulativeFeedConsumption = async function (req, Common) {
        try {
            return await pool.query(req, "call get_modulewise_cumulativefeed(?,?,?,?,?)",
                [
                    Common.batchid,
                    Common.shedid,
                    Common.transactiondate,
                    Common.moduleid,
                    Common.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getBatchWiseCumulativeFeedConsumption", err);
        }
        return null;
    };


    // user logout
    this.useLogout = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_user_logout(?,?)",
                [
                    parseInt(Common.userid),
                    parseInt(Common.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - useLogout", err);
        }
        return null;
    };

    //get itemwise instock

    this.getItemAndWarehousewiseInstock = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_getitemandwarehousewise_stock(?,?,?,?)",
                [
                    parseInt(Common.itemid),
                    parseInt(Common.warehouseid),
                    Common.transactiondate,
                    parseInt(Common.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.repository - getItemAndWarehousewiseInstock", err);
        }
        return null;
    };


    // get common dashboard 
    this.getCommonDashboard = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_common_dashboard_search(?,?)",
                [
                    Common.company_id,
                    Common.to_date
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getCommonDashboard", err);
        }
        return null;
    };
    /**
     * Function to search a jaurnal entry detail by transaction id and voucher type
     * @param {*} req 
     * @param {*} Common 
     * @returns 
     */

    this.getJaurnalEntryDetail = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_transactionwise_jaurnalentry_search(?,?,?)",
                [
                    Common.company_id,
                    Common.transaction_id,
                    Common.vouchertype_id
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getJaurnalEntryDetail", err);
        }
        return null;
    };

    // Modulewise dashboards
    this.modulewiseDashboards = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_modulewisedashboard(?)",
                [
                    Common.moduleid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - modulewiseDashboards", err);
        }
        return null;
    };


    // get breeder setting data for common dashboard to idintify which fields are blank
    this.getBreederSettingForDashBoard = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_getbreedersetting_fordashboard(?)",
                [
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getBreederSettingForDashBoard", err);
        }
        return null;
    };

    // get layer setting data for common dashboard to idintify which fields are blank
    this.getLayerSettingForDashBoard = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_getlayersetting_fordashboard(?)",
                [
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getLayerSettingForDashBoard", err);
        }
        return null;
    };

    // get common setting data for common dashboard to idintify which fields are blank
    this.getCommonSettingForDashBoard = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_getcommonsetting_fordashboard(?)",
                [
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getCommonSettingForDashBoard", err);
        }
        return null;
    };

    // get cbf setting data for common dashboard to idintify which fields are blank
    this.getCBFSettingForDashBoard = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_getcbfsetting_fordashboard(?)",
                [
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getCBFSettingForDashBoard", err);
        }
        return null;
    };

    // get Feed Mill setting data for common dashboard to idintify which fields are blank
    this.getFeedMillSettingForDashBoard = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_getFeedmillsetting_fordashboard(?)",
                [
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getFeedMillSettingForDashBoard", err);
        }
        return null;
    };


    // get Hatchery setting data for common dashboard to idintify which fields are blank
    this.getHatcherySettingForDashBoard = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_gethatcherysetting_fordashboard(?)",
                [
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getHatcherySettingForDashBoard", err);
        }
        return null;
    };

    // get Processing setting data for common dashboard to idintify which fields are blank
    this.getProcessingSettingForDashBoard = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_getprocessingsetting_fordashboard(?)",
                [
                    Common.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getProcessingSettingForDashBoard", err);
        }
        return null;
    };

      // get only those module which access to user 
      this.getModuleDatabyUser = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_getmodule_byuserid(?,?)",
                [
                    parseInt(Common.userid),
                    Common.company_id
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getModuleDatabyUser", err);
        }
        return null;
    };

    //search 
    this.getSettingStatusResult = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_settingstatus_search(?)",
            [
                Common.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getSettingStatusResult", err);
        } 
        return null;
     };    
     
    // SELECT REPOSITORY
     this.getSettingStatus = async function (req, Common) {
        console.log("testmaster repo:",Common);
        try {
            return await pool.query(req, "call spc_settingstatus_select(?,?)",
            [
                Common.id,
                Common.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service - getSettingStatus", err);
        } 
        return null;
     };  
     
    //SAVE REPOSITORY
     this.saveSettingStatus = async function (req, Common) {
        console.log("Common",Common);
        try {
                var sp_text = "SET @out_id = 0; call spc_settingstatus_save(?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Common["id"] != null ? parseInt(Common.id) : null,
                        parseInt(Common.moduleid),
                        Common.modulestatus,
                        parseInt(Common.companyid),
                        parseInt(Common.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Common.service-saveSettingStatus", err);
        }
        return null;
     };

};

module.exports = commonRepository;


