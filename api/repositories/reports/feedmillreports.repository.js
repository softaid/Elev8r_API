let feedMillReportsRepository = function (pool, log) {
    
   // FedMill BillOfMaterial Report Repository

    this.getAllItems = async function (req, FeedMill) {
        try {
            return await pool.query(req, "call spc_billofmaterialreport_search(?,?)",
            [
                FeedMill.itemid,
                FeedMill.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("FeedMill - getAllItems", err);
        }
    
        return null;
    };   

    // FeedMill AcknowledgementSlip Report reposotory

    this.getAcknowledgementSlipRegisterReport = async function (req, acknowledgementslip) {
        try {
            return await pool.query(req, "call spc_acknowledgementslipreport_search(?,?,?)",
            [
                
                acknowledgementslip.fromdate,
                acknowledgementslip.todate,
                acknowledgementslip.companyid
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("acknowledgementslip - getAcknowledgementSlipRegisterReport", err);
        }
    
        return null;
    };  
    this.getWeightSlipRegisterReport = async function (req, weightslip) {
        try {
            return await pool.query(req, "call spc_weightslipreport_search(?,?,?)",
            [
                
                weightslip.fromdate,
                weightslip.todate,
                weightslip.companyid
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("weightslip - getWeightSlipRegisterReport", err);
        }
    
        return null;
    };   

    this.getTestResultRegisterReport = async function (req, Test) {
        try {
            return await pool.query(req, "call spc_testresultregister_search(?,?,?)",
            [
                
                Test.fromdate,
                Test.todate,
                Test.companyid
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Test - getTestResultRegisterReport", err);
        }
    
        return null;
    };   

    this.getWarehouseByBranchnameReport = async function (req, FeedMill) {
        try {
            return await pool.query(req, "call spc_getwarehousebybranchname_report(?,?)",
            [
                
                FeedMill.branchid,
                FeedMill.companyid
                
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Test - getWarehouseByBranchnameReport", err);
        }
    
        return null;
    };   
      this.getWarehousebinByWarehouseid = async function (req, FeedMill) {
        try {
            return await pool.query(req, "call spc_getwarehousebinbywarehouse_report(?,?)",
            [
                
                FeedMill.warehouseid,
                FeedMill.companyid
                
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Test - getWarehousebinByWarehouseid", err);
        }
    
        return null;
    };   

    this.getitemByWarehousebinid = async function (req, FeedMill) {
        try {
            return await pool.query(req, "call spc_getitembywarehousebin_report(?,?)",
            [
                
                FeedMill.warehousebinid,
                FeedMill.companyid
                
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Test - getitemByWarehousebinid", err);
        }
    
        return null;
    };   


    this.getDataForDailyGodownStockReport = async function (req, FeedMill) {
        try {
            return await pool.query(req, "call spc_feedmilldailygodownstock_report(?,?,?,?)",
            [
                
                FeedMill.fromdate,
                FeedMill.todate,
                FeedMill.warehouseid,
                FeedMill.companyid
                
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Test - getDataForDailyGodownStockReport", err);
        }
    
        return null;
    };   

    this.getFeedFormulaReportitem = async function (req, FeedMill) {
        try {
            return await pool.query(req, "call spc_getitembyitemgroup_report(?,?)",
            [
                
                
                FeedMill.itemgroupid,
                FeedMill.companyid
                
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Test - getFeedFormulaReportitem", err);
        }
    
        return null;
    };   

    this.getFeedFormulaReport = async function (req, FeedMill) {
        try {
            return await pool.query(req, "call spc_feedmillfeedformula_report(?,?,?,?,?)",
            [
                
                FeedMill.fromdate,
                FeedMill.todate,
                FeedMill.itemgroupid,
                FeedMill.itemid,
                FeedMill.companyid
                
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Test - getFeedFormulaReport", err);
        }
    
        return null;
    };   

     this.getFeedProductionReport = async function (req, FeedMill) {
        try {
            return await pool.query(req, "call spc_feedmillfeedproduction_report(?,?,?,?)",
            [
                
                FeedMill.fromdate,
                FeedMill.todate,
                FeedMill.itemid,
                FeedMill.companyid
                
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Test - getFeedProductionReport", err);
        }
    
        return null;
    }; 
     this.getStockadjustmentReport = async function (req, FeedMill) {
        try {
            return await pool.query(req, "call spc_stockadjustment_report(?,?)",
            [
                
                FeedMill.itemid,
                FeedMill.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Test - getStockadjustmentReport", err);
        }
    
        return null;
    };   
    
     
    this.getQualityCheckReport = async function (req, Test) {
        try {
            return await pool.query(req, "call spc_qualitycheckreport_search(?,?,?)",
            [
                
                Test.fromdate,
                Test.todate,
                Test.companyid
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Test - getQualityCheckReport", err);
        }
    
        return null;
    };   
  
    
};
  
module.exports = feedMillReportsRepository;

