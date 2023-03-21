let indirectcostheadsRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllIndirectCostHeadsResult = async function (req, indirectcostheads) {
   try {
       return await pool.query(req, "call spc_indirectcostheads_search(?)",
       [
        indirectcostheads.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("indirectcostheads.service - getAllIndirectCostHeadsResult", err);
   } 
   return null;
};    

    // SELECT REPOSITORY

this.getIndirectCostHeads = async function (req, indirectcostheads) {
   console.log("indirectcostheads repo:",indirectcostheads);
   try {
       return await pool.query(req, "call spc_indirectcostheads_select(?,?)",
       [
        indirectcostheads.id,
        indirectcostheads.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("indirectcostheads.service - getIndirectCostHeads", err);
   } 
   return null;
};  

    //SAVE REPOSITORY
this.saveIndirectCostHeads = async function (req, indirectcostheads) {
    try {
            var sp_text = "SET @out_id = 0; call spc_indirectcostheads_save(?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                indirectcostheads["id"] != null ? parseInt(indirectcostheads.id) : null,
                indirectcostheads.resourcename,
                parseInt(indirectcostheads.ledgerid),
                parseInt(indirectcostheads.companyid),
                parseInt(indirectcostheads.userid),   
                ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("indirectcostheads.repository - saveIndirectCostHeads", err);
    }
    return null;
};

   //DELETE REPOSITORY

this.deleteIndirectCostHeads = async function (req, indirectcostheads) {
   try {
           return await pool.query(req, "call spc_indirectcostheads_delete(?)",                       
               [
                   parseInt(indirectcostheads.id)
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("indirectcostheads.repository - deleteIndirectCostHeads", err);
   }
   return null;
};

};

module.exports = indirectcostheadsRepository;