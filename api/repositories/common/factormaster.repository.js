let factormasterRepository = function (pool, log) {

    this.getAllfactormaster = async function (req, factormaster) {
        try {
            return await pool.query(req, "call spc_factormaster_search(?)",
                [
                    factormaster.companyid,
                ]);
        }
        catch (err) {
            log.dbErrorLog("factormaster.service - getAllfactormaster", err);
        }
        return null;
    };

    

    this.getfactormaster = async function (req, factormaster) {
        try {
            return await pool.query(req, "call spc_factormaster_select(?)",
            [
                factormaster.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("factormaster.service - getfactormaster", err);
        }
    
        return null;
    };

    this.savefactormaster = async function (req, factormaster) {
        try {
                var sp_text = "SET @out_id = 0; call spc_factormaster_save(?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        factormaster["id"] != null ? parseInt(factormaster.id) : null,
                        factormaster["convertedunitid"] != null ? parseInt(factormaster.convertedunitid) : null,
			factormaster["baseunitid"] != null ? parseInt(factormaster.baseunitid) : null,
			factormaster["factor"] != null ? parseFloat(factormaster.factor) : null,
                        parseInt(factormaster.companyid),
                        parseInt(factormaster.userid),   

                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("factormaster.service-savefactormaster", err);
        }
        return null;
    }


};
    
module.exports = factormasterRepository;