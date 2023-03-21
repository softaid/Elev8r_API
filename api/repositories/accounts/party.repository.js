let partyRepository = function (pool, log) {
    
    this.getAllParties = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_party_search(?)",
            [
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("party.repository - getAllParties", err);
        } 
        return null;
    };

    

    this.getParty = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_party_select(?)",
            [
                Params.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("party.repository - getParty", err);
        }
    
        return null;
    };    

    this.saveParty = async function (req, Params) {
        try {
                var sp_text = "SET @out_id = 0; call spc_party_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Params["id"] != null ? parseInt(Params.id) : null,
                        Params.partyname,
                        Params.partyroleids,
                        Params["phoneno"] != null ? parseInt(Params.phoneno) : null,
                        Params["contactperson"] != null ? parseInt(Params.contactperson) : null,
                        Params["cstno"] != null ? parseInt(Params.cstno) : null,
                        Params["gstin"] != null ? parseInt(Params.gstin) : null,
                        Params["panno"] != null ? Params.panno : null,
                        Params["postalcode"] != null ? parseInt(Params.postalcode) : null,
                        Params["emailid"] != null ? Params.emailid : null,
                        Params["shippingcontactperson"] != null ? parseInt(Params.shippingcontactperson) : null,
                        Params["shippingcontactno"] != null ? parseInt(Params.shippingcontactno) : null,
                        Params["creditlimit"] != null ? parseFloat(Params.creditlimit) : null,
                        Params["creditperiod"] != null ? parseInt(Params.creditperiod) : null,
                        Params["servicetaxno"] != null ? parseInt(Params.servicetaxno) : null,       
                        Params["partygroupid"] != null ? parseInt(Params.partygroupid) : null,
                        Params["partycode"] != null ? Params.partycode : null,
                        Params["tdsid"] != null ? parseInt(Params.tdsid) : null, 
                        Params["moduleid"] != null ? parseInt(Params.moduleid) : null,
                        Params["bankname"] != null ? parseInt(Params.bankname) : null,
                        Params["accounttype"] != null ? parseInt(Params.accounttype) : null,
                        Params["bankbranch"] != null ? parseInt(Params.bankbranch) : null,
                        Params["ifsccode"] != null ? parseInt(Params.ifsccode) : null,
                        Params["accountno"] != null ? parseInt(Params.accountno) : null,   
                        parseInt(Params.companyid),
                        parseInt(Params.userid),
                       
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("party.repository - saveParty", err);
        }
        return null;
    };

    this.getPartyAddresses = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_partyaddress_bypartyid(?,?,?)",
            [
                Params.partyid,
                isNaN(Params.addresstypeid) ? null : Params.addresstypeid,
                Params.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("party.repository - getPartyAddresses", err);
        } 
        return null;
    };

    this.savePartyAddress = async function (req, Params) {
        debugger;
        try {
                var sp_text = "SET @out_id = 0; call spc_partyaddress_savejson(?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Params.address
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("party.repository - savePartyAddress", err);
        }
        return null;
    }

    this.savePartyContact = async function (req, Params) {
        debugger;
        try {
                var sp_text = "SET @out_id = 0; call spc_partycontact_savejson(?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Params.contact
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("party.repository - savePartyContact", err);
        }
        return null;
    }

    this.deleteParty = async function (req, Params) {
        try {
                return await pool.query(req, "call spc_party_delete(?,?,?)",                       
                    [
                        parseInt(Params.id),
                        parseInt(Params.companyid),
                        parseInt(Params.userid),                        
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("party.repository - deleteParty", err);
        }
        return null;
    }

    //get rolewise parties 
    this.getRolewiseParties = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_party_rolewise(?,?)",
            [
                Params.roleid,
                Params.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("party.repository - getRolewiseParties", err);
        }
    
        return null;
    };    

    //get party groups by its role
    this.getRolewisePartyGroups = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_partygroup_bypartyrole(?,?)",
            [
                Params.partyroleids,
                Params.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("party.repository - getRolewisePartyGroups", err);
        }
    
        return null;
    };    

};
    
module.exports = partyRepository;