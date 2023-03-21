let commonbranchRepository = function (pool, log) {
    
    // Get All CostStructure
    this.getAllCommonBranch = async function (req, CommonBranch) {
        try {
            return await pool.query(req, "call spc_commonbranch_search(?)",
            [
                CommonBranch.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CommonBranch.service - getAllCommonBranch", err);
        } 
        return null;
    };    

    // Get  CommonBranch by id

    this.getCommonBranch = async function (req, CommonBranch) {
        try {
            return await pool.query(req, "call spc_commonbranch_select(?)",
            [
                CommonBranch.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CommonBranch.service - getCommonBranch", err);
        }
    
        return null;
    };    
  
    
    this.saveCommonBranch = async function (req, CommonBranch) {
        try {
                var sp_text = "SET @out_id = 0; call spc_commonbranch_save(?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        CommonBranch["id"] != null ? parseInt(CommonBranch.id) : null,
                        CommonBranch.branchcode,
                        CommonBranch.branchname,
                        CommonBranch.isactive,
                        parseInt(CommonBranch.companyid),
                        parseInt(CommonBranch.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CommonBranch.service-saveCommonBranch", err);
        }
        return null;
    }

  // delete CommonBranch 

    this.deleteCommonBranch = async function (req, CommonBranch) {
        console.log("CommonBranch",CommonBranch);
        try {  var sp_text = "SET @out_id = 0; call spc_commonbranch_delete(?,?,?, @out_id); SELECT @out_id as id;";                  
        return await pool.query(req, sp_text,                        
                    [
                        parseInt(CommonBranch.id),
                        parseInt(CommonBranch.companyid),
                        parseInt(CommonBranch.userid), 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CommonBranch.service-deleteCommonBranch", err);
        }
        return null;
    }

};
    
module.exports = commonbranchRepository;