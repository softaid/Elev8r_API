let productionissueRepository = function (pool, log) {

    // SEARCH REPOSITORY

    this.getAllProductionIssue = async function (req, productionissue) {
        try {
            return await pool.query(req, "call spc_feedmill_production_issue_search(?)",
                [
                    productionissue.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionissue.service - getAllProductionIssueResult", err);
        }
        return null;
    };

    // SELECT REPOSITORY

    this.getProductionIssue = async function (req, productionissue) {
        console.log("productionissue repo:", productionissue);
        try {
            return await pool.query(req, "call spc_feedmill_production_issue_select(?,?)",
                [
                    productionissue.id,
                    productionissue.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionissue.service - getProductionIssue", err);
        }
        return null;
    };

    //SAVE REPOSITORY

    this.saveProductionIssue = async function (req, productionissue) {
        console.log("productionissue", productionissue);
        try {
            var sp_text = "SET @out_id = 0; call spc_feedmill_production_issue_save(?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(req, sp_text,
                [
                    productionissue["id"] != null ? parseInt(productionissue.id) : null,
                    productionissue.production_issue_no,
                    parseInt(productionissue.productionorder_id),
                    productionissue.issue_date,
                    productionissue.status_id,
                    parseFloat(productionissue.unitcost),
                    parseInt(productionissue.companyid),
                    parseInt(productionissue.userid),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionissue.service-saveProductionIssue", err);
        }
        return null;
    };

    //DELETE REPOSITORY

    this.deleteProductionIssue = async function (req, Density) {
        console.log("Density", Density);
        try {
            return await pool.query(req, "call spc_feedmill_production_issue_delete(?,?,?)",
                [
                    parseInt(productionissue.id),
                    parseInt(productionissue.companyid),
                    parseInt(productionissue.userid),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionissue.service-deleteProductionIssue", err);
        }
        return null;
    }

    // get itemqty in grpo by itemid and warehouse


    this.getItembatchBalByItemid = async function (req, productionissue) {
        console.log("productionissue repo:", productionissue);
        try {
            return await pool.query(req, "call spc_feedmill_itemidbatch_byitemid(?,?,?)",
                [
                    productionissue.itemid,
                    productionissue.warehouseid,
                    productionissue.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionissue.service - getItembatchBalByItemid", err);
        }
        return null;
    };

    // get itemqty in grpo by itemid and warehouse
    this.getPodetailForQty = async function (req, productionissue) {
        console.log("productionissue repo:", productionissue);
        try {
            return await pool.query(req, "call spc_productionorderdetail_forqty(?,?,?,?)",
                [
                    productionissue.productionorderid,
                    productionissue.transactiondate,
                    productionissue.warehouseid,
                    productionissue.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionissue.service - getPodetailForQty", err);
        }
        return null;
    };

      // get itemqty in grpo by itemid and warehouse
      this.getPoIssueDetail = async function (req, productionissue) {
        try {
            return await pool.query(req, "call spc_productionissuedetail_forqty(?,?,?)",
                [
                    productionissue.productionorderid,
                    productionissue.transactiondate,
                    productionissue.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionissue.service - getPoIssueDetail", err);
        }
        return null;
    };
 // get itemqty in batch Wise issue cost
    this.getPoIssueBatchWiseDetail = async function (req, productionissue) {
        try {
            return await pool.query(req, "call get_feedmill_production_issue_batchwise_unitcost(?,?,?,?,?)",
                [
                    productionissue.transactiondate,
                    productionissue.item_id,
                    productionissue.to_warehouse_id,
                    productionissue.quantity,
                    productionissue.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionissue.service - getPoIssueBatchWiseDetail", err);
        }
        return null;
    };    
    
    this.getIssueForProductionList = async function (req, productionissue) {
        try {
            return await pool.query(req, "call spc_feedmill_production_issuelist_search(?,?)",
            [
                productionissue.from_date,
                productionissue.to_date,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("billofmaterial.service - getIssueForProductionList", err);
        } 
        return null;
    };


};

module.exports = productionissueRepository;