let commonbranchlinelineRepository = function (pool, log) {
    
    // Get All CostStructure
    this.getAllCommonBranchLine = async function (req, CommonBranchLine) {
        try {
            return await pool.query(req, "call spc_commonbranchline_search(?)",
            [
                CommonBranchLine.branchid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CommonBranchLine.service - getAllCommonBranchLine", err);
        } 
        return null;
    };    

    // Get  CommonBranchLine by id

    this.getCommonBranchLine = async function (req, CommonBranchLine) {
        try {
            return await pool.query(req, "call spc_commonbranchline_select(?)",
            [
                CommonBranchLine.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CommonBranchLine.service - getCommonBranchLine", err);
        }
    
        return null;
    };    
  
    
    this.saveCommonBranchLine = async function (req, CommonBranchLine) {
        try {
                var sp_text = "SET @out_id = 0; call spc_commonbranchline_save(?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        CommonBranchLine["id"] != null ? parseInt(CommonBranchLine.id) : null,
                        CommonBranchLine.branchid,
                        CommonBranchLine.linename,
                        parseInt(CommonBranchLine.companyid),
                        parseInt(CommonBranchLine.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CommonBranchLine.service-saveCommonBranchLine", err);
        }
        return null;
    }

  // delete CommonBranchLine 

    this.deleteCommonBranchLine = async function (req, CommonBranchLine) {
        console.log("CommonBranchLine",CommonBranchLine);
        try {
                return await pool.query(req, "call spc_commonbranchline_delete(?,?,?)",                       
                    [
                        parseInt(CommonBranchLine.id),
                        parseInt(CommonBranchLine.companyid),
                        parseInt(CommonBranchLine.userid), 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CommonBranchLine.service-deleteCommonBranchLine", err);
        }
        return null;
    }

};
    
module.exports = commonbranchlinelineRepository;