let productionissuedetailRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllProductionIssueDetail = async function (req, ProductionIssuedetail) {
   try {
       return await pool.query(req, "call spc_feedmill_production_issuedetail_search(?,?)",
       [
        ProductionIssuedetail.production_issue_id,
        ProductionIssuedetail.companyid
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("ProductionIssuedetail.service - getAllProductionIssueDetail", err);
   } 
   return null;
};    

    // SELECT REPOSITORY

this.getProductionIssueDetail = async function (req, ProductionIssuedetail) {
   console.log("ProductionIssuedetail repo:",ProductionIssuedetail);
   try {
       return await pool.query(req, "call spc_feedmill_production_issuedetail_select(?,?)",
       [
        ProductionIssuedetail.id,
        ProductionIssuedetail.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("ProductionIssuedetail.service - getProductionIssueDetail", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveProductionIssueDetail = async function (req, ProductionIssuedetail) {
   console.log("ProductionIssuedetail",ProductionIssuedetail);
   try {
           var sp_text = "SET @out_id = 0; call spc_feedmill_production_issuedetail_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                  ProductionIssuedetail["id"] != null ? parseInt(ProductionIssuedetail.id) : null,
                   parseInt(ProductionIssuedetail.production_issue_id),
                   parseInt(ProductionIssuedetail.itemid),
                   ProductionIssuedetail.itembatch,
                   parseInt(ProductionIssuedetail.warehouseid),
                   parseFloat(ProductionIssuedetail.issue_qty),
                   parseFloat(ProductionIssuedetail.batch_totalcost),
                   parseInt(ProductionIssuedetail.companyid),
                   parseInt(ProductionIssuedetail.userid)   
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("ProductionIssuedetail.service-saveProductionIssueDetail", err);
   }
   return null;
};

   //DELETE REPOSITORY
   this.deleteProductionIssueDetail = async function (req, ProductionIssuedetail) {
    console.log("Density",ProductionIssuedetail);
    try {
            return await pool.query(req, "call spc_feedmill_production_issuedetail_delete(?,?,?)",                       
                [
                    parseInt(ProductionIssuedetail.id),
                    parseInt(ProductionIssuedetail.companyid),
                    parseInt(ProductionIssuedetail.userid), 
                ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionIssuedetail.service-deleteProductionIssueDetail", err);
    }
    return null;
}

// save JE for production Issue

this.saveProductionIssueJE = async function (req, ProductionIssuedetail) {
    console.log("Density",ProductionIssuedetail);
    try {
            return await pool.query(req, "call spc_saveproductionissue_je(?,?,?)",                       
                [
                    parseInt(ProductionIssuedetail.production_issue_id),
                    parseInt(ProductionIssuedetail.companyid),
                    parseInt(ProductionIssuedetail.userid), 
                ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionIssuedetail.service-saveProductionIssueJE", err);
    }
    return null;
}
this.getItemBatchInSatockQty = async function (req, ProductionIssuedetail) {

    try {
        return await pool.query(req, "call spc_itembtch_instock(?,?,?,?)",
        [   
            ProductionIssuedetail.itembatch,
            parseInt(ProductionIssuedetail.itemid),
            parseInt(ProductionIssuedetail.warehouseid),
            parseInt(ProductionIssuedetail.companyid)
            
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionIssuedetail - getItemBatchInSatockQty", err);
    }
    return null;
}

this.saveMaterialMomForProduction = async function (req, ProductionIssuedetail) {

    try {
        return await pool.query(req, "call spc_materailmom_productionissue_save(?,?,?,?,?,?,?,?,?)",
        [   
            parseInt(ProductionIssuedetail.itemid),
            ProductionIssuedetail.itembatch,
            parseInt(ProductionIssuedetail.production_issue_id),
            ProductionIssuedetail.productionissuedate,
            parseFloat(ProductionIssuedetail.batchqty),
            parseFloat(ProductionIssuedetail.batch_unitcost),
            parseInt(ProductionIssuedetail.warehouseid),
            parseInt(ProductionIssuedetail.companyid),
            parseInt(ProductionIssuedetail.userid)
            
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionIssuedetail - saveMaterialMomForProduction", err);
    }
    return null;
}

this.saveMomForIssue = async function (req, ProductionIssuedetail) {

    try {
        return await pool.query(req, "call spc_feedmillproductionissue_formom(?,?,?)",
        [   
            parseInt(ProductionIssuedetail.production_issue_id),
            parseInt(ProductionIssuedetail.companyid),
            parseInt(ProductionIssuedetail.userid)
            
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionIssuedetail - saveMomForIssue", err);
    }
    return null;
}



};

module.exports = productionissuedetailRepository;
















