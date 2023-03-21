let qualitycheckdetailRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllQualityCheckDetailResult = async function (req, qualitycheckdetail) {
    console.log("qualitycheckdetail",qualitycheckdetail);
   try {
       return await pool.query(req, "call spc_qualitycheckdetail_search(?)",
       [
        qualitycheckdetail.qualitycheckid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("qualitycheckdetail.service - getAllQualityCheckDetailResult", err);
   } 
   return null;
};    

    // SELECT REPOSITORY

this.getQualityCheckDetail = async function (req, qualitycheckdetail) {
   console.log("qualitycheckdetail repo:",qualitycheckdetail);
   try {
       return await pool.query(req, "call spc_qualitycheckdetail_select(?,?)",
       [
        qualitycheckdetail.id,
        qualitycheckdetail.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("qualitycheckdetail.service - getQualityCheckDetail", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveQualityCheckDetail = async function (req, qualitycheckdetail) {
   console.log("qualitycheckdetail",qualitycheckdetail);
   try {
           var sp_text = "SET @out_id = 0; call spc_qualitycheckdetail_save(?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                qualitycheckdetail["id"] != null ? parseInt(qualitycheckdetail.id) : null,
                   parseInt(qualitycheckdetail.qualitycheckid),
                   parseInt(qualitycheckdetail.purchaseorderid),
                   parseInt(qualitycheckdetail.itemid),
                   parseInt(qualitycheckdetail.testid),
                   parseFloat(qualitycheckdetail.samplequantity),
                   qualitycheckdetail.finding,
                   parseInt(qualitycheckdetail.resultid),
                   qualitycheckdetail.remark,
                   parseInt(qualitycheckdetail.companyid),
                   parseInt(qualitycheckdetail.userid),   
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("qualitycheckdetail.service-saveQualityCheckDetail", err);
   }
   return null;
};

   //DELETE REPOSITORY

this.deleteQualityCheckDetail = async function (req, qualitycheckdetail) {
   try {
           return await pool.query(req, "call spc_qualitycheckdetail_delete(?)",                       
               [
                   parseInt(qualitycheckdetail.id)
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("qualitycheckdetail.repository -deleteQualityCheckDetail ", err);
   }
   return null;
};

this.getTestIdByFinding = async function (req, qualitycheckdetail) {
    console.log("qualitycheckdetail : ",qualitycheckdetail)
   try {
       return await pool.query(req, "call spc_testresult_byfinding(?,?,?)",
       [
        qualitycheckdetail.testid,
        qualitycheckdetail.finding,
        qualitycheckdetail.companyid
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("qualitycheckdetail.service - getTestIdByFinding", err);
   } 
   return null;
};

this.getTestIdByFindingForTestvalue = async function (req, qualitycheckdetail) {
    console.log("-----qualitycheckdetail----- : ",qualitycheckdetail)
   try {
       return await pool.query(req, "call spc_testresult_byvalue(?,?,?)",
       [
        qualitycheckdetail.testid,
        qualitycheckdetail.testvalue,
        qualitycheckdetail.companyid
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("qualitycheckdetail.service - getTestIdByFindingForTestvalue", err);
   } 
   return null;
};


};

module.exports = qualitycheckdetailRepository;