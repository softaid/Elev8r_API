let financialyeardocseriesRepository = function (pool, log) {
    
    this.getAllFinancialYearDocSeries = async function (req, FinancialYearDocSeries) {
        try {
            return await pool.query(req, "call spc_financialyeardocseries_search(?,?)",
            [
                FinancialYearDocSeries.settingid,
                FinancialYearDocSeries.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("financialyeardocseries.service - getAllFinancialYearDocSeries", err);
        } 
        return null;
    };    

    this.getValidFinancialYearList = async function (req, FinancialYearDocSeries) {
        try {
            return await pool.query(req, "call spc_financialyeardocseries_validyears(?)",
            [
                FinancialYearDocSeries.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("financialyeardocseries.service - getAllFinancialYearDocSeries", err);
        } 
        return null;
    };

    this.getFinancialYearDocSeries = async function (req, FinancialYearDocSeries) {
        console.log("financialyeardocseries repo:",FinancialYearDocSeries);
        try {
            return await pool.query(req, "call spc_financialyeardocseries_select(?)",
            [
                FinancialYearDocSeries.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("financialyeardocseries.service - getFinancialYearDocSeries", err);
        } 
        return null;
    };  

    this.saveFinancialYearDocSeries = async function (req, FinancialYearDocSeries) {
        console.log("FinancialYearDocSeries",FinancialYearDocSeries);
        try {
                var sp_text = "SET @out_id = 0; call spc_financialyeardocseries_save(?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        FinancialYearDocSeries["id"] != null ? parseInt(FinancialYearDocSeries.id) : null,
                        parseInt(FinancialYearDocSeries.docseriesid),
                        FinancialYearDocSeries.docname,
                        FinancialYearDocSeries.doccode,
                        parseInt(FinancialYearDocSeries.length),
                        parseInt(FinancialYearDocSeries.startwith),
                        parseInt(FinancialYearDocSeries.endto),
                        FinancialYearDocSeries.prefix,
                        parseInt(FinancialYearDocSeries.financialyearsettingid),
                        FinancialYearDocSeries["default"] != null ? parseInt(FinancialYearDocSeries.default) : null,
                        parseInt(FinancialYearDocSeries.userid),   
                        parseInt(FinancialYearDocSeries.companyid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("FinancialYearDocSeries.service-saveFinancialYearDocSeries", err);
        }
        return null;
    }
};
    
module.exports = financialyeardocseriesRepository;