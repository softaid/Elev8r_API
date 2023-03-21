let salesinvoicefreightRepository = function (pool, log) {
    
    this.getAllSalesInvoiceFreight = async function (req, SalesInvoiceFreight) {
        try {
            return await pool.query(req, "call spc_salesinvoicefreight_search(?,?)",
            [
                SalesInvoiceFreight.salesinvoiceid,
                SalesInvoiceFreight.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoicefreight.service - getAllSalesInvoiceFreight", err);
        } 
        return null;
    };

    this.getSalesInvoiceFreight = async function (req, SalesInvoiceFreight) {
        try {
            return await pool.query(req, "call spc_salesinvoicefreight_select(?)",
            [
                SalesInvoiceFreight.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoicefreight.service - getSalesInvoiceFreight", err);
        }
    
        return null;
    };    

    this.saveSalesInvoiceFreight = async function (req, SalesInvoiceFreight) {
        try {
            var sp_text = "SET @out_id = 0; call spc_salesinvoicefreight_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                    SalesInvoiceFreight["id"] != null ? parseInt(SalesInvoiceFreight.id) : null,
                    parseInt(SalesInvoiceFreight.salesinvoiceid),
                    parseInt(SalesInvoiceFreight.freightid),
                    SalesInvoiceFreight.freightname,
                    parseFloat(SalesInvoiceFreight.amount),
                    SalesInvoiceFreight["taxid"] != null ? parseInt(SalesInvoiceFreight.taxid) : null,
                    SalesInvoiceFreight["taxpercent"] != null ? parseFloat(SalesInvoiceFreight.taxpercent) : null,
                    SalesInvoiceFreight["taxtypeid"] != null ? parseInt(SalesInvoiceFreight.taxtypeid) : null,
                    SalesInvoiceFreight["cgstid"] != null ? parseInt(SalesInvoiceFreight.cgstid) : null,
                    SalesInvoiceFreight["cgstpercent"] != null ? parseFloat(SalesInvoiceFreight.cgstpercent) : null,
                    SalesInvoiceFreight["cgstamount"] != null ? parseFloat(SalesInvoiceFreight.cgstamount) : null,
                    SalesInvoiceFreight["sgstid"] != null ? parseInt(SalesInvoiceFreight.sgstid) : null,
                    SalesInvoiceFreight["sgstpercent"] != null ? parseFloat(SalesInvoiceFreight.sgstpercent) : null,
                    SalesInvoiceFreight["sgstamount"] != null ? parseFloat(SalesInvoiceFreight.sgstamount) : null,
                    SalesInvoiceFreight["igstid"] != null ? parseInt(SalesInvoiceFreight.igstid) : null,
                    SalesInvoiceFreight["igstpercent"] != null ? parseFloat(SalesInvoiceFreight.igstpercent) : null,
                    SalesInvoiceFreight["igstamount"] != null ? parseFloat(SalesInvoiceFreight.igstamount) : null,
                    SalesInvoiceFreight["utgstid"] != null ? parseInt(SalesInvoiceFreight.utgstid) : null,
                    SalesInvoiceFreight["utgstpercent"] != null ? parseFloat(SalesInvoiceFreight.utgstpercent) : null,
                    SalesInvoiceFreight["utgstamount"] != null ? parseFloat(SalesInvoiceFreight.utgstamount) : null,
                    SalesInvoiceFreight["vatid"] != null ? parseInt(SalesInvoiceFreight.vatid) : null,
                    SalesInvoiceFreight["vatpercent"] != null ? parseFloat(SalesInvoiceFreight.vatpercent) : null,
                    SalesInvoiceFreight["vatamount"] != null ? parseFloat(SalesInvoiceFreight.vatamount) : null,
                    parseInt(SalesInvoiceFreight.companyid),                      
                    parseInt(SalesInvoiceFreight.userid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoicefreight.service-saveSalesInvoiceFreight", err);
        }
        return null;
    }

    this.deleteSalesInvoiceFreight = async function (req, SalesInvoiceFreight) {
        try {
                return await pool.query(req, "call spc_salesinvoicefreight_delete(?,?,?)",                       
                    [
                        parseInt(SalesInvoiceFreight.id),
                        parseInt(SalesInvoiceFreight.companyid),
                        parseInt(SalesInvoiceFreight.userid)            
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesinvoicefreight.service-deleteSalesInvoiceFreight", err);
        }
        return null;
    }

};
    
module.exports = salesinvoicefreightRepository;