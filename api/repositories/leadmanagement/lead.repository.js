let leadRepository = function (pool, log) {

    // start leads Repository

    // get all leads by companyid
    this.getAllLeads = async function (req, lead) {
        try {

            return await pool.query(req, "call spc_leads_search(?)",
                [
                    lead.companyid
                ])

        }
        catch (err) {
            log.dbErrorLog("lead.repository - getAllLaeds", err);
        }
        return null;
    };

    // get leads by id
    this.getLeads = async function (req, lead) {
        try {
            return await pool.query(req, "call spc_leads_select(?)",
                [
                    lead.id,
                ]);
        }
        catch (err) {
            log.dbErrorLog("lead.repository - getLeads", err);
        }

        return null;
    };

    // save leads 
    this.saveLead = async function (req, lead) {
        try {
            var sp_text = "SET @out_id = 0; call spc_leads_save(?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";
            return await pool.query(req, sp_text,
                [
                    lead["id"] != null ? parseInt(lead.id) : null,
                    lead.leadname,
                    lead.mobileno,
                    lead.email,
                    parseInt(lead.sourceid),
                    parseInt(lead.pipelineid),
                    parseInt(lead.companyid),
                    parseInt(lead.userid),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("lead.repository - saveLead", err);
        }
        return null;
    };

    // delete  leads by id
    this.deletelead = async function (req, lead) {
        try {
            return await pool.query(req, "call spc_leads_delete(?)",
                [
                    parseInt(lead.id)
                ]);
        }
        catch (err) {
            log.dbErrorLog("lead.repository - deletelead", err);
        }
        return null;
    };

    // END leads Repository

    // start leadaddress Repository

    // get all leadaddress by companyid
    this.getAllLeadAddress = async function (req, lead) {
        try {

            return await pool.query(req, "call spc_leadaddress_search(?)",
                [
                    lead.companyid
                ])

        }
        catch (err) {
            log.dbErrorLog("lead.repository - getAllLeadAddress", err);
        }
        return null;
    };

    // get leadaddress by id
    this.getLeadAddress = async function (req, lead) {
        try {
            return await pool.query(req, "call spc_leadaddress_select(?)",
                [
                    lead.id,
                ]);
        }
        catch (err) {
            log.dbErrorLog("lead.repository - getLeadAddress", err);
        }

        return null;
    };

    // save leadaddress
    this.saveLeadAddress = async function (req, lead) {
        try {
            var sp_text = "SET @out_id = 0; call spc_leadaddress_save(?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";
            return await pool.query(req, sp_text,
                [
                    lead["id"] != null ? parseInt(lead.id) : null,
                    parseInt(lead.leadid),
                    lead.address,
                    parseInt(lead.countryid),
                    parseInt(lead.stateid),
                    parseInt(lead.cityid),
                    parseInt(lead.pincode),
                    parseInt(lead.companyid),
                    parseInt(lead.userid),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("lead.repository - saveLeadAddress", err);
        }
        return null;
    };

    // delete leadaddress by id
    this.deleteLeadAddress = async function (req, lead) {
        try {
            return await pool.query(req, "call spc_leadaddress_delete(?)",
                [
                    parseInt(lead.id)
                ]);
        }
        catch (err) {
            log.dbErrorLog("lead.repository - deleteLeadAddress", err);
        }
        return null;
    };

    // END leadaddress Repository

};

module.exports = leadRepository;