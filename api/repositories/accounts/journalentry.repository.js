let journalentryRepository = function (pool, log) {
    
    this.getAllJournalEntries = async function (req, journalentry) {
        try {
            return await pool.query(req, "call spc_journalentry_search(?)",
            [
                journalentry.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentry.repository - getAllIncomingOutgoingPayment", err);
        } 
        return null;
    };
    this.getJournalEntrieList = async function (req, journalentry) {
        try {
            return await pool.query(req, "call spc_account_journalentry_search_list(?,?,?,?)",
            [
                journalentry.vouchertypeid,
                journalentry.from_date,
                journalentry.to_date,
                journalentry.company_id
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentry.repository - getJournalEntrieList", err);
        } 
        return null;
    };    
    this.getincomingpaymentList = async function (req, journalentry) {
        try {
            return await pool.query(req, "call spc_account_incomingpayment_search_list(?,?,?,?,?)",
            [
                journalentry.vouchermodeid,
                journalentry.from_date,
                journalentry.to_date,
                journalentry.company_id,
                journalentry.vouchertypeid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentry.repository - getincomingpaymentList", err);
        } 
        return null;
    };    
    this.getcrdrList = async function (req, journalentry) {
        try {
            return await pool.query(req, "call spc_account_crdr_search_list(?,?,?,?)",
            [
                journalentry.voucher_type_id,
                journalentry.from_date,
                journalentry.to_date,
                journalentry.company_id
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentry.repository - getcrdrList", err);
        } 
        return null;
    };    
   
    this.getJournalEntry = async function (req, journalentry) {
        try {
            return await pool.query(req, "call spc_journalentry_select(?)",
            [
                journalentry.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentry.repository - getJournalEntry", err);
        }
    
        return null;
    };     


    this.saveJournalEntry = async function (req, journalentry) {
        try {
                var sp_text = "SET @out_id = 0; call spc_journalentry_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        journalentry["id"] != null ? parseInt(journalentry.id) : null,
                        journalentry["disp_bucketid"] != null ? parseInt(journalentry.disp_bucketid) : null,
                        journalentry["vouchertypeid"] != null ? parseInt(journalentry.vouchertypeid) : null,
                        journalentry["vouchermodeid"] != null ? parseInt(journalentry.vouchermodeid) : null,
                        journalentry.voucherdate,
                        journalentry.bankdate,
                        journalentry["branchid"] != null ? parseInt(journalentry.branchid) : null,
                        journalentry.uservoucherno,
                        journalentry.chequeno,
                        journalentry.chequedate,
                        journalentry.byhand,
                        journalentry["deletestatusid"] != null ? parseInt(journalentry.deletestatusid) : null,
                        journalentry["partyid"] != null ? parseInt(journalentry.partyid) : null,
                        journalentry.partycode,
                        journalentry["subledgertypeid"] != null ? parseInt(journalentry.subledgertypeid) : null,
                        journalentry["dimensionid"] != null ? parseInt(journalentry.dimensionid) : null,
                        journalentry["moduleid"] != null ? parseInt(journalentry.moduleid) : null,
                        journalentry["approvestatusid"] != null ? parseInt(journalentry.approvestatusid) : null,
                        journalentry.journalentrysubject,
                        journalentry.addressto,
                        journalentry.financialyear,
                        journalentry["bankid"] != null ? parseInt(journalentry.bankid) : null,
                        journalentry["transactionid"] != null ? parseInt(journalentry.transactionid) : null,
                        journalentry.narration,
                        parseInt(journalentry.companyid),
                        parseInt(journalentry.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentry.repository - saveJournalEntry", err);
        }
        return null;
    };

    this.deleteJournalEntry = async function (req, journalentry) {
        try {
                return await pool.query(req, "call spc_journalentry_delete(?)",                       
                    [
                        parseInt(journalentry.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentry.repository - deleteJournalEntry", err);
        }
        return null;
    };

    this.getPostdatedCheques = async function (req, journalentry) {
        try {
            return await pool.query(req, "call spc_postdatedcheques_search(?,?,?)",
            [
		journalentry.bankid,
                journalentry.bankledgerid,
                journalentry.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentry.repository - getPostdatedCheques", err);
        } 
        return null;
    };    


    this.saveBankReconciliation = async function (req, journalentry) {
        try {
                var sp_text = "SET @out_id = 0; call spc_bankreconciliation_save(?,?,?,?, @out_id); SELECT @out_id as jeid;";                  
                return await pool.query(req, sp_text,                       
                    [
                        parseInt(journalentry.jeid),
			parseInt(journalentry.bankid),
                        journalentry.chequeclearancedate,
                        parseInt(journalentry.companyid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentry.repository - saveBankReconciliation", err);
        }
        return null;
    };


 
};
    
module.exports = journalentryRepository;