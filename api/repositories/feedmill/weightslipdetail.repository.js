let weightslipdetailRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllWeightSlipDetailResult = async function (req, weightslipdetail) {
   try {
       return await pool.query(req, "call spc_weightslipdetail_search(?)",
       [
        weightslipdetail.weightslipid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("weightslipdetail.service - getAllWeightSlipDetailResult", err);
   } 
   return null;
};    

    // SELECT REPOSITORY

this.getWeightSlipDetail = async function (req, weightslipdetail) {
   console.log("weightslipdetail repo:",weightslipdetail);
   try {
       return await pool.query(req, "call spc_weightslipdetail_select(?,?)",
       [
        weightslipdetail.id,
        weightslipdetail.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("weightslipdetail.service - getWeightSlipDetail", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveWeightSlipDetail = async function (req, weightslipdetail) {
   console.log("weightslipdetail",weightslipdetail);
   try {
           var sp_text = "SET @out_id = 0; call spc_weightslipdetail_save(?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                weightslipdetail["id"] != null ? parseInt(weightslipdetail.id) : null,
                   parseInt(weightslipdetail.weightslipid),
                   parseInt(weightslipdetail.itemcode),
                   parseInt(weightslipdetail.quantity),
                   parseInt(weightslipdetail.weight),
                   parseInt(weightslipdetail.companyid),
                   parseInt(weightslipdetail.userid),   
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("weightslipdetail.service-saveWeightSlipDetail", err);
   }
   return null;
};

   //DELETE REPOSITORY

this.deleteWeightSlipDetail = async function (req, weightslipdetail) {
   try {
           return await pool.query(req, "call spc_weightslipdetail_delete(?)",                       
               [
                   parseInt(weightslipdetail.id)
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("weightslipdetail.repository -deleteWeightSlipDetail ", err);
   }
   return null;
};

// this.getPoidByAcknowledgementno = async function (req, weightslipdetail) {
//     console.log("weightslipdetail : ",weightslipdetail)
//    try {
//        return await pool.query(req, "call spc_poid_byacknowledgementid(?,?)",
//        [
//         weightslipdetail.weightslipid,
//         weightslipdetail.companyid
//        ]);
//    }
//    catch (err) {
//        console.log('Error thrown : ', err);
//        log.dbErrorLog("weightslipdetail.service - getPoidByAcknowledgementno", err);
//    } 
//    return null;
// };

};

module.exports = weightslipdetailRepository;