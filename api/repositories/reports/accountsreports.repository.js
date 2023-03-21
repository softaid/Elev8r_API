let accountsreportsRepository = function (pool, log) {
    

   // get Subledger  register report for multipleparty

    this.getSubledgerRegister = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_subledgerregister_report(?,?,?,?,?)",
            [
                accountsRep.partyroleid,
                accountsRep.partyid,
                accountsRep.fromdate,
                accountsRep.todate,
                accountsRep.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getSubledgerRegister", err);
        }
    
        return null;
    };   

    // get Payable Balance Report 

    this.getPayableBalanceReport = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_payablebalance_Report(?,?,?,?)",
            [
               
                accountsRep.partyid,
                accountsRep.fromdate,
                accountsRep.todate,
                accountsRep.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getPayableBalanceReport", err);
        }
    
        return null;
    };   

      // get Subledger  register report for singleparty

    this.getSubledgerRegisterforsingleparty = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_subledgerregisterforoneparty_report(?,?,?,?,?)",
            [
                accountsRep.partyroleid,
                accountsRep.partyid,
                accountsRep.fromdate,
                accountsRep.todate,
                accountsRep.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getSubledgerRegisterforsingleparty", err);
        }
    
        return null;
    };   

    // get general ledger register report

    this.getGLRegister = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_glregister_report(?,?,?,?)",
            [
                accountsRep.ledgerid,
                accountsRep.fromdate,
                accountsRep.todate,
                accountsRep.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getGLRegister", err);
        }
    
        return null;
    };   

	 // get general ledger register for single ledgerreport

      this.getGLRegistersingleledger = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_glregisterforsingleledger_report(?,?,?,?)",
            [
                accountsRep.ledgerid,
                accountsRep.fromdate,
                accountsRep.todate,
                accountsRep.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getGLRegistersingleledger", err);
        }
    
        return null;
    };   

    //get bank book
    this.getBankBookRegister = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_bankbookregister_report(?,?,?,?)",
            [
                accountsRep.ledgerid,
                accountsRep.fromdate,
                accountsRep.todate,
                accountsRep.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getBankBookRegister", err);
        }
    
        return null;
    };   

    //get general ledger trial balance
    this.getGLTrialBalance = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_genledgertb_report(?,?,?,?)",
            [
                accountsRep.branchid,
                accountsRep.fromdate,
                accountsRep.todate,
                accountsRep.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getGLTrialBalance", err);
        }
    
        return null;
    };   
// get day book
    this.getDayBook = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_daybook_report(?,?)",
            [
                accountsRep.date,
                accountsRep.companyid

  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getDayBook", err);
        }
    
        return null;
    };   

    //Balance sheet
    this.getBalanceSheet = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_ledger_balancesheet(?,?)",
            [
                accountsRep.todate,
                accountsRep.companyid

  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getBalanceSheet", err);
        }
    
        return null;
    };  

    //Profit and loss
    this.getProfitAndLoss = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_ledger_profitandloss(?,?,?)",
            [
                accountsRep.fromdate,
                accountsRep.todate,
                accountsRep.companyid

  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getProfitAndLoss", err);
        }
    
        return null;
    };  

    //get cash book
    this.getCashBookRegister = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_cashbookregister_report(?,?,?,?)",
            [
                accountsRep.ledgerid,
                accountsRep.fromdate,
                accountsRep.todate,
                accountsRep.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getCashBookRegister", err);
        }
    
        return null;
    };
  //Profit and loss
    this.getProfitAndLossDiff = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_profitand_loss_diff(?,?)",
            [
                accountsRep.todate,
                accountsRep.companyid

  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getProfitAndLossDiff ", err);
        }
    
        return null;
    }; 

    //get SLTB
    this.getSLTrialBalance = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_sltb_report(?,?,?,?,?)",
            [
                accountsRep.branchid,
                accountsRep.partyroleid,
                accountsRep.fromdate,
                accountsRep.todate,
                accountsRep.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getSLTrialBalance", err);
        }
    
        return null;
    };

	 // get Receivable Balance Report

     this.getReceivableBalanceReport = async function (req, accountsRep) {
        try {
            return await pool.query(req, "call spc_receivablebalance_Report(?,?,?,?)",
            [
               
                accountsRep.partyid,
                accountsRep.fromdate,
                accountsRep.todate,
                accountsRep.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("AccountsReports - getReceivableBalanceReport", err);
        }
    
        return null;
    };   
};
  
module.exports = accountsreportsRepository;