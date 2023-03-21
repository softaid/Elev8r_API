let dimenssionsRepository = function (pool, log) {
    
    this.getAllDimenssions = async function (req, Dimenssions) {
        try {
            return await pool.query(req, "call spc_dimension_search(?)",
            [
                Dimenssions.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Dimenssions.repository - getAllDimenssions", err);
        } 
        return null;
    };    

    this.getDimenssions = async function (req, Dimenssions) {
        try {
            return await pool.query(req, "call spc_dimension_select(?)",
            [
                Dimenssions.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Dimenssions.repository - getDimenssions", err);
        }
    
        return null;
    };    

    this.saveDimenssions = async function (req, Dimenssions) {
        console.log("Dimenssions : ",Dimenssions);
        try {
                var sp_text = "SET @out_id = 0; call spc_dimension_save(?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Dimenssions["id"] != null ? parseInt(Dimenssions.id) : null,
                        Dimenssions.dimensioncode,
                        Dimenssions.dimensionname,
                        Dimenssions.description,
                        Dimenssions.isactive,
                        parseInt(Dimenssions.companyid),
                        parseInt(Dimenssions.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Dimenssions.repository - saveDimenssions", err);
        }
        return null;
    };

    this.deleteDimenssions = async function (req, Dimenssions) {
        try {
                return await pool.query(req, "call spc_dimension_delete(?)",                       
                    [
                        parseInt(Dimenssions.id) 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Dimenssions.repository - deleteDimenssions", err);
        }
        return null;
    };
};
    
module.exports = dimenssionsRepository;