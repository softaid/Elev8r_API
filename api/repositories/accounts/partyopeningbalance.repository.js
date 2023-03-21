let partyopeningbalanceRepository = function (pool, log) {
    
    this.getAllPartyOpeningBalance = async function (req, Partyopnbal) {
        try {
            return await pool.query(req, "call spc_partyopeningbalance_search(?)",
            [
                Partyopnbal.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Partyopnbal.repository - getAllPartyOpeningBalance", err);
        } 
        return null;
    };    

    this.getPartyOpeningBalance = async function (req, Partyopnbal) {
        try {
            return await pool.query(req, "call spc_partyopeningbalance_select(?)",
            [
                Partyopnbal.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Partyopnbal.repository - getPartyOpeningBalance", err);
        }
    
        return null;
    };    

    this.savePartyOpeningBalance = async function (req, Partyopnbal) {
        try {
                var sp_text = "SET @out_id = 0; call spc_partyopeningbalance_save(?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Partyopnbal["id"] != null ? parseInt(Partyopnbal.id) : null,
                        Partyopnbal.postingdate,
                        parseInt(Partyopnbal.acledgerid),
                        parseInt(Partyopnbal.branchid),
                        parseInt(Partyopnbal.subledgerid),
                        Partyopnbal.subledgertypeids,
                        parseFloat(Partyopnbal.openingbalance),
                        parseInt(Partyopnbal.transactiontypeid),
                        parseInt(Partyopnbal.companyid),
                        parseInt(Partyopnbal.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Partyopnbal.repository - savePartyOpeningBalance", err);
        }
        return null;
    };

    this.deletePartyOpeningBalance = async function (req, Partyopnbal) {
        try {
                return await pool.query(req, "call spc_partyopeningbalance_delete(?)",                       
                    [
                        parseInt(Partyopnbal.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Partyopnbal.repository - deletePartyOpeningBalance", err);
        }
        return null;
    };
};
    
module.exports = partyopeningbalanceRepository;