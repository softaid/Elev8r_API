let incomingoutgoingpaymentdetailRepository = function (pool, log) {
    
    this.getAllIncomingOutgoingPaymentDetail = async function (req, paymentdetail) {
        try {
            console.log("getAllIncomingOutgoingPaymentDetail : ",paymentdetail);
            return await pool.query(req, "call spc_incomingoutgoingpaymentdetail_search(?)",
            [
                paymentdetail.incomingoutgoingpaymentid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("paymentdetail.repository - getAllIncomingOutgoingPaymentDetail", err);
        } 
        return null;
    };    

    this.getIncomingOutgoingPaymentDetail = async function (req, paymentdetail) {
        try {
            return await pool.query(req, "call spc_incomingoutgoingpaymentdetail_select(?)",
            [
                paymentdetail.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("paymentdetail.repository - getIncomingOutgoingPaymentDetail", err);
        }
    
        return null;
    };    

    this.saveIncomingOutgoingPaymentDetail = async function (req, paymentdetail) {
        try {
                var sp_text = "SET @out_id = 0; call spc_incomingoutgoingpaymentdetail_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
						parseInt(paymentdetail.journalentryid),
                        paymentdetail["paymentreferenceid"] != null ? parseInt(paymentdetail.paymentreferenceid) : null,
                        parseInt(paymentdetail.subledgertypeid),
                        paymentdetail.billno,
                        paymentdetail["billamount"] != null ? parseFloat(paymentdetail.billamount) : null,
                        paymentdetail["dramount"] != null ? parseFloat(paymentdetail.dramount) : null,
                        paymentdetail["ispartyopening"] != null ? parseInt(paymentdetail.ispartyopening) : null,
                        parseInt(paymentdetail.companyid),
                        parseInt(paymentdetail.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("paymentdetail.repository - saveIncomingOutgoingPaymentDetail", err);
        }
        return null;
    };

    this.deleteIncomingOutgoingPaymentDetail = async function (req, paymentdetail) {
        try {
                return await pool.query(req, "call spc_incomingoutgoingpaymentdetail_delete(?)",                       
                    [
                        parseInt(paymentdetail.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("paymentdetail.repository - deleteIncomingOutgoingPaymentDetail", err);
        }
        return null;
    };

    //get purchase invoice by vendorid
    //spc_purchaseinvoice_byvendorid
    this.getPurchaseInvoiceByVendorId = async function (req, paymentdetail) {
        try {
                return await pool.query(req, "call spc_invoice_byvendorid(?,?,?)",                       
                    [
                        parseInt(paymentdetail.vendorid),
                        paymentdetail.type,
                        parseInt(paymentdetail.companyid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("paymentdetail.repository - getPurchaseInvoiceByVendorId", err);
        }
        return null;
    };
};
    
module.exports = incomingoutgoingpaymentdetailRepository;