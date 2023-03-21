let qualitycheckRepository = function (pool, log) {

    // SEARCH REPOSITORY

    this.getAllQualityCheckResult = async function (req, qualitycheck) {
        try {
            return await pool.query(req, "call spc_qualitycheck_search(?)",
                [
                    qualitycheck.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("qualitycheck.service - getAllQualityCheckResult", err);
        }
        return null;
    };

    // SELECT REPOSITORY

    this.getQualityCheck = async function (req, qualitycheck) {
        console.log("qualitycheck repo:", qualitycheck);
        try {
            return await pool.query(req, "call spc_qualitycheck_select(?,?)",
                [
                    qualitycheck.id,
                    qualitycheck.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("qualitycheck.service - getQualityCheck", err);
        }
        return null;
    };

    //SAVE REPOSITORY

    this.saveQualityCheck = async function (req, qualitycheck) {
        console.log("qualitycheck", qualitycheck);
        try {
            var sp_text = "SET @out_id = 0; call spc_qualitycheck_save(?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";
            return await pool.query(req, sp_text,
                [
                    qualitycheck["id"] != null ? parseInt(qualitycheck.id) : null,
                    parseInt(qualitycheck.ackid),
                    qualitycheck.checkedby,
                    qualitycheck.qualitycheckdate,
                    parseInt(qualitycheck.qualitystatus),
                    parseInt(qualitycheck.companyid),
                    parseInt(qualitycheck.userid),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("qualitycheck.service-saveQualityCheck", err);
        }
        return null;
    };

    //DELETE REPOSITORY

    this.deleteQualityCheck = async function (req, qualitycheck) {
        try {
            return await pool.query(req, "call spc_qualitycheck_delete(?)",
                [
                    parseInt(qualitycheck.id)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("qualitycheck.repository - deleteQualityCheck", err);
        }
        return null;
    };
    
    this.getQualityCheckList = async function (req, qualitycheck) {
        try {
            return await pool.query(req, "call spc_qualitychecklist_search(?,?,?)",
            [
                qualitycheck.acknowledgement_number,
                qualitycheck.from_date,
                qualitycheck.to_date,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("qualitycheck.service - getQualityCheckList", err);
        } 
        return null;
    };

};

module.exports = qualitycheckRepository;