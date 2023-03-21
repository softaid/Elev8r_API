let salesorderdetailRepository = function (pool, log) {
    
    this.getAllSalesOrderDetail = async function (req, SalesOrderDetail) {
        try {
            return await pool.query(req, "call spc_salesorderdetail_search(?,?)",
            [
                SalesOrderDetail.salesorderid,
                SalesOrderDetail.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesorderdetail.service - getAllSalesOrderDetail", err);
        } 
        return null;
    };

    this.getSalesOrderDetail = async function (req, SalesOrderDetail) {
        try {
            return await pool.query(req, "call spc_salesorderdetail_select(?)",
            [
                SalesOrderDetail.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesorderdetail.service - getSalesOrderDetail", err);
        }
    
        return null;
    };    

   this.saveSalesOrderDetail = async function (req, SalesOrderDetail) {
        try {
            var sp_text = "SET @out_id = 0; call spc_salesorderdetail_save(?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                    SalesOrderDetail["id"] != null ? parseInt(SalesOrderDetail.id) : null,
                    parseInt(SalesOrderDetail.salesorderid),
                    parseInt(SalesOrderDetail.itemid),
                    parseFloat(SalesOrderDetail.quantity),
                    SalesOrderDetail["isbird"] != null ? parseInt(SalesOrderDetail.isbird) : null,
                    SalesOrderDetail["weight"] != null ? parseFloat(SalesOrderDetail.weight) : null,
                    SalesOrderDetail["iscalcweight"] != null ? parseInt(SalesOrderDetail.iscalcweight) : null,
                    SalesOrderDetail["itemunit"] != null ? parseInt(SalesOrderDetail.itemunit) : null,
                    SalesOrderDetail["unitprice"] != null ? parseFloat(SalesOrderDetail.unitprice) : null,
                    SalesOrderDetail["discount"] != null ? parseFloat(SalesOrderDetail.discount) : null,
                    SalesOrderDetail["taxid"] != null ? parseInt(SalesOrderDetail.taxid) : null,
                    SalesOrderDetail["taxpercent"] != null ? parseFloat(SalesOrderDetail.taxpercent) : null,
                    SalesOrderDetail["taxtypeid"] != null ? parseInt(SalesOrderDetail.taxtypeid) : null,
                    SalesOrderDetail["cgstid"] != null ? parseInt(SalesOrderDetail.cgstid) : null,
                    SalesOrderDetail["cgstpercent"] != null ? parseFloat(SalesOrderDetail.cgstpercent) : null,
                    SalesOrderDetail["cgstamount"] != null ? parseFloat(SalesOrderDetail.cgstamount) : null,
                    SalesOrderDetail["sgstid"] != null ? parseInt(SalesOrderDetail.sgstid) : null,
                    SalesOrderDetail["sgstpercent"] != null ? parseFloat(SalesOrderDetail.sgstpercent) : null,
                    SalesOrderDetail["sgstamount"] != null ? parseFloat(SalesOrderDetail.sgstamount) : null,
                    SalesOrderDetail["igstid"] != null ? parseInt(SalesOrderDetail.igstid) : null,
                    SalesOrderDetail["igstpercent"] != null ? parseFloat(SalesOrderDetail.igstpercent) : null,
                    SalesOrderDetail["igstamount"] != null ? parseFloat(SalesOrderDetail.igstamount) : null,
                    SalesOrderDetail["utgstid"] != null ? parseInt(SalesOrderDetail.utgstid) : null,
                    SalesOrderDetail["utgstpercent"] != null ? parseFloat(SalesOrderDetail.utgstpercent) : null,
                    SalesOrderDetail["utgstamount"] != null ? parseFloat(SalesOrderDetail.utgstamount) : null,
                    SalesOrderDetail["vatid"] != null ? parseInt(SalesOrderDetail.vatid) : null,
                    SalesOrderDetail["vatpercent"] != null ? parseFloat(SalesOrderDetail.vatpercent) : null,
                    SalesOrderDetail["vatamount"] != null ? parseFloat(SalesOrderDetail.vatamount) : null,
                    SalesOrderDetail["linetotal"] != null ? parseFloat(SalesOrderDetail.linetotal) : null,
                    parseInt(SalesOrderDetail.companyid),                      
                    parseInt(SalesOrderDetail.userid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesorderdetail.service-saveSalesOrderDetail", err);
        }
        return null;
    }
    this.deleteSalesOrderDetail = async function (req, SalesOrderDetail) {
        try {
                return await pool.query(req, "call spc_salesorderdetail_delete(?,?,?)",                       
                    [
                        parseInt(SalesOrderDetail.id),
                        parseInt(SalesOrderDetail.companyid),
                        parseInt(SalesOrderDetail.userid)            
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesorderdetail.service-deleteSalesOrderDetail", err);
        }
        return null;
    }

};
    
module.exports = salesorderdetailRepository;