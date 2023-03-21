let  billofmaterialRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllBillOfMaterialResult = async function (req, billofmaterial) {
   try {
       return await pool.query(req, "call spc_billofmaterial_search(?)",
       [
        billofmaterial.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("billofmaterial.service - getAllBillOfMaterialResult", err);
   } 
   return null;
};    

    // SELECT REPOSITORY

this.getBillOfMaterial = async function (req, billofmaterial) {
   console.log("billofmaterial repo:",billofmaterial);
   try {
       return await pool.query(req, "call spc_billofmaterial_select(?,?)",
       [
        billofmaterial.id,
        billofmaterial.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("billofmaterial.service - getBillOfMaterial", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveBillOfMaterial = async function (req, billofmaterial) {
   console.log("billofmaterial",billofmaterial);
   try {
           var sp_text = "SET @out_id = 0; call spc_billofmaterial_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                billofmaterial["id"] != null ? parseInt(billofmaterial.id) : null,
                billofmaterial.bomcode,
                parseInt(billofmaterial.itemgroupid),
                parseInt(billofmaterial.itemid),
                parseFloat(billofmaterial.quantity),
                parseInt(billofmaterial.unitid),
                parseFloat(billofmaterial.unitcost),
                billofmaterial.bomdate,
                parseInt(billofmaterial.createdby),
                billofmaterial.isactive,
                billofmaterial.note,
                billofmaterial.bomno,
                parseInt(billofmaterial.companyid),
                parseInt(billofmaterial.userid),   
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("billofmaterial.service-saveBillOfMaterial", err);
   }
   return null;
};

   //DELETE REPOSITORY

this.deleteBillOfMaterial = async function (req, billofmaterial) {
   try {
           return await pool.query(req, "call spc_billofmaterial_delete(?)",                       
               [
                   parseInt(billofmaterial.id)
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("billofmaterial.repository - deleteBillOfMaterial", err);
   }
   return null;
};

this.getItemLastPurchaseCost = async function (req, billofmaterial) {
    try {
        return await pool.query(req, "call spc_item_lastpurchasecost(?,?)",
        [
         billofmaterial.itemid,
         billofmaterial.companyid,
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("billofmaterial.service - getItemLastPurchaseCost", err);
    } 
    return null;
 };  

 this.getBomByitemid = async function (req, billofmaterial) {
    console.log("billofmaterial repo:",billofmaterial);
    try {
        return await pool.query(req, "call spc_feedmill_billofmaterial_byitemid(?,?,?)",
        [
         billofmaterial.itemid,
         billofmaterial.bomcode,
         billofmaterial.companyid
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("billofmaterial.service - getBomByitemid", err);
    } 
    return null;
 };  
    
 this.getBillOfMaterialList = async function (req, billofmaterial) {
     try {
         return await pool.query(req, "call spc_billofmateriallist_search(?,?,?,?)",
         [
            billofmaterial.product_group,
            billofmaterial.product_name,
            billofmaterial.from_date,
            billofmaterial.to_date,
         ]);
     }
     catch (err) {
         console.log('Error thrown : ', err);
         log.dbErrorLog("billofmaterial.service - getBillOfMaterialList", err);
     } 
     return null;
 };

};

module.exports = billofmaterialRepository;