let financialyearsettingRepository = function (pool, log) {
    
    this.getAllFinancialYearSetting = async function (req, FinancialYearSetting) {
        try {
            return await pool.query(req, "call spc_financialyearsetting_search(?)",
            [
                FinancialYearSetting.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("financialyearsetting.service - getAllFinancialYearSetting", err);
        } 
        return null;
    };    

    this.getValidFinancialYearList = async function (req, FinancialYearSetting) {
        try {
            return await pool.query(req, "call spc_financialyearsetting_validyears(?)",
            [
                FinancialYearSetting.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("financialyearsetting.service - getAllFinancialYearSetting", err);
        } 
        return null;
    };

    this.getFinancialYearSetting = async function (req, FinancialYearSetting) {
        console.log("financialyearsetting repo:",FinancialYearSetting);
        try {
            return await pool.query(req, "call spc_financialyearsetting_select(?)",
            [
                FinancialYearSetting.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("financialyearsetting.service - getFinancialYearSetting", err);
        } 
        return null;
    };  

    this.saveFinancialYearSetting = async function (req, FinancialYearSetting) {
        console.log("FinancialYearSetting",FinancialYearSetting);
        try {
                var sp_text = "SET @out_id = 0; call spc_financialyearsetting_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        FinancialYearSetting["id"] != null ? parseInt(FinancialYearSetting.id) : null,
                        FinancialYearSetting.yearname,
                        FinancialYearSetting.yearcode,
                        FinancialYearSetting.startfrom,
                        FinancialYearSetting.endto,
                        FinancialYearSetting.active,
                        parseInt(FinancialYearSetting.statusid),
                        parseInt(FinancialYearSetting.userid),   
                        parseInt(FinancialYearSetting.companyid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("FinancialYearSetting.service-saveFinancialYearSetting", err);
        }
        return null;
    }
};
    
module.exports = financialyearsettingRepository;