let salesinvoicedetailRepository = function (pool, log) {
    
    this.getAllSalesInvoiceDetail = async function (req, SalesInvoiceDetail) {
        try {
            return await pool.query(req, "call spc_salesinvoicedetail_search(?,?)",
            [
                SalesInvoiceDetail.salesinvoiceid,
                SalesInvoiceDetail.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoicedetail.service - getAllSalesInvoiceDetail", err);
        } 
        return null;
    };

    this.getSalesInvoiceDetailByInvoice = async function (req, SalesInvoiceDetail) {
        try {
            return await pool.query(req, "call spc_salesinvoicedetail_invoicesearch(?,?)",
            [
                SalesInvoiceDetail.salesinvoiceid,
                SalesInvoiceDetail.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoicedetail.service - getAllSalesInvoiceDetail", err);
        } 
        return null;
    };

    this.getSalesInvoiceDetail = async function (req, SalesInvoiceDetail) {
        try {
            return await pool.query(req, "call spc_salesinvoicedetail_select(?)",
            [
                SalesInvoiceDetail.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoicedetail.service - getSalesInvoiceDetail", err);
        }
    
        return null;
    };    

     this.saveSalesInvoiceDetail = async function (req, SalesInvoiceDetail) {
        try {
            var sp_text = "SET @out_id = 0; call spc_salesinvoicedetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                    SalesInvoiceDetail["id"] != null ? parseInt(SalesInvoiceDetail.id) : null,
                    parseInt(SalesInvoiceDetail.salesinvoiceid),
                    SalesInvoiceDetail["salesorderdetailid"] != null ? parseInt(SalesInvoiceDetail.salesorderdetailid) : null,
                    SalesInvoiceDetail["salesdeliverydetailid"] != null ? parseInt(SalesInvoiceDetail.salesdeliverydetailid) : null,
                    parseInt(SalesInvoiceDetail.itemid),
                    parseFloat(SalesInvoiceDetail.quantity),
                    SalesInvoiceDetail["isbird"] != null ? parseInt(SalesInvoiceDetail.isbird) : null,
                    SalesInvoiceDetail["weight"] != null ? parseFloat(SalesInvoiceDetail.weight) : null,
                    SalesInvoiceDetail["iscalcweight"] != null ? parseInt(SalesInvoiceDetail.iscalcweight) : null,
                    SalesInvoiceDetail["itemunit"] != null ? parseInt(SalesInvoiceDetail.itemunit) : null,
                    SalesInvoiceDetail["unitprice"] != null ? parseFloat(SalesInvoiceDetail.unitprice) : null,
                    SalesInvoiceDetail["discount"] != null ? parseFloat(SalesInvoiceDetail.discount) : null,
                    SalesInvoiceDetail["taxid"] != null ? parseInt(SalesInvoiceDetail.taxid) : null,
                    SalesInvoiceDetail["taxpercent"] != null ? parseFloat(SalesInvoiceDetail.taxpercent) : null,
                    SalesInvoiceDetail["taxtypeid"] != null ? parseInt(SalesInvoiceDetail.taxtypeid) : null,
                    SalesInvoiceDetail["cgstid"] != null ? parseInt(SalesInvoiceDetail.cgstid) : null,
                    SalesInvoiceDetail["cgstpercent"] != null ? parseFloat(SalesInvoiceDetail.cgstpercent) : null,
                    SalesInvoiceDetail["cgstamount"] != null ? parseFloat(SalesInvoiceDetail.cgstamount) : null,
                    SalesInvoiceDetail["sgstid"] != null ? parseInt(SalesInvoiceDetail.sgstid) : null,
                    SalesInvoiceDetail["sgstpercent"] != null ? parseFloat(SalesInvoiceDetail.sgstpercent) : null,
                    SalesInvoiceDetail["sgstamount"] != null ? parseFloat(SalesInvoiceDetail.sgstamount) : null,
                    SalesInvoiceDetail["igstid"] != null ? parseInt(SalesInvoiceDetail.igstid) : null,
                    SalesInvoiceDetail["igstpercent"] != null ? parseFloat(SalesInvoiceDetail.igstpercent) : null,
                    SalesInvoiceDetail["igstamount"] != null ? parseFloat(SalesInvoiceDetail.igstamount) : null,
                    SalesInvoiceDetail["utgstid"] != null ? parseInt(SalesInvoiceDetail.utgstid) : null,
                    SalesInvoiceDetail["utgstpercent"] != null ? parseFloat(SalesInvoiceDetail.utgstpercent) : null,
                    SalesInvoiceDetail["utgstamount"] != null ? parseFloat(SalesInvoiceDetail.utgstamount) : null,
                    SalesInvoiceDetail["vatid"] != null ? parseInt(SalesInvoiceDetail.vatid) : null,
                    SalesInvoiceDetail["vatpercent"] != null ? parseFloat(SalesInvoiceDetail.vatpercent) : null,
                    SalesInvoiceDetail["vatamount"] != null ? parseFloat(SalesInvoiceDetail.vatamount) : null,
                    SalesInvoiceDetail["linetotal"] != null ? parseFloat(SalesInvoiceDetail.linetotal) : null,
                    SalesInvoiceDetail["warehousebinid"] != null ? parseInt(SalesInvoiceDetail.warehousebinid) : null,
		    SalesInvoiceDetail["batchid"] != null ? parseInt(SalesInvoiceDetail.batchid) : null,
                    parseInt(SalesInvoiceDetail.companyid),                      
                    parseInt(SalesInvoiceDetail.userid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoicedetail.service-saveSalesInvoiceDetail", err);
        }
        return null;
    }
    this.deleteSalesInvoiceDetail = async function (req, SalesInvoiceDetail) {
        try {
                return await pool.query(req, "call spc_salesinvoicedetail_delete(?,?,?)",                       
                    [
                        parseInt(SalesInvoiceDetail.id),
                        parseInt(SalesInvoiceDetail.companyid),
                        parseInt(SalesInvoiceDetail.userid)            
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoicedetail.service-deleteSalesInvoiceDetail", err);
        }
        return null;
    }

 //sales invoice JE
 this.saveSalesInvoiceJE = async function (req, salesinvoicedetail) {
    try {
        return await pool.query(req, "call spc_savesalesinvoice_je(?,?,?)",
        [
            salesinvoicedetail.salesinvoiceid,
            salesinvoicedetail.companyid,
            salesinvoicedetail.userid
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("salesinvoicedetail.service - saveSalesInvoiceJE", err);
    } 
    return null;
};


// Issue items by sales invoice
    this.salesInvoiceIssueItems = async function (req, SalesInvoice) {
        try {
            return await pool.query(req, "call spc_salesinvoice_issueitems(?,?,?)",
            [
                SalesInvoice.salesinvoiveid,
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
    
module.exports = salesinvoicedetailRepository;