let taxRepository = function (pool, log) {
    
    this.getAllTax = async function (req, Tax) {
        try {
            return await pool.query(req, "call spc_tax_search(?)",
            [
                Tax.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Tax.repository - getAllTax", err);
        } 
        return null;
    };    

    this.getTax = async function (req, Tax) {
        try {
            return await pool.query(req, "call spc_tax_select(?)",
            [
                Tax.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Tax.repository - getTax", err);
        }
    
        return null;
    };    

    this.saveTax = async function (req, Tax) {
        try {
                var sp_text = "SET @out_id = 0; call spc_tax_save(?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Tax["id"] != null ? parseInt(Tax.id) : null,
                        Tax.taxcode,
                        Tax.taxname,
                        parseFloat(Tax.taxpercent),
                        parseInt(Tax.taxtypeid),
                        Tax.combinedtaxes,
                        Tax["inputledgerid"] != null ? parseInt(Tax.inputledgerid) : null,
                        Tax["outputledgerid"] != null ? parseInt(Tax.outputledgerid) : null,
                        parseInt(Tax.companyid),
                        parseInt(Tax.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Tax.repository - saveTax", err);
        }
        return null;
    };

    this.deleteTax = async function (req, Tax) {
        try {
                return await pool.query(req, "call spc_tax_delete(?)",                       
                    [
                        parseInt(Tax.id) 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Tax.repository - deleteTax", err);
        }
        return null;
    };
};
    
module.exports = taxRepository;