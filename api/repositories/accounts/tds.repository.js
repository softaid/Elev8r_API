let tdsRepository = function (pool, log) {
    
    this.getAllTds = async function (req, Tds) {
        console.log("Tds : ",Tds);
        try {
            return await pool.query(req, "call spc_account_tds_search(?)",
            [
                Tds.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Tds.repository - getAllTds", err);
        } 
        return null;
    };    

    this.getTds = async function (req, Tds) {
        try {
            return await pool.query(req, "call spc_account_tds_select(?,?)",
            [
                Tds.id,
                Tds.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Tds.repository - getTds", err);
        }
    
        return null;
    };    

    this.saveTds = async function (req, Tds) {
        try {
                var sp_text = "SET @out_id = 0; call spc_account_tds_save(?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Tds["id"] != null ? parseInt(Tds.id) : null,
                        Tds.section,
                        Tds.description,
                        parseInt(Tds.rate),
                        parseInt(Tds.ledgerid),
                        parseInt(Tds.companyid),
                        parseInt(Tds.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Tds.repository - saveTds", err);
        }
        return null;
    };

    this.deleteTds = async function (req, Tds) {
        try {
                return await pool.query(req, "call spc_account_tds_delete(?)",                       
                    [
                        parseInt(Tds.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Tds.repository - deleteTds", err);
        }
        return null;
    };
};
    
module.exports = tdsRepository;