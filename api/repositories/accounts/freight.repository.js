let freightRepository = function (pool, log) {
    
    this.getAllFreight = async function (req, Freight) {
        try {
            return await pool.query(req, "call spc_freight_search(?)",
            [
                Freight.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Freight.repository - getAllFreight", err);
        } 
        return null;
    };    

    this.getFreight = async function (req, Freight) {
        try {
            return await pool.query(req, "call spc_freight_select(?)",
            [
                Freight.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Freight.repository - getFreight", err);
        }
    
        return null;
    };    

    this.saveFreight = async function (req, Freight) {
        try {
                var sp_text = "SET @out_id = 0; call spc_freight_save(?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Freight["id"] != null ? parseInt(Freight.id) : null,
                        Freight.freightname,
                        Freight.remark,
                        Freight["inputledgerid"] != null ? parseInt(Freight.inputledgerid) : null,
                        Freight["outputledgerid"] != null ? parseInt(Freight.outputledgerid) : null,
                        parseInt(Freight.companyid),
                        parseInt(Freight.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Freight.repository - saveFreight", err);
        }
        return null;
    };

    this.deleteFreight = async function (req, Freight) {
        try {
                return await pool.query(req, "call spc_freight_delete(?,?,?)",                       
                    [
                        parseInt(Freight.id),
                        parseInt(Freight.companyid),
                        parseInt(Freight.userid),  
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Freight.repository - deleteFreight", err);
        }
        return null;
    };
};
    
module.exports = freightRepository;