let acknowledgementslipdetailRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllAcknowledgementslipDetailResult = async function (req, acknowledgementslipdetail) {
   try {
       return await pool.query(req, "call spc_acknowledgementslipdetail_search(?)",
       [
        acknowledgementslipdetail.ackid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("acknowledgementslipdetail.service - getAllAcknowledgementslipDetailResult", err);
   } 
   return null;
};    

    // SELECT REPOSITORY

this.getAcknowledgementslipDetail = async function (req, acknowledgementslipdetail) {
   console.log("acknowledgementslipdetail repo:",acknowledgementslipdetail);
   try {
       return await pool.query(req, "call spc_acknowledgementslipdetail_select(?,?)",
       [
        acknowledgementslipdetail.id,
        acknowledgementslipdetail.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("acknowledgementslipdetail.service - getAcknowledgementslipDetail", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveAcknowledgementslipDetail = async function (req, acknowledgementslipdetail) {
   console.log("acknowledgementslipdetail",acknowledgementslipdetail);
   try {
           var sp_text = "SET @out_id = 0; call spc_acknowledgementslipdetail_save(?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                acknowledgementslipdetail["id"] != null ? parseInt(acknowledgementslipdetail.id) : null,
                   parseInt(acknowledgementslipdetail.ackid),
                   parseInt(acknowledgementslipdetail.purchaseorderid),
                   parseInt(acknowledgementslipdetail.itemid),
                   parseInt(acknowledgementslipdetail.quantity),
                   parseInt(acknowledgementslipdetail.companyid),
                   parseInt(acknowledgementslipdetail.userid),   
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("testmsterdetail.service-saveAcknowledgementslipDetail", err);
   }
   return null;
};

   //DELETE REPOSITORY

this.deleteAcknowledgementslipDetail = async function (req, acknowledgementslipdetail) {
   try {
           return await pool.query(req, "call spc_acknowledgementslipdetail_delete(?)",                       
               [
                   parseInt(acknowledgementslipdetail.id)
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("acknowledgementslipdetail.repository -deleteAcknowledgementslipDetail ", err);
   }
   return null;
};

this.getPoidByAcknowledgementno = async function (req, acknowledgementslipdetail) {
    console.log("acknowledgementslipdetail : ",acknowledgementslipdetail)
   try {
       return await pool.query(req, "call spc_poid_byacknowledgementid(?,?)",
       [
        acknowledgementslipdetail.ackid,
        acknowledgementslipdetail.companyid
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("AcknowledgementSlipDetail.service - getPoidByAcknowledgementno", err);
   } 
   return null;
};

};

module.exports = acknowledgementslipdetailRepository;