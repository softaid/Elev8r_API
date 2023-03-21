let salesinvoiceRepository = function (pool, log) {
    
    this.getAllSalesInvoice = async function (req, SalesInvoice) {
        try {
            return await pool.query(req, "call spc_salesinvoice_search(?)",
            [
                SalesInvoice.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoice.service - getAllSalesInvoice", err);
        } 
        return null;
    };

    this.getSalesInvoice = async function (req, SalesInvoice) {
        try {
            return await pool.query(req, "call spc_salesinvoice_select(?)",
            [
                SalesInvoice.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoice.service - getSalesInvoice", err);
        }
    
        return null;
    };    

    
    this.getSalesDeliveryByOrder = async function (req, SalesInvoice) {
        try {
            return await pool.query(req, "call spc_salesdelivery_bysalesorderid(?,?,?)",
            [
                SalesInvoice.salesorderid,
                !isNaN(SalesInvoice.salesinvoiceid) ? SalesInvoice.salesinvoiceid : null,
                SalesInvoice.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoice.service - getSalesInvoice", err);
        }
    
        return null;
    };    

    this.getSalesOrderOnInvoice = async function (req, SalesInvoice) {
        try {
            return await pool.query(req, "call spc_salesorder_invoicesearch(?)",
            [
                SalesInvoice.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoice.service - getSalesInvoice", err);
        }
    
        return null;
    };  

    this.getdeliverydetailsearchByOrder = async function (req, SalesInvoice) {
        try {
            return await pool.query(req, "call spc_salesinvoicedetail_search(?,?,?)",
            [
                SalesInvoice.salesdeliveryids,
                SalesInvoice.salesorderid,
                SalesInvoice.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoice.service - getSalesInvoice", err);
        }
    
        return null;
    };  

    this.saveSalesInvoice = async function (req, SalesInvoice) {
        try {
            var sp_text = "SET @out_id = 0; call spc_salesinvoice_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                    SalesInvoice["id"] != null ? parseInt(SalesInvoice.id) : null,
                    parseInt(SalesInvoice.salestypeid),
                    SalesInvoice.salesinvoiceno,
                    SalesInvoice.salesorderid,
                    SalesInvoice.salesdeliveryids,
                    parseInt(SalesInvoice.customerid),
                    SalesInvoice.contactperson,
                    SalesInvoice.salesinvoicedate,
                    SalesInvoice["referenceno"] != null ? parseInt(SalesInvoice.referenceno) : null,
                    SalesInvoice["referredby"] != null ? parseInt(SalesInvoice.referredby) : null,
                    SalesInvoice["referencedate"] != null ? SalesInvoice.referencedate : null,
                    SalesInvoice["transactiontypeid"] != null ? SalesInvoice.transactiontypeid : null,
                    SalesInvoice["deliverydate"] != null ? SalesInvoice.deliverydate : null,
                    SalesInvoice["deliverytoaddressid"] != null ? parseInt(SalesInvoice.deliverytoaddressid) : null,
                    SalesInvoice["deliverytoaddress"] != null ? SalesInvoice.deliverytoaddress : null,
                    SalesInvoice["billtoaddressid"] != null ? parseInt(SalesInvoice.billtoaddressid) : null,
                    SalesInvoice["billtoaddress"] != null ? SalesInvoice.billtoaddress : null,
                    SalesInvoice["warehouseid"] != null ? parseInt(SalesInvoice.warehouseid) : null,
                    SalesInvoice["warehouseaddress"] != null ? SalesInvoice.warehouseaddress : null,
                    SalesInvoice["itemtotal"] != null ? parseFloat( SalesInvoice.itemtotal).toFixed(2) : null,
                    SalesInvoice["discount"] != null ? parseFloat(SalesInvoice.discount).toFixed(2) : null,
                    SalesInvoice["roundoff"] != null ? parseFloat(SalesInvoice.roundoff).toFixed(2) : null,
                    SalesInvoice["grandtotal"] != null ? parseFloat( SalesInvoice.grandtotal).toFixed(2) : null,
                    SalesInvoice["remark"] != null ? SalesInvoice.remark : null,
                    SalesInvoice["subject"] != null ? SalesInvoice.subject : null,
                    SalesInvoice["salespersonid"] != null ? parseInt(SalesInvoice.salespersonid) : null,
                    parseInt(SalesInvoice.statusid),
                    parseInt(SalesInvoice.companyid),                      
                    parseInt(SalesInvoice.userid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoice.service-saveSalesInvoice", err);
        }
        return null;
    }

    this.deleteSalesInvoice = async function (req, SalesInvoice) {
        try {
                return await pool.query(req, "call spc_salesinvoice_delete(?,?,?)",                       
                    [
                        parseInt(SalesInvoice.id),
                        parseInt(SalesInvoice.companyid),
                        parseInt(SalesInvoice.userid)            
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoice.service-deleteSalesInvoice", err);
        }
        return null;
    }

    this.getSalesInvoiceList = async function (req, SalesInvoice) {
        try {
            return await pool.query(req, "call spc_salesinvoicelist_search(?,?)",
            [
                SalesInvoice.from_date,
                SalesInvoice.to_date,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("SalesInvoice.service - getSalesInvoiceList", err);
        } 
        return null;
    };

    this.getSalesInvoiceList = async function (req, SalesInvoice) {
        try {
            return await pool.query(req, "call spc_salesinvoicelist_search(?,?)",
            [
                SalesInvoice.from_date,
                SalesInvoice.to_date,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("SalesInvoice.service - getSalesInvoiceList", err);
        } 
        return null;
    };


    // Issue items by sales invoice
    this.salesInvoiceIssueItems = async function (req, SalesInvoice) {
        try {
            return await pool.query(req, "call spc_salesinvoice_issueitems(?,?,?)",
            [
                SalesInvoice.salesinvoiceid,
                SalesInvoice.userid,
                SalesInvoice.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoice.service - salesInvoiceIssueItems", err);
        }
    
        return null;
    };


};
    
module.exports = salesinvoiceRepository;