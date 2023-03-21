let receiptfromproductionRepository = function (pool, log) {

    // SEARCH REPOSITORY

    this.getAllReceiptFromProduction = async function (req, receiptFromProduction) {
        try {
            return await pool.query(req, "call spc_feedmill_receipt_from_production_search(?)",
                [
                    receiptFromProduction.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receiptFromProduction.service - getAllReceiptFromProduction", err);
        }
        return null;
    };

    // SELECT REPOSITORY

    this.getReceiptFromProduction = async function (req, receiptFromProduction) {
        console.log("ReceiptFromProduction repo:", receiptFromProduction);
        try {
            return await pool.query(req, "call spc_feedmill_receipt_from_production_select(?,?)",
                [
                    receiptFromProduction.id,
                    receiptFromProduction.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receiptFromProduction.service - getReceiptFromProduction", err);
        }
        return null;
    };

    //SAVE REPOSITORY

    this.saveReceiptFromProduction = async function (req, receiptFromProduction) {
        console.log("receiptFromProduction", receiptFromProduction);
        try {
            var sp_text = "SET @out_id = 0; call spc_feedmill_receipt_from_production_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(req, sp_text,
                [
                    receiptFromProduction["id"] != null ? parseInt(receiptFromProduction.id) : null,
                    receiptFromProduction.production_receipt_no,
                    parseInt(receiptFromProduction.productionorder_id),	
                    receiptFromProduction.receipt_date,
                    parseInt(receiptFromProduction.itemid),		
                    parseFloat(receiptFromProduction.receipt_qty),
                    parseInt(receiptFromProduction.status_id),
                    parseFloat(receiptFromProduction.unit_cost),
                    parseFloat(receiptFromProduction.item_totalcost),
                    receiptFromProduction.itembatch,	
                    parseInt(receiptFromProduction.towarehouse_id),
                    receiptFromProduction["towarehousebin_id"] != null ? parseInt(receiptFromProduction.towarehousebin_id) : null,
                    receiptFromProduction.remark,	
                    parseFloat(receiptFromProduction.balance_qty),
                    parseInt(receiptFromProduction.packingmaterial_id),
                    parseInt(receiptFromProduction.bag_qty),
                    parseFloat(receiptFromProduction.remaining_receiptqty),
                    parseFloat(receiptFromProduction.additionalcost),
                    receiptFromProduction.applyreciptloss,
                    parseFloat(receiptFromProduction.po_unit_cost),
                    parseInt(receiptFromProduction.companyid),
                    parseInt(receiptFromProduction.userid),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receiptFromProduction.service-saveReceiptFromProduction", err);
        }
        return null;
    };

    //DELETE REPOSITORY
    this.deleteReceiptFromProduction = async function (req, receiptFromProduction) {
        console.log("Density", Density);
        try {
            return await pool.query(req, "call spc_feedmill_receipt_from_production_delete(?,?,?)",
                [
                    parseInt(receiptFromProduction.id),
                    parseInt(receiptFromProduction.companyid),
                    parseInt(receiptFromProduction.userid),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receiptFromProduction.service-deleteReceiptFromProduction", err);
        }
        return null;
    };
    //save je For Receipt For Production

    this.saveReceiptForProductionJE = async function (req, receiptFromProduction) {
        console.log("receiptFromProduction",receiptFromProduction);
        try {
                return await pool.query(req, "call spc_savereceiptforproduction_je(?,?,?)",                       
                    [
                        parseInt(receiptFromProduction.production_receipt_id),
                        parseInt(receiptFromProduction.companyid),
                        parseInt(receiptFromProduction.userid), 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receiptFromProduction.service-saveReceiptForProductionJE", err);
        }
        return null;
    };
    this.getReceiptFromProductionByPoId = async function (req, receiptFromProduction) {
        try {
            return await pool.query(req, "call spc_getreceipt_for_production_by_productionorderid(?)",
                [
                    receiptFromProduction.productionorder_id
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receiptFromProduction.service - getReceiptFromProductionByPoId", err);
        }
        return null;
    };
   this.getProductionIssueCost = async function (req, receiptFromProduction) {
        try {
            return await pool.query(req, "call spc_feedmill_get_issue_cost_search(?,?)",
                [
                    receiptFromProduction.production_issue_id,
                    receiptFromProduction.company_id
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receiptFromProduction.service - getProductionIssueCost", err);
        }
        return null;
    };  
    
    this.getReceiptFromProductionList = async function (req, receiptFromProduction) {
        try {
            return await pool.query(req, "call spc_feedmill_receipt_from_production_list_search(?,?)",
            [
                receiptFromProduction.from_date,
                receiptFromProduction.to_date,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receiptFromProduction.service - getReceiptFromProductionList", err);
        } 
        return null;
    };

};

module.exports = receiptfromproductionRepository;
















