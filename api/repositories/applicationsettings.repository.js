let applicationsettingsRepository = function (pool, log) {
    
    this.getApplicationSettings = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_applicationsettings_search(?)",
            [
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("applicationsettings.repository - getApplicationSettings", err);
        } 
        return null;
    };

    this.saveApplicationSettings = async function (req, Params) {
        try {
                var sp_text = "SET @out_id = 0; call spc_applicationsettings_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Params["id"] != null ? parseInt(Params.id) : null,
                        Params.partywithmultipleroles,
                        Params.showdisplayprefix,
                        parseInt(Params.recordsperpage),
                        Params.pdcreminder != null ? parseInt(Params.pdcreminder) : null,            
                        Params.creditperiodreminder != null ? parseInt(Params.creditperiodreminder) : null,         
                        Params.financialyearstartday != null ? parseInt(Params.financialyearstartday) : null,          
                        Params.financialyearstartmonth != null ? parseInt(Params.financialyearstartmonth) : null,
                        Params.datedisplayformat,
                        Params.stocknamefields,
                        Params.requisitionapproval,
                        Params.poapproval,
                        Params.showmrpandassessment,
                        Params.purchaseenquiryprefix,
                        Params.purchaseorderprefix,
                        Params.purchasereturnprefix,
                        Params.quotationapproval,
                        Params.billapproval,
                        Params.proformainvoiceapproval,
                        Params.saleschallanapproval,
                        Params.salesquotationprefix,
                        Params.saleschallanprefix,
                        Params.salesbillprefix,
                        Params.servicebillprefix,
                        Params.proformainvoiceprefix,
                        Params.batchoutorder,
                        Params.calculatetaxbeforediscount,
                        Params.receiptvoucherapproval,
                        Params.paymentvoucherapproval,
                        Params.contravoucherapproval,
                        Params.journalvoucherapproval,
                        Params.receiptvoucherprefix,
                        Params.smtpserver,
                        Params.portno,
                        Params.host,
                        Params.emailid,
                        Params.password,
                        Params.emailretrycount,
                        Params.requiredssl,
                        parseInt(Params.companyid),
                        parseInt(Params.userid)  
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("applicationsettings.repository - saveApplicationSettings", err);
        }
        return null;
    };
};
    
module.exports = applicationsettingsRepository;