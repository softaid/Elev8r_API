let partygroupRepository = function (pool, log) {
    
    this.getAllPartyGroups = async function (req, partygroup) {
        try {
            return await pool.query(req, "call spc_partygroup_search(?)",
            [
                partygroup.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("partygroup.repository - getAllPartyGroups", err);
        } 
        return null;
    };    

    this.getPartyGroup = async function (req, partygroup) {
        try {
            return await pool.query(req, "call spc_partygroup_select(?,?)",
            [
                partygroup.id,
                partygroup.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("partygroup.repository - getPartyGroup", err);
        }
    
        return null;
    };    

    this.savePartyGroup = async function (req, partygroup) {
        try {
                var sp_text = "SET @out_id = 0; call spc_partygroup_save(?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        partygroup["id"] != null ? parseInt(partygroup.id) : null,
                        partygroup.partygroupname,
                        partygroup.partyroleids,
                        partygroup.description,
                        parseInt(partygroup.companyid),
                        parseInt(partygroup.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("partygroup.repository - savePartyGroup", err);
        }
        return null;
    };

    this.deletePartyGroup = async function (req, partygroup) {
        try {
                return await pool.query(req, "call spc_partygroup_delete(?)",                       
                    [
                        parseInt(partygroup.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("partygroup.repository - deletePartyGroup", err);
        }
        return null;
    };
};
    
module.exports = partygroupRepository;