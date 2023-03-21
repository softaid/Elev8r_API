let chartofaccountRepository = function (pool, log) {  

    this.saveChartOfAccount = async function (req, chartofaccount) {
        try {
                var sp_text = "SET @out_id = 0; call spc_chartofaccount_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        chartofaccount["id"] != null ? parseInt(chartofaccount.id) : null,
                        parseInt(chartofaccount.categoryid),
                        chartofaccount.coaname,
                        chartofaccount.glcode,
                        parseInt(chartofaccount.coatypeid),
                        chartofaccount.isparent,
                        chartofaccount.groupid,
                        chartofaccount.iscontrolacc,
                        chartofaccount.isblockmanualposting,
                        chartofaccount.iscashacc,
                        chartofaccount.isproject,
                        chartofaccount.projectid,
                        chartofaccount.isactive,
                        chartofaccount.iscostcenterapplicable,
                        parseInt(chartofaccount.companyid),
                        parseInt(chartofaccount.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("chartofaccount.repository - saveChartOfAccount", err);
        }
        return null;
    };

    this.getCOA = async function (req, chartofaccount) {
        console.log("chartofaccount : ",chartofaccount)
        try {
            return await pool.query(req, "call spc_chartofaccount_select(?)",
            [
                parseInt(chartofaccount.id)
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("chartofaccount.repository - getCOA", err);
        }
    
        return null;
    };    

    this.getAllCOA = async function (req, chartofaccount) {
        try {
            return await pool.query(req, "call spc_chartofaccount_search(?,?)",
            [
                parseInt(chartofaccount.companyid),
                parseInt(chartofaccount.categoryid)
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("chartofaccount.repository - getAllCOA", err);
        } 
        return null;
    };    

    //get coa groups
    this.getCOAGroups = async function (req, chartofaccount) {
        try {
            return await pool.query(req, "call spc_chartofaccount_getgroups(?,?)",
            [
                parseInt(chartofaccount.categoryid),
                parseInt(chartofaccount.companyid)
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("chartofaccount.repository - getCOAGroups", err);
        }
    
        return null;
    };    

    this.deleteCOA = async function (req, chartofaccount) {
        try {
                return await pool.query(req, "call spc_chartofaccount_delete(?)",                       
                    [
                        parseInt(chartofaccount.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("chartofaccount.repository - deleteCOA", err);
        }
        return null;
    };

    this.getCategorywiseLedgers = async function (req, chartofaccount) {
        try {
            return await pool.query(req, "call spc_chartofaccount_categoriwiseledgers(?,?)",
            [
                chartofaccount.categoryid,
                parseInt(chartofaccount.companyid),
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("chartofaccount.repository - getCategorywiseLedgers", err);
        } 
        return null;
    };    

    //get ledgers with no control account
    this.getLedgersWithNoControlAccount = async function (req, chartofaccount) {
        try {
            return await pool.query(req, "call spc_chartofaccount_ledgerswithnocontrolaccount(?)",
            [
                parseInt(chartofaccount.companyid),
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("chartofaccount.repository - getLedgersWithNoControlAccount", err);
        } 
        return null;
    };   

    //get all cash ledgers
    this.getAllCashLedgers = async function (req, chartofaccount) {
        try {
            return await pool.query(req, "call spc_chartofaccount_cashledgers(?)",
            [
                parseInt(chartofaccount.companyid),
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("chartofaccount.repository - getAllCashLedgers", err);
        } 
        return null;
    };   
    
    //get all ledgers
    this.getAllLedgers = async function (req, chartofaccount) {
        try {
            return await pool.query(req, "call spc_chartofaccoint_getallledgers(?)",
            [
                parseInt(chartofaccount.companyid),
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("chartofaccount.repository - getAllLedgers", err);
        } 
        return null;
    };   


};
    
module.exports = chartofaccountRepository;