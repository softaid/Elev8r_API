let purchaseReportsRepository = function (pool, log) {
    

    this.getAllParty = async function (req, Purchase) {
        try {
            return await pool.query(req, "call spc_party_forpurchaseinvoice(?)",
            [
              Purchase.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Purchase - getAllParty", err);
        }
    
        return null;
    };   

      this.getPurchaseRegisterReport = async function (req, Purchase) {
        try {
            return await pool.query(req, "call spc_purchaseregister_report(?,?,?,?)",
            [
                Purchase.vendorids,
                Purchase.fromdate,
                Purchase.todate,
                Purchase.companyid
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Purchase - getPurchaseRegisterReport", err);
        }
    
        return null;
    };   


    //get itemwisestock  report
    this.getItemWiseStockReport = async function (req, Purchase) {
        console.log("-------------purchase-------------",Purchase);
      try {
          return await pool.query(req, "call spc_itemwisestock_report(?,?,?,?,?)",
          [
            Purchase.fromdate,
            Purchase.todate,  
            Purchase.itemid,
            Purchase.warehouseids,
            Purchase.companyid

          ]);
      }
      catch (err) {
          console.log('Error thrown : ', err);
          log.dbErrorLog("Purchase - getItemWiseStockReport", err);
      };
  
      return null;
  };   

  this.getItemWiseStockReportOne = async function (req, Purchase) {
    console.log("-------------purchase-------------",Purchase);
  try {
      return await pool.query(req, "call spc_itemwisestockmultiple_report(?,?,?,?)",
      [
        Purchase.fromdate,
        Purchase.todate,  
        Purchase.itemid,
        Purchase.companyid

      ]);
  }
  catch (err) {
      console.log('Error thrown : ', err);
      log.dbErrorLog("Purchase - getItemWiseStockReportOne", err);
  };

  return null;
};   
  this.getwarehousebylocation = async function (req, Purchase) {
    try {
        return await pool.query(req, "call spc_warehouse_bylocation_report(?,?)",
        [
          Purchase.locationid,
          Purchase.companyid

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("Purchase - getwarehousebylocation", err);
    };

    return null;
};   


     //get itemsubgroup  report
     this.getItemSubGroupReport = async function (req, Purchase) {
        try {
            return await pool.query(req, "call spc_itemsubgroup_report(?,?,?,?)",
            [
              Purchase.warehouseids,
              Purchase.fromdate,
              Purchase.todate,
              Purchase.companyid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Purchase - getItemSubGroupReport", err);
        };
    
        return null;
    };   



this.getPartywisePurchaseOrderReport = async function (req, Purchase) {
    try {
        return await pool.query(req, "call spc_partywisepurchaseorderstatus_report(?,?,?,?)",
        [
         
          Purchase.fromdate,
          Purchase.todate,
          Purchase.customerid,
          Purchase.companyid

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("Purchase - getPartywisePurchaseOrderReport", err);
    };

    return null;
};   


this.getGRNRegisterReport = async function (req, Purchase) {
    try {
        return await pool.query(req, "call spc_purchasegrnregister_report(?,?,?,?)",
        [
         
          Purchase.fromdate,
          Purchase.todate,
          Purchase.itemid,
          Purchase.companyid

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("Purchase - getGRNRegisterReport", err);
    };

    return null;
};   

this.getPendingPurchaseOrderReport = async function (req, Purchase) {
    try {
        return await pool.query(req, "call spc_purchasependingpuechaseorder_report(?,?,?)",
        [
         
          Purchase.fromdate,
          Purchase.todate,
          Purchase.companyid

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("Purchase - getPendingPurchaseOrderReport", err);
    };

    return null;
};   

this.dashboard = async function (req, Purchase) {
    try {
        return await pool.query(req, "call spc_allbreederbatchdetail_search(?)",
        [
         
          
          Purchase.companyid

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("Purchase - dashboard", err);
    };

    return null;
};   








};
  
module.exports = purchaseReportsRepository;