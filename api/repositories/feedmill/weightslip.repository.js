let weightslipRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllWeightSlipResult = async function (req, weightslip) {
   try {
       return await pool.query(req, "call spc_weightslip_search(?)",
       [
        weightslip.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("weightslip.service - getAllWeightSlipResult", err);
   } 
   return null;
};    

    // SELECT REPOSITORY

this.getWeightSlip = async function (req, weightslip) {
   console.log("weightslip repo:",weightslip);
   try {
       return await pool.query(req, "call spc_weightslip_select(?,?)",
       [
        weightslip.id,
        weightslip.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("weightslip.service - getWeightSlip", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveWeightSlip = async function (req, weightslip) {
   console.log("weightslip",weightslip);
   try {
           var sp_text = "SET @out_id = 0; call spc_weightslip_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                weightslip["id"] != null ? parseInt(weightslip.id) : null,
                parseInt(weightslip.ackid),
                parseInt(weightslip.itemid),
                weightslip.weightslipdate,
                parseFloat(weightslip.loadweightkg),
                parseFloat(weightslip.loadweightton),
                parseFloat(weightslip.unloadweightkg),
                parseFloat(weightslip.unloadweightton),
                parseFloat(weightslip.netweightkg),
                parseFloat(weightslip.netweightton),
                weightslip.intime,
                weightslip.outtime,
                parseInt(weightslip.companyid),
                parseInt(weightslip.userid),   
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("weightslip.service-saveWeightSlip", err);
   }
   return null;
};

   //DELETE REPOSITORY

this.deleteWeightSlip = async function (req, weightslip) {
   try {
           return await pool.query(req, "call spc_weightslip_delete(?)",                       
               [
                   parseInt(weightslip.id)
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("weightslip.repository - deleteWeightSlip", err);
   }
   return null;
};
    
this.getWeightSlipList = async function (req, weightslip) {
    try {
        return await pool.query(req, "call spc_weightsliplist_search(?,?,?)",
        [
            weightslip.acknowledgement_number,
            weightslip.from_date,
            weightslip.to_date,
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("weightslip.service - getWeightSlipList", err);
    } 
    return null;
};

};

module.exports = weightslipRepository;
