let testmasterRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllTestMasterResult = async function (req, testmaster) {
   try {
       return await pool.query(req, "call spc_testmaster_search(?)",
       [
           testmaster.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testmaster.service - getAllTestMasterResult", err);
   } 
   return null;
};    

    // SELECT REPOSITORY

this.getTestMaster = async function (req, testmaster) {
   console.log("testmaster repo:",testmaster);
   try {
       return await pool.query(req, "call spc_testmaster_select(?,?)",
       [
           testmaster.id,
           testmaster.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testmaster.service - getTestMaster", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveTestMaster = async function (req, testmaster) {
   console.log("testmaster",testmaster);
   try {
           var sp_text = "SET @out_id = 0; call spc_testmaster_save(?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                   testmaster["id"] != null ? parseInt(testmaster.id) : null,
                   testmaster.testname,
                   parseInt(testmaster.testtype),
                   parseInt(testmaster.companyid),
                   parseInt(testmaster.userid),   
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testmaster.service-saveTestMaster", err);
   }
   return null;
};

   //DELETE REPOSITORY

this.deleteTestMaster = async function (req, testmaster) {
   try {
           return await pool.query(req, "call spc_testmaster_delete(?)",                       
               [
                   parseInt(testmaster.id)
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testmaster.repository - deleteTestMaster", err);
   }
   return null;
};

};

module.exports = testmasterRepository;