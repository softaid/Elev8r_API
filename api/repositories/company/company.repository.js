let companyRepository = function (pool, log) {
    
   

    this.getCompany = async function (req, Company) {
        try {
            return await pool.query(req, "call spc_company_select(?)",
            [
                Company.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("location.service - getCompany", err);
        }
    
        return null;
    };    

  

};
    
module.exports = companyRepository;