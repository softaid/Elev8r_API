

let processingIssueForProductionRepository = function (pool, log) {

    this.searchProcessingIssueForProduction = async function (req, issue) {
        try {
            return await pool.query(req, "call spc_processingissueforproduction_search(?)",
            [
                issue.poid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("issue.repository - searchProcessingIssueForProduction", err);
        } 
        return null;
    };    

    this.selectProcessingIssueForProduction = async function (req, issue) {
        try {
            return await pool.query(req, "call spc_processingissueforproduction_select(?)",
            [
                issue.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("issue.repository - selectProcessingIssueForProduction", err);
        }
    
        return null;
    };    

    this.saveProcessingIssueForProduction = async function (req, issue) {
        try {
                var sp_text = "SET @out_id = 0; call spc_processingissueforproduction_save(?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        issue["id"] != null ? parseInt(issue.id) : null,
                        parseInt(issue.poid),
		            	parseInt(issue.itemid),
		            	issue.itembatch,
			            parseInt(issue.warehouseid),
                        parseInt(issue.issueqty),
                        parseFloat(issue.issuewt),
			            parseFloat(issue.issuecost),
                        parseInt(issue.companyid),
                        parseInt(issue.userid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("issue.repository - saveProcessingIssueForProduction", err);
        }
        return null;
    };

    this.deleteProcessingIssueForProduction = async function (req, issue) {
        try {
                return await pool.query(req, "call spc_processingissueforproduction_delete(?)",                       
                    [
                        parseInt(issue.id) 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("issue.repository - deleteProcessingIssueForProduction", err);
        }
        return null;
    };
 
};
    
module.exports = processingIssueForProductionRepository;