let costcenterRepository = function (pool, log) {
    
    this.getAllCostCenters = async function (req, CostCenter) {
        try {
            return await pool.query(req, "call spc_costcenter_search(?)",
            [
                CostCenter.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CostCenter.repository - getAllCostCenters", err);
        } 
        return null;
    };    

    this.getCostCenter = async function (req, CostCenter) {
        try {
            return await pool.query(req, "call spc_costcenter_select(?)",
            [
                CostCenter.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CostCenter.repository - getCostCenter", err);
        }
    
        return null;
    };    

    this.saveCostCenter = async function (req, CostCenter) {
        try {
                var sp_text = "SET @out_id = 0; call spc_costcenter_save(?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        CostCenter["id"] != null ? parseInt(CostCenter.id) : null,
                        CostCenter.dimenssioncode,
                        CostCenter.dimenssionname,
                        CostCenter.description,
                        CostCenter.isactive,
                        CostCenter.isparent,
                        CostCenter["parentid"] != null ? parseInt(CostCenter.parentid) : null,
                        parseInt(CostCenter.companyid),
                        parseInt(CostCenter.userid), 
                        parseInt(CostCenter.accounts_dimensionid)  
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CostCenter.repository - saveCostCenter", err);
        }
        return null;
    };

    this.deleteCostCenter = async function (req, CostCenter) {
        try {
                return await pool.query(req, "call spc_costcenter_delete(?)",                       
                    [
                        parseInt(CostCenter.id) 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CostCenter.repository - deleteCostCenter", err);
        }
        return null;
    };

     //get all parent CostCenter
     this.getAllParentCostCenter = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_costcenter_parentcostcenter(?)",
            [
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CostCenter.repository - getAllParentCostCenter", err);
        } 
        return null;
    };

    // get dimensionwise costcenters
    this.getDimensionwiseCostCenter = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_dimensionwisecostcenter_search(?,?)",
            [
                Params.dimensionid,
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CostCenter.repository - getDimensionwiseCostCenter", err);
        } 
        return null;
    };
};
    
module.exports = costcenterRepository;