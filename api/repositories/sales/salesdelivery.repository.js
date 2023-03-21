let salesdeliveryRepository = function (pool, log) {
    
    this.getAllSalesDelivery = async function (req, SalesDelivery) {
        try {
            return await pool.query(req, "call spc_salesdelivery_search(?)",
            [
                SalesDelivery.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdelivery.service - getAllSalesDelivery", err);
        } 
        return null;
    };

    this.getSalesDelivery = async function (req, SalesDelivery) {
        try {
            return await pool.query(req, "call spc_salesdelivery_select(?)",
            [
                SalesDelivery.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdelivery.service - getSalesDelivery", err);
        }
    
        return null;
    };    

    this.getSalesDeliveryOnDelivery = async function (req, SalesDelivery) {
        try {
            return await pool.query(req, "call spc_salesdelivery_deliverysearch(?,?)",
            [
                SalesDelivery.salestypeid,
                SalesDelivery.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdelivery.service - getSalesDelivery", err);
        }
    
        return null;
    };  


    this.getSalesOrderDetailOnDelivery = async function (req, SalesDelivery) {
        try {
            return await pool.query(req, "call spc_salesorderdetail_deliverysearch(?,?)",
            [
                SalesDelivery.salesorderid,
                SalesDelivery.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdelivery.service - getSalesDelivery", err);
        }
    
        return null;
    };  

    this.saveSalesDelivery = async function (req, SalesDelivery) {
        try {
            var sp_text = "SET @out_id = 0; call spc_salesdelivery_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                    SalesDelivery["id"] != null ? parseInt(SalesDelivery.id) : null,
                    SalesDelivery["salestypeid"] != null ? parseInt(SalesDelivery.salestypeid) : null,
                    SalesDelivery["salesorderid"] != null ? parseInt(SalesDelivery.salesorderid) : null,
                    SalesDelivery.salesdeliveryno,
                    SalesDelivery.deliverydate,
                    SalesDelivery["deliverytoaddressid"] != null ? parseInt(SalesDelivery.deliverytoaddressid) : null,
                    SalesDelivery["deliverytoaddress"] != null ? SalesDelivery.deliverytoaddress : null,
                    SalesDelivery["billtoaddressid"] != null ? parseInt(SalesDelivery.billtoaddressid) : null,
                    SalesDelivery["billtoaddress"] != null ? SalesDelivery.billtoaddress : null,
                    SalesDelivery["warehouseid"] != null ? parseInt(SalesDelivery.warehouseid) : null,
                    SalesDelivery["warehouseaddress"] != null ? SalesDelivery.warehouseaddress : null,
                    SalesDelivery["remark"] != null ? SalesDelivery.remark : null,
                    SalesDelivery["salespersonid"] != null ? parseInt(SalesDelivery.salespersonid) : null,
                    SalesDelivery["statusid"] != null ? parseInt(SalesDelivery.statusid) : null,
                    SalesDelivery["customerid"] != null ? parseInt(SalesDelivery.customerid) : null,
                    parseInt(SalesDelivery.companyid),                     
                    parseInt(SalesDelivery.userid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdelivery.service-saveSalesDelivery", err);
        }
        return null;
    }

    this.deleteSalesDelivery = async function (req, SalesDelivery) {
        try {
                return await pool.query(req, "call spc_salesdelivery_delete(?,?,?)",                       
                    [
                        parseInt(SalesDelivery.id),
                        parseInt(SalesDelivery.companyid),
                        parseInt(SalesDelivery.userid)            
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdelivery.service-deleteSalesDelivery", err);
        }
        return null;
    }

    this.saveSalesDeliveryJE = async function (req, salesdelivery) {
        try {
            return await pool.query(req, "call spc_savesalesdelivery_je(?,?,?)",
            [
                salesdelivery.salesdeliveryid,
                salesdelivery.companyid,
                salesdelivery.userid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdelivery.service - saveSalesDeliveryJE", err);
        } 
        return null;
    };

    this.getSalesDeliveryList = async function (req, salesdelivery) {
        try {
            return await pool.query(req, "call spc_salesdeliverylist_search(?,?)",
            [
                salesdelivery.from_date,
                salesdelivery.to_date,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdelivery.service - getSalesDeliveryList", err);
        } 
        return null;
    };

    this.salesDeliveryIssueItems = async function (req, salesdelivery) {
        try {
            return await pool.query(req, "call spc_salesdelivery_issueitems(?,?,?)",
            [
                salesdelivery.salesdeliveryid,
                salesdelivery.userid,
                salesdelivery.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdelivery.service - salesDeliveryIssueItems", err);
        } 
        return null;
    };

    // save sales invoice by sales delivery id
    this.saveSalesInvoiceBySalesDelivery = async function (req, salesdelivery) {
        try {
            return await pool.query(req, "call spc_savesalesinvoice_fromsalesdelivery(?,?,?)",
            [
                salesdelivery.salesdeliveryid,
                salesdelivery.companyid,
                salesdelivery.userid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdelivery.service - saveSalesInvoiceBySalesDelivery ", err);
        } 
        return null;
    };

};
    
module.exports = salesdeliveryRepository;