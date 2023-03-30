let leadmasterRepository = function (pool, log) {
    // referencetype repository start

    this.getAllReferenceType = async function (req, referencetype) {
        try {
            return await pool.query(req, "call spc_referencetype_search(?)",
            [
                referencetype.companyid,
            ]);
        }
        catch (err) {
            log.dbErrorLog("referencetype.repository - getAllReferenceType", err);
        } 
        return null;
    };    

    this.getReferenceType = async function (req, referencetype) {
        try {
            return await pool.query(req, "call spc_referencetype_select(?)",
            [
                referencetype.id,
            ]);
        }
        catch (err) {
            log.dbErrorLog("referencetype.repository - getReferenceType", err);
        }
    
        return null;
    };    

    this.saveReferenceType = async function (req, referencetype) {
        try {
                var sp_text = "SET @out_id = 0; call spc_referencetype_save(?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        referencetype["id"] != null ? parseInt(referencetype.id) : null,
                        referencetype.typecode,
                        referencetype.typename,
                        referencetype.master,
                        referencetype.description,
                        referencetype.createddate,
                        referencetype.modifieddate,
                        parseInt(referencetype.companyid),
                        parseInt(referencetype.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("referencetype.repository - saveReferenceType", err);
        }
        return null;
    };

    this.deleteReferenceType = async function (req, referencetype) {
        try {
                return await pool.query(req, "call spc_referencetype_delete(?)",                       
                    [
                        parseInt(referencetype.id)
                    ]);
        }
        catch (err) {
            log.dbErrorLog("referencetype.repository - deleteReferenceType", err);
        }
        return null;
    };

    this.getReferenceTypeByMaster = async function (req, referencetype) {
        try {
            return await pool.query(req, "call spc_referencetype_bymaster(?)",
            [
                referencetype.master,
            ]);
        }
        catch (err) {
            log.dbErrorLog("referencetype.repository - getReferenceTypeByMaster", err);
        }
    
        return null;
    };    

    // referencetype repository end
    
    // references repository start

    this.getAllReference = async function (req, reference) {
        try {
            return await pool.query(req, "call spc_reference_selectbygroup(?)",
            [
                reference.typecode,
            ]);
        }
        catch (err) {
            log.dbErrorLog("reference.repository - getAllLeadMaster", err);
        } 
        return null;
    };    

    this.getReference = async function (req, reference) {
        try {
            return await pool.query(req, "call spc_reference_select(?)",
            [
                reference.id,
            ]);
        }
        catch (err) {
            log.dbErrorLog("reference.repository - getReference", err);
        }
    
        return null;
    };    

    this.saveReference = async function (req, reference) {
        try {
                var sp_text = "SET @out_id = 0; call spc_reference_save(?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        reference["id"] != null ? parseInt(reference.id) : null,
                        reference.typecode,
                        reference.refname,
                        reference.parenttypecode,
                        reference.displayorder,
                        reference.createddate,
                        reference.modifieddate,
                        reference.deleted, 
                        reference.extendeddescription,
                        reference.grouptitle,
                        parseInt(reference.companyid),
                        parseInt(reference.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("reference.repository - saveReference", err);
        }
        return null;
    };

    this.deleteReference = async function (req, reference) {
        try {
                return await pool.query(req, "call spc_reference_delete(?)",                       
                    [
                        parseInt(reference.id)
                    ]);
        }
        catch (err) {
            log.dbErrorLog("reference.repository - deleteReference", err);
        }
        return null;
    };

    // references repository end
};
    
module.exports = leadmasterRepository;