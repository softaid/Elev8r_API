let materialissueRepository = function (pool, log) {
    
    // get all material issue
    this.getAllMaterialIssue = async function (req, materialissue) {
        console.log(materialissue)
        try {
            return await pool.query(req, "call spc_materialissue_search(?)",
            [
                materialissue.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialissue.service - getAllMaterialIssue", err);
        } 
        return null;
    };

    // get material issue for edit
    this.getMaterialIssue = async function (req, materialissue) {
        console.log("materialissue : ",materialissue);
        try {
            var materialIssue =  await pool.query(req, "call spc_materialissue_select(?)",
            [
                materialissue.id,
            ]);
            var materialIssueDetail =  await pool.query(req, "call spc_materialissuedetail_select(?)",
            [
                materialissue.id,
            ]);

            return {
                "materialIssue" : materialIssue,
                "materialIssueDetail" : materialIssueDetail
            };
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialissue.service - getMaterialIssue", err);
        }
    
        return null;
    };    
  
    // save material issue
    this.saveMaterialIssue = async function (req, materialissue) {
        console.log("materialissue : ",materialissue);
        try {
                var sp_text = "SET @out_id = 0; call spc_materialissue_save(?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        materialissue["id"] != null ? parseInt(materialissue.id) : null,
                        materialissue.issuedate,
                        parseInt(materialissue.issuetypeid),
                        parseInt(materialissue.batchid),
                        parseInt(materialissue.statusid),
                        materialissue.remark,
                        parseInt(materialissue.createdby),
                        materialissue["approvedby"] != null ? parseInt(materialissue.approvedby) : null,
                        materialissue.approveddate,
                        parseInt(materialissue.fromwarehouseid),     
                        parseInt(materialissue.fromwarehousebinid),     
                        parseInt(materialissue.companyid),
                        parseInt(materialissue.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialissue.service-saveMaterialIssue", err);
        }
        return null;
    };

    // delete material issue
    this.deleteMaterialIssue = async function (req, materialissue) {
        try {
            return await pool.query(req, "call spc_materialissue_delete(?)",                       
                [
                    parseInt(materialissue.id),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialissue.service-deleteMaterialIssue", err);
        }
        return null;
    };

        //get materialissue type  hatcherbatches batches
        this.getmaterialIssueTypeHatcherBatch = async function (req, materialissue) {
            console.log(materialissue)
            try {
                return await pool.query(req, "call spc_issuetypehatcherbatches_search(?)",
                [
                    materialissue.companyid
                ]);
            }
            catch (err) {
                console.log('Error thrown : ', err);
                log.dbErrorLog("materialissue.service - getmaterialIssueTypeHatcherBatch", err);
            } 
            return null;
        };

};
    
module.exports = materialissueRepository;