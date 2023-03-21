let incomingoutgoingpaymentRepository = function (pool, log) {
    
    this.getAllIncomingOutgoingPayment = async function (req, payment) {
        try {
            return await pool.query(req, "call spc_incomingoutgoingpayment_search(?)",
            [
                payment.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("payment.repository - getAllIncomingOutgoingPayment", err);
        } 
        return null;
    };    

    this.getIncomingOutgoingPayment = async function (req, payment) {
        try {
            return await pool.query(req, "call spc_incomingoutgoingpayment_select(?)",
            [
                payment.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("payment.repository - getIncomingOutgoingPayment", err);
        }
    
        return null;
    };    

    //spc_incomingoutgoingpayment_bypaymenttypeid
    this.getIncomingOutgoingPaymentByType = async function (req, payment) {
        try {
            return await pool.query(req, "call spc_incomingoutgoingpayment_bypaymenttypeid(?,?)",
            [
                payment.paymenttypeid,
                payment.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("payment.repository - getIncomingOutgoingPaymentByType", err);
        }
    
        return null;
    };    


    this.saveIncomingOutgoingPayment = async function (req, payment) {
        try {
                var sp_text = "SET @out_id = 0; call spc_incomingoutgoingpayment_save(?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        payment["id"] != null ? parseInt(payment.id) : null,
                        payment["vouchermodeid"] != null ? parseInt(payment.vouchermodeid) : null,
                        payment.voucherdate,
                        payment.paymentsubject,
                        payment["paymenttypeid"] != null ? parseInt(payment.paymenttypeid) : null,
                        payment["partyid"] != null ? parseInt(payment.partyid) : null,
                        payment["ledgerid"] != null ? parseInt(payment.ledgerid) : null,
                        payment["paymentamount"] != null ? parseFloat(payment.paymentamount) : null, 
                        payment.byhand,
                        payment.narration,
                        parseInt(payment.companyid),
                        parseInt(payment.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("payment.repository - saveIncomingOutgoingPayment", err);
        }
        return null;
    };

    this.deleteIncomingOutgoingPayment = async function (req, payment) {
        try {
                return await pool.query(req, "call spc_incomingoutgoingpayment_delete(?)",                       
                    [
                        parseInt(payment.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("payment.repository - deleteIncomingOutgoingPayment", err);
        }
        return null;
    };

    //get party opening balance
    //
    this.getPartyWisePartyOpeningBalance = async function (req, payment) {
        try {
            return await pool.query(req, "call spc_partyopeningbalance_bypartyid(?,?)",
            [
                payment.partyid,
                payment.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("payment.repository - getPartyWisePartyOpeningBalance", err);
        }
    
        return null;
    };    
};
    
module.exports = incomingoutgoingpaymentRepository;