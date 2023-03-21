let testmasterdetailRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllTestMasterDetailResult = async function (req, testmasterdetail) {
   try {
       return await pool.query(req, "call spc_testmasterdetail_search(?)",
       [
           testmasterdetail.testmasterid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testmasterdetail.service - getAllTestMasterDetailResult", err);
   } 
   return null;
};    

// Search Repository getAll Testvalue
this.getAllTestMasterDetailtestValue = async function (req, testmasterdetail) {
    try {
        return await pool.query(req, "call spc_getalltestvaluename(?,?)",
        [
            testmasterdetail.testid,
            testmasterdetail.companyid,
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("testmasterdetail.service - getAllTestMasterDetailtestValue", err);
    } 
    return null;
 };    

    // SELECT REPOSITORY

this.getTestMasterDetail = async function (req, testmasterdetail) {
   console.log("testmasterdetail repo:",testmasterdetail);
   try {
       return await pool.query(req, "call spc_testmasterdetail_select(?,?)",
       [
           testmasterdetail.id,
           testmasterdetail.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testmasterdetail.service - getTestMasterDetail", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveTestMasterDetail = async function (req, testmasterdetail) {
   console.log("testmasterdetail",testmasterdetail);
   try {
           var sp_text = "SET @out_id = 0; call spc_testmasterdetail_save(?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                   testmasterdetail["id"] != null ? parseInt(testmasterdetail.id) : null,
                   parseInt(testmasterdetail.testmasterid),
                   parseInt(testmasterdetail.startfrom),
                   parseInt(testmasterdetail.endto),
                   parseInt(testmasterdetail.resultid),
                   testmasterdetail.testvalue,
                   parseInt(testmasterdetail.companyid),
                   parseInt(testmasterdetail.userid),   
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testmsterdetail.service-saveTestMasterDetail", err);
   }
   return null;
};

   //DELETE REPOSITORY

this.deleteTestMasterDetail = async function (req, testmasterdetail) {
   try {
           return await pool.query(req, "call spc_testmasterdetail_delete(?)",                       
               [
                   parseInt(testmasterdetail.id)
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testmasterdetail.repository - deleteTestMasterDetail", err);
   }
   return null;
};

};

module.exports = testmasterdetailRepository;