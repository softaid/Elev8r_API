let journalentrydetailRepository = function (pool, log) {
    
    this.getAllJournalEntryDetail = async function (req, journalentrydetail) {
        try {
            return await pool.query(req, "call spc_journalentrydetail_search(?)",
            [
                journalentrydetail.journalentryid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentrydetail.repository - getAllJournalEntryDetail", err);
        } 
        return null;
    };    

    this.getJournalEntryDetail = async function (req, journalentrydetail) {
        try {
            return await pool.query(req, "call spc_journalentrydetail_select(?)",
            [
                journalentrydetail.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentrydetail.repository - getJournalEntryDetail", err);
        }
    
        return null;
    };     


    this.saveJournalEntryDetail = async function (req, journalentrydetail) {
        try {
                var sp_text = "SET @out_id = 0; call spc_journalentrydetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        journalentrydetail["id"] != null ? parseInt(journalentrydetail.id) : null,
                        journalentrydetail["journalentryid"] != null ? parseInt(journalentrydetail.journalentryid) : null,
                        journalentrydetail["acledgerid"] != null ? parseInt(journalentrydetail.acledgerid) : null,
                        journalentrydetail.iscostcenter,
                        journalentrydetail["costcenterid"] != null ? parseInt(journalentrydetail.costcenterid) : null,
                        journalentrydetail["projectid"] != null ? parseInt(journalentrydetail.projectid) : null,
                        journalentrydetail.parenttype,
                        journalentrydetail.parentno,
                        journalentrydetail.billno,
                        journalentrydetail.billdate,
                        journalentrydetail["billamount"] != null ? parseFloat(journalentrydetail.billamount) : null,
                        journalentrydetail.dramount,
                        journalentrydetail.cramount,
                        journalentrydetail.entrycode,
                        journalentrydetail["partyid"] != null ? parseInt(journalentrydetail.partyid) : null,
                        journalentrydetail.entrytype,
                        journalentrydetail["loadonitemid"] != null ? parseInt(journalentrydetail.loadonitemid) : null,
                        journalentrydetail["subledgertypeid"] != null ? parseInt(journalentrydetail.subledgertypeid) : null,
                        journalentrydetail.narration,
                        parseInt(journalentrydetail.companyid),
                        parseInt(journalentrydetail.userid)
                    ]);
        }
        catch (err) {
            log.dbErrorLog("journalentrydetail.repository - saveJournalEntryDetail", err);
        }
        return null;
    };

    this.deleteJournalEntryDetail = async function (req, journalentrydetail) {
        try {
                return await pool.query(req, "call spc_journalentrydetail_delete(?)",                       
                    [
                        parseInt(journalentrydetail.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentrydetail.repository - deleteJournalEntryDetail", err);
        }
        return null;
    };
   
    // save second JE on batch
    this.saveBatchJE = async function (req, journalentrydetail) {
        try {
                var sp_text = "SET @out_id = 0; call spc_journalentry_forwipbird(?,?,?,?,?,?,?,?); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [

                        journalentrydetail["id"] != null ? parseInt(journalentrydetail.id) : null,
                        journalentrydetail["journalentryid"] != null ? parseInt(journalentrydetail.journalentryid) : null,
                        journalentrydetail.voucherdate,
                        journalentrydetail["projectid"] != null ? parseInt(journalentrydetail.projectid) : null,
                        parseInt(journalentrydetail.moduleid),
                        parseFloat(journalentrydetail.dramount),
                        parseFloat(journalentrydetail.cramount),
                        parseInt(journalentrydetail.companyid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentrydetail.repository - saveBatchJE", err);
        }
        return null;
    };

    this.saveincominoutgoingJournalEntryDetail = async function (req, journalentrydetail) {
        try {
                var sp_text = "SET @out_id = 0; call spc_incomingoutgoingjournalentrydetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        journalentrydetail["id"] != null ? parseInt(journalentrydetail.id) : null,
                        journalentrydetail["journalentryid"] != null ? parseInt(journalentrydetail.journalentryid) : null,
			parseInt(journalentrydetail.partyid),
                        journalentrydetail["paymentreferenceid"] != null ? parseInt(journalentrydetail.paymentreferenceid) : null,
                        journalentrydetail["acledgerid"] != null ? parseInt(journalentrydetail.acledgerid) : null,
                        journalentrydetail.iscostcenter,
                        journalentrydetail["costcenterid"] != null ? parseInt(journalentrydetail.costcenterid) : null,
                        journalentrydetail["projectid"] != null ? parseInt(journalentrydetail.projectid) : null,
                        journalentrydetail.parenttype,
                        journalentrydetail["parentno"] != null ? parseInt(journalentrydetail.parentno) : null,
                        journalentrydetail.billno,
                        journalentrydetail["billamount"] != null ? parseInt(journalentrydetail.billamount) : null,
                        journalentrydetail["dramount"] != null ? parseInt(journalentrydetail.dramount) : null,
                        journalentrydetail["cramount"] != null ? parseInt(journalentrydetail.cramount) : null,
                        journalentrydetail["entrycode"] != null ? parseInt(journalentrydetail.entrycode) : null,
                        journalentrydetail.entrytype,
                        journalentrydetail["loadonitemid"] != null ? parseInt(journalentrydetail.loadonitemid) : null,
                        journalentrydetail["subledgertypeid"] != null ? parseInt(journalentrydetail.subledgertypeid) : null,
                        journalentrydetail["narration"] != null ? (journalentrydetail.narration) : null,
                        parseInt(journalentrydetail.companyid),
                        parseInt(journalentrydetail.acledgerid2),
                        journalentrydetail.transactionname,
			journalentrydetail["ispartyopening"] != null ? parseInt(journalentrydetail.ispartyopening) : null,
			journalentrydetail.payeebank,
			journalentrydetail.istds,
                        parseInt(journalentrydetail.userid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentrydetail.repository - saveJournalEntryDetail", err);
        }
        return null;
    };
	
	this.checkBalance = async function (req, journalentrydetail) {
        try {
            return await pool.query(req, "call spc_checkledgerbalance(?,?,?)",
            [
                journalentrydetail.ledgerid,
		journalentrydetail.voucherdate,
                journalentrydetail.companyid

            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("journalentrydetail.repository - checkBalance", err);
        }
    
        return null;
    };
 
};
    
module.exports = journalentrydetailRepository;