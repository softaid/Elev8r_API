let materialreceiptRepository = function (pool, log) {
    
    // get all material receipts
    this.getAllMaterialReceipt = async function (req, materialreceipt) {
        console.log(materialreceipt)
        try {
            return await pool.query(req, "call spc_materialreceipt_search(?)",
            [
                materialreceipt.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialreceipt.service - getAllMaterialReceipt", err);
        } 
        return null;
    };

    // get material receipts for edit
    this.getMaterialReceipt = async function (req, materialreceipt) {
        console.log("materialreceipt : ",materialreceipt);
        try {
            var materialReceipt =  await pool.query(req, "call spc_materialreceipt_select(?)",
            [
                materialreceipt.id,
            ]);
            var materialReceiptDetail =  await pool.query(req, "call spc_materialreceiptdetail_select(?)",
            [
                materialreceipt.id,
            ]);

            return {
                "materialReceipt" : materialReceipt,
                "materialReceiptDetail" : materialReceiptDetail
            };
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialreceipt.service - getMaterialReceipt", err);
        }
    
        return null;
    };    
  
    // save material receipts
    this.saveMaterialReceipt = async function (req, materialreceipt) {
        console.log("materialreceipt : ",materialreceipt);
        try {
                var sp_text = "SET @out_id = 0; call spc_materialreceipt_save(?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        materialreceipt["id"] != null ? parseInt(materialreceipt.id) : null,
                        materialreceipt.receiptdate,
                        parseInt(materialreceipt.receipttype),
                        parseInt(materialreceipt.batchid),
                        parseInt(materialreceipt.statusid),
                        materialreceipt.remark,
                        materialreceipt["createdby"] != null ? parseInt(materialreceipt.createdby) : null,
                        materialreceipt["approvedby"] != null ? parseInt(materialreceipt.approvedby) : null,
                        materialreceipt.approveddate,                  
                        parseInt(materialreceipt.companyid),
                        parseInt(materialreceipt.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialreceipt.service-saveMaterialReceipt", err);
        }
        return null;
    };

    // delete material receipts
    this.deleteMaterialReceipt = async function (req, materialreceipt) {
        try {
            return await pool.query(req, "call spc_materialreceipt_delete(?)",                       
                [
                    parseInt(materialreceipt.id),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialreceipt.service-deleteMaterialReceipt", err);
        }
        return null;
    };

     // get all hatcher batches
     this.getAllMaterialReceiptHatcherBatches = async function (req, materialreceipt) {
        console.log(materialreceipt)
        try {
            return await pool.query(req, "call spc_materialreceipthatcherbatch_select(?)",
            [
                materialreceipt.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialreceipt.service - getAllMaterialReceiptHatcherBatches", err);
        } 
        return null;
    };

};
    
module.exports = materialreceiptRepository;