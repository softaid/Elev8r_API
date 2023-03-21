let salesorderRepository = function (pool, log) {
    
    this.getAllSalesOrder = async function (req, SalesOrder) {
        try {
            return await pool.query(req, "call spc_salesorder_search(?)",
            [
                SalesOrder.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesorder.service - getAllSalesOrder", err);
        } 
        return null;
    };

    this.getSalesOrder = async function (req, SalesOrder) {
        try {
            return await pool.query(req, "call spc_salesorder_select(?)",
            [
                SalesOrder.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesorder.service - getSalesOrder", err);
        }
    
        return null;
    };    

    this.getSalesOrderOnDelivery = async function (req, SalesOrder) {
        try {
            return await pool.query(req, "call spc_salesorder_deliverysearch(?,?)",
            [
                SalesOrder.salestypeid,
                SalesOrder.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesorder.service - getSalesOrder", err);
        }
    
        return null;
    };  

    this.saveSalesOrder = async function (req, SalesOrder) {
        try {
            var sp_text = "SET @out_id = 0; call spc_salesorder_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                    SalesOrder["id"] != null ? parseInt(SalesOrder.id) : null,
                    parseInt(SalesOrder.salestypeid),
                    SalesOrder.salesorderno,
                    parseInt(SalesOrder.customerid),
                    SalesOrder.contactperson,
                    SalesOrder.salesorderdate,
                    SalesOrder["referenceno"] != null ? parseInt(SalesOrder.referenceno) : null,
                    SalesOrder["referredby"] != null ? parseInt(SalesOrder.referredby) : null,
                    SalesOrder["referencedate"] != null ? SalesOrder.referencedate : null,
                    SalesOrder["transactiontypeid"] != null ? SalesOrder.transactiontypeid : null,
                    SalesOrder["deliverydate"] != null ? SalesOrder.deliverydate : null,
                    SalesOrder["deliverytoaddressid"] != null ? parseInt(SalesOrder.deliverytoaddressid) : null,
                    SalesOrder["deliverytoaddress"] != null ? SalesOrder.deliverytoaddress : null,
                    SalesOrder["billtoaddressid"] != null ? parseInt(SalesOrder.billtoaddressid) : null,
                    SalesOrder["billtoaddress"] != null ? SalesOrder.billtoaddress : null,
                    SalesOrder["warehouseid"] != null ? parseInt(SalesOrder.warehouseid) : null,
                    SalesOrder["warehouseaddress"] != null ? SalesOrder.warehouseaddress : null,
                    SalesOrder["itemtotal"] != null ? parseFloat( SalesOrder.itemtotal).toFixed(2) : null,
                    SalesOrder["discount"] != null ? parseFloat(SalesOrder.discount).toFixed(2) : null,
                    SalesOrder["roundoff"] != null ? parseFloat(SalesOrder.roundoff).toFixed(2) : null,
                    SalesOrder["grandtotal"] != null ? parseFloat( SalesOrder.grandtotal).toFixed(2) : null,
                    SalesOrder["remark"] != null ? SalesOrder.remark : null,
                    SalesOrder["subject"] != null ? SalesOrder.subject : null,
                    SalesOrder["salespersonid"] != null ? parseInt(SalesOrder.salespersonid) : null,
                    parseInt(SalesOrder.statusid),
                    parseInt(SalesOrder.companyid),                      
                    parseInt(SalesOrder.userid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesorder.service-saveSalesOrder", err);
        }
        return null;
    }

    this.deleteSalesOrder = async function (req, SalesOrder) {
        try {
                return await pool.query(req, "call spc_salesorder_delete(?,?,?)",                       
                    [
                        parseInt(SalesOrder.id),
                        parseInt(SalesOrder.companyid),
                        parseInt(SalesOrder.userid)            
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesorder.service-deleteSalesOrder", err);
        }
        return null;
    };

    this.getSalesOrderList = async function (req, salesorder) {
        try {
            return await pool.query(req, "call spc_salesorderlist_search(?,?)",
            [
                salesorder.from_date,
                salesorder.to_date,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesorder.service - getSalesOrderList", err);
        } 
        return null;
    };

};
    
module.exports = salesorderRepository;