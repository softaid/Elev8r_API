let ledgeropeningbalanceRepository = function (pool, log) {
    
    this.getAllLedgerOpeningBalance = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_ledgeropeningbalance_search(?)",
            [
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ledgeropeningbalance.repository - getAllLedgerOpeningBalance", err);
        } 
        return null;
    };

    this.getLedgerOpeningBalance = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_ledgeropeningbalance_select(?)",
            [
                Params.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ledgeropeningbalance.repository - getLedgerOpeningBalance", err);
        }
    
        return null;
    };    

    this.saveLedgerOpeningBalance = async function (req, Params) {
        try {
                var sp_text = "SET @out_id = 0; call spc_ledgeropeningbalance_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Params["id"] != null ? parseInt(Params.id) : null,
                        Params.openingbalancedate,
                        parseInt(Params.branchid),
                        parseInt(Params.ledgerid),
                        parseFloat(Params.openingbalance),
                        Params.openingbalancetype,
                        parseInt(Params.companyid),
                        parseInt(Params.userid),  
                        parseInt(Params.transactiontypeid) 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ledgeropeningbalance.repository - saveLedgerOpeningBalance", err);
        }
        return null;
    };

    this.deleteLedgerOpeningBalance = async function (req, Params) {
        try {
                return await pool.query(req, "call spc_ledgeropeningbalance_delete(?,?,?)",                       
                    [
                        parseInt(Params.id),
                        parseInt(Params.companyid),
                        parseInt(Params.userid),                        
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ledgeropeningbalance.repository - deleteLedgerOpeningBalance", err);
        }
        return null;
    };

};
    
module.exports = ledgeropeningbalanceRepository;