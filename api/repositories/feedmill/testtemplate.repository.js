let testtemplateRepository = function (pool, log) {

         // SEARCH REPOSITORY

    this.getAllTestTemplateResult = async function (req, testtemplate) {
        try {
            return await pool.query(req, "call spc_testtemplate_search(?)",
            [
                testtemplate.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("testtemplate.service - getAllTestTemplateResult", err);
        } 
        return null;
    };    

         // SELECT REPOSITORY

    this.getTestTemplate = async function (req, testtemplate) {
        console.log("testtemplate repo:",testtemplate);
        try {
            return await pool.query(req, "call spc_testtemplate_select(?,?)",
            [
                testtemplate.id,
                testtemplate.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("testtemplate.service - getTestTemplate", err);
        } 
        return null;
    };  

         //SAVE REPOSITORY

    this.saveTestTemplate = async function (req, testtemplate) {
        console.log("testtemplate",testtemplate);
        try {
                var sp_text = "SET @out_id = 0; call spc_testtemplate_save(?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        testtemplate["id"] != null ? parseInt(testtemplate.id) : null,
                        parseInt(testtemplate.itemid),
                        parseInt(testtemplate.companyid),
                        parseInt(testtemplate.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("testtemplate.service-saveTestTemplate", err);
        }
        return null;
    };

        //DELETE REPOSITORY

    this.deleteTestTemplate = async function (req, testtemplate) {
        try {
                return await pool.query(req, "call spc_testtemplate_delete(?)",                       
                    [
                        parseInt(testtemplate.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("testtemplate.repository - deleteTestTemplate", err);
        }
        return null;
    };
    
    this.getTestTemplateList = async function (req, testtemplate) {
        try {
            return await pool.query(req, "call spc_testtemplatelist_search(?)",
            [
                testtemplate.item,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("testtemplate.service - getTestTemplateList", err);
        } 
        return null;
    };

};
    
module.exports = testtemplateRepository;