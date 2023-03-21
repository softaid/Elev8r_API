let billofmaterialdetailRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllBillOfMaterialDetailResult = async function (req, billofmaterialdetail) {
   try {
       return await pool.query(req, "call spc_billofmaterialdetail_search(?)",
       [
        billofmaterialdetail.bomid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("billofmaterialdetail.service - getAllBillOfMaterialDetailResult", err);
   } 
   return null;
};    

    // SELECT REPOSITORY

this.getBillOfMaterialDetail = async function (req, billofmaterialdetail) {
   console.log("billofmaterialdetail repo:",billofmaterialdetail);
   try {
       return await pool.query(req, "call spc_billofmaterialdetail_select(?,?)",
       [
        billofmaterialdetail.id,
        billofmaterialdetail.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("billofmaterialdetail.service - getBillOfMaterialDetail", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveBillOfMaterialDetail = async function (req, billofmaterialdetail) {
   console.log("billofmaterialdetail",billofmaterialdetail);
   try {
           var sp_text = "SET @out_id = 0; call spc_billofmaterialdetail_save(?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                  billofmaterialdetail["id"] != null ? parseInt(billofmaterialdetail.id) : null,
                   parseInt(billofmaterialdetail.bomid),
                   parseInt(billofmaterialdetail.itemid),
                   parseFloat(billofmaterialdetail.quantity),
                   parseInt(billofmaterialdetail.unitid),
                   parseFloat(billofmaterialdetail.unitcost),
                   billofmaterialdetail["parentid"] != null ? parseInt(billofmaterialdetail.parentid) : null,
                   parseInt(billofmaterialdetail.materialtypeid),
                   parseInt(billofmaterialdetail.companyid),
                   parseInt(billofmaterialdetail.userid),   
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("billofmaterialdetail.service-saveBillOfMaterialDetail", err);
   }
   return null;
};

   //DELETE REPOSITORY

this.deleteBillOfMaterialDetail = async function (req, billofmaterialdetail) {
    console.log("billofmaterialdetail",billofmaterialdetail);
    try {
            return await pool.query(req, "call spc_billofmaterialdetail_delete(?,?,?)",                       
                [
                    parseInt(billofmaterialdetail.id),
                    parseInt(billofmaterialdetail.companyid),
                    parseInt(billofmaterialdetail.userid), 
                ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("billofmaterialdetail.service-deleteDiseaseDetail", err);
    }
    return null;
}


};

module.exports = billofmaterialdetailRepository;