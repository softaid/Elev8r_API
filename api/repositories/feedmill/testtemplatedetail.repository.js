let testtemplatedetailRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllTestTemplateDetailResult = async function (req, testtemplatedetail) {
   try {
       return await pool.query(req, "call spc_testtemplatedetail_search(?)",
       [
           testtemplatedetail.testtemplateid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testtemplatedetail.service - getAllTestTemplateDetailResult", err);
   } 
   return null;
};    

    // SELECT REPOSITORY

this.getTestTemplateDetail = async function (req, testtemplatedetail) {
   console.log("testtemplatedetail repo:",testtemplatedetail);
   try {
       return await pool.query(req, "call spc_testtemplatedetail_select(?,?)",
       [
           testtemplatedetail.id,
           testtemplatedetail.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testtemplatedetail.service - getTestTemplateDetail", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveTestTemplateDetail = async function (req, testtemplatedetail) {
   console.log("testtemplatedetail",testtemplatedetail);
   try {
           var sp_text = "SET @out_id = 0; call spc_testtemplatedetail_save(?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                   testtemplatedetail["id"] != null ? parseInt(testtemplatedetail.id) : null,
                   parseInt(testtemplatedetail.testtemplateid),
                   parseInt(testtemplatedetail.testid),
                   testtemplatedetail.testname,
                   parseInt(testtemplatedetail.deduction),
                   parseInt(testtemplatedetail.companyid),
                   parseInt(testtemplatedetail.userid),   
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testtemplatedetail.service-saveTestTemplateDetail", err);
   }
   return null;
};

   //DELETE REPOSITORY

this.deleteTestTemplateDetail = async function (req, testtemplatedetail) {
   try {
           return await pool.query(req, "call spc_testtemplatedetail_delete(?)",                       
               [
                   parseInt(testtemplatedetail.id)
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testtemplatedetail.repository - deleteTestTemplateDetail", err);
   }
   return null;
};

};

module.exports = testtemplatedetailRepository;