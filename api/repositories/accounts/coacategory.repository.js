let coacategoryRepository = function (pool, log) {
    
    this.getAllCOACategories = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_coacategory_search(?)",
            [
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("coacategory.repository - getAllCOACategories", err);
        } 
        return null;
    };

    this.getCOACategory = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_coacategory_select(?)",
            [
                Params.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("coacategory.repository - getCOACategory", err);
        }
    
        return null;
    };    

    this.saveCOACategory = async function (req, Params) {
        try {
                var sp_text = "SET @out_id = 0; call spc_coacategory_save(?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Params["id"] != null ? parseInt(Params.id) : null,
                        Params.category,
                        parseInt(Params.companyid),
                        parseInt(Params.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("coacategory.repository - saveCOACategory", err);
        }
        return null;
    };

    this.deleteCOACategory = async function (req, Params) {
        try {
                return await pool.query(req, "call spc_coacategory_delete(?,?,?)",                       
                    [
                        parseInt(Params.id),
                        parseInt(Params.companyid),
                        parseInt(Params.userid),                        
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("coacategory.repository - deleteCOACategory", err);
        }
        return null;
    };

};
    
module.exports = coacategoryRepository;