let acknowledgementslipRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllAcknowledgementslipResult = async function (req, acknowledgementslip) {
   try {
       return await pool.query(req, "call spc_acknowledgementslip_search(?)",
       [
        acknowledgementslip.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("acknowledgementslip.service - getAllAcknowledgementslipResult", err);
   } 
   return null;
};  


// SEARCH With Qualitycheck REPOSITORY

this.getAllAcknowledgementslipResultwithqualitystatus = async function (req, acknowledgementslip) {
    try {
        return await pool.query(req, "call spc_acknowledgementslip_search_formaterialreceipt(?)",
        [
         acknowledgementslip.companyid,
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("acknowledgementslip.service - getAllAcknowledgementslipResultwithqualitystatus", err);
    } 
    return null;
 };    

    // SELECT REPOSITORY

this.getAcknowledgementSlip = async function (req, acknowledgementslip) {
   console.log("acknowledgementslip repo:",acknowledgementslip);
   try {
       return await pool.query(req, "call spc_acknowledgementslip_select(?,?)",
       [
        acknowledgementslip.id,
        acknowledgementslip.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("acknowledgementslip.service - getAcknowledgementSlip", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveAcknowledgementSlip = async function (req, acknowledgementslip) {
   console.log("acknowledgementslip",acknowledgementslip);
   try {
           var sp_text = "SET @out_id = 0; call spc_acknowledgementslip_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                acknowledgementslip["id"] != null ? parseInt(acknowledgementslip.id) : null,
                acknowledgementslip.slipdate,
                acknowledgementslip.vehicleno,
                parseInt(acknowledgementslip.vehicleweight),
                acknowledgementslip.receivedby,
                parseInt(acknowledgementslip.materialweight),
                acknowledgementslip.ackno,
                parseInt(acknowledgementslip.companyid),
                parseInt(acknowledgementslip.userid),   
             ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("acknowledgementslip.service-saveAcknowledgementSlip", err);
   }
   return null;
};

   //DELETE REPOSITORY

this.deleteAcknowledgementSlip = async function (req, acknowledgementslip) {
   try {
           return await pool.query(req, "call spc_acknowledgementslip_delete(?)",                       
               [
                   parseInt(acknowledgementslip.id)
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("acknowledgementslip.repository - deleteAcknowledgementSlip", err);
   }
   return null;
};
    
this.getAcknowledgementSlipList = async function (req, acknowledgementslip) {
    try {
        return await pool.query(req, "call spc_acknowledgementsliplist_search(?,?)",
        [
            acknowledgementslip.from_date,
            acknowledgementslip.to_date,
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("acknowledgementslip.service - getAcknowledgementSlipList", err);
    } 
    return null;
};

};

module.exports = acknowledgementslipRepository;