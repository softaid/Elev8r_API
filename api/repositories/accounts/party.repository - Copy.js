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
                var sp_text = "SET @out_id = 0; call spc_party_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Params["id"] != null ? parseInt(Params.id) : null,
                        Params.partyname,
                        Params.partyroleids,
                        Params.phoneno,
                        Params.contactperson,
                        Params.cstno,
                        Params.gstin,
                        Params.panno,
                        Params.postalcode,
                        Params.emailid,
                        Params.shippingcontactperson,
                        Params.shippingcontactno,
                        Params["creditlimit"] != null ? parseFloat(Params.creditlimit) : null,
                        Params["creditperiod"] != null ? parseInt(Params.creditperiod) : null,
                        Params.servicetaxno,       
                        Params.partygroup,
                        Params["supplierledgerid"] != null ? parseInt(Params.supplierledgerid) : null,
                        Params["customerledgerid"] != null ? parseInt(Params.customerledgerid) : null,    
                        parseInt(Params.companyid),
                        parseInt(Params.userid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("party.repository - saveParty", err);
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

};
    
module.exports = partyRepository;