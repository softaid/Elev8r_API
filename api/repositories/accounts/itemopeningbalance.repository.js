let itemopeningbalanceRepository = function (pool, log) {
    
    this.getAllItemOpeningBalance = async function (req, params) {
        try {
            return await pool.query(req, "call spc_accountsitemopeningbalance_search(?)",
            [
                params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("params.repository - getAllItemOpeningBalance", err);
        } 
        return null;
    };    

    this.getItemOpeningBalance = async function (req, params) {
        try {
            return await pool.query(req, "call spc_accountsitemopeningbalance_select(?,?)",
            [
                params.id,
                params.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("params.repository - getItemOpeningBalance", err);
        }
    
        return null;
    };    

    this.saveItemOpeningBalance = async function (req, params) {
        try {
                var sp_text = "SET @out_id = 0; call spc_accountsitemopeningbalance_save(?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        params["id"] != null ? parseInt(params.id) : null,
                        params.postingdate,
                        parseInt(params.itemid),
                        parseInt(params.warehouseid),
                        parseInt(params.warehousebinid),
                        parseFloat(params.openingbalance),
			parseFloat(params.openingweight),
			parseFloat(params.avgsize),
                        parseFloat(params.unitprice),
                        parseFloat(params.total),
                        parseInt(params.ledgerid),
                        parseInt(params.companyid),
                        parseInt(params.userid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("params.repository - saveItemOpeningBalance", err);
        }
        return null;
    };

    this.deleteItemOpeningBalance = async function (req, params) {
		console.log("delete params : ",params);
        try {
                return await pool.query(req, "call spc_accountsitemopeningbalance_delete(?,?)",                       
                    [
                        parseInt(params.id),
                        parseInt(params.companyid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("params.repository - deleteItemOpeningBalance", err);
        }
        return null;
    };
};
    
module.exports = itemopeningbalanceRepository;