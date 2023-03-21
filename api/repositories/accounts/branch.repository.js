let branchRepository = function (pool, log) {
    
    this.getAllBranch = async function (req, Branch) {
        try {
            return await pool.query(req, "call spc_commonbranch_search(?)",
            [
                Branch.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Branch.repository - getAllBranch", err);
        } 
        return null;
    };    

    this.getBranch = async function (req, Branch) {
        try {
            return await pool.query(req, "call spc_commonbranch_select(?)",
            [
                Branch.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Branch.repository - getBranch", err);
        }
    
        return null;
    };    

    this.saveBranch = async function (req, Branch) {
        try {
                var sp_text = "SET @out_id = 0; call spc_branch_save(?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Branch["id"] != null ? parseInt(Branch.id) : null,
                        Branch.branchname,
                        Branch.branchcode,
                        Branch.isactive,
                        parseInt(Branch.companyid),
                        parseInt(Branch.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Branch.repository - saveBranch", err);
        }
        return null;
    };

    this.deleteBranch = async function (req, Branch) {
        try {
                return await pool.query(req, "call spc_branch_delete(?)",                       
                    [
                        parseInt(Branch.id) 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Branch.repository - deleteBranch", err);
        }
        return null;
    };
};
    
module.exports = branchRepository;