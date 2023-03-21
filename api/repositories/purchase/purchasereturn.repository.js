let purchasereturnRepository = function (pool, log) {
    
    // get all purchasereturn
    this.getAllPurchaseReturn= async function (req, purchasereturn) {
       console.log("purchasereturn : ",purchasereturn)
      try {
          return await pool.query(req, "call spc_purchasereturn_search(?)",
          [
           purchasereturn.companyid
          ]);
      }
      catch (err) {
          console.log('Error thrown : ', err);
          log.dbErrorLog("purchasereturn.service - getAllPurchaseReturn", err);
      } 
      return null;
  };

  // get purchasereturn
  this.getPurchaseReturn= async function (req, purchasereturn) {
    console.log("purchasereturn : ",purchasereturn)
   try {
       return await pool.query(req, "call spc_purchasereturn_select(?)",
       [
        purchasereturn.id
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("purchasereturn.service - getPurchaseReturn", err);
   } 
   return null;
};

 
   // save Purchaseinvoice
   this.savePurchaseReturn = async function (req, purchasereturn) {
       try {
               var sp_text = "SET @out_id = 0; call spc_purchasereturn_save(?,?,?,?,?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
               return await pool.query(req, sp_text,                       
                   [
                       purchasereturn["id"] != null ? parseInt(purchasereturn.id) : null,
                       purchasereturn.date,
                       parseInt(purchasereturn.itemid), 
                       parseInt(purchasereturn.warehouseid),
                       parseInt(purchasereturn.warehousebinid),
                       parseInt(purchasereturn.transactionid),
                       parseFloat(purchasereturn.quantity), 
                       parseFloat(purchasereturn.unitcost), 
                       parseFloat(purchasereturn.amount), 
                       parseInt(purchasereturn.statusid),
		       purchasereturn.remark,
                       parseInt(purchasereturn.companyid),
                       parseInt(purchasereturn.userid)   
                   ]);
       }
       catch (err) {
           console.log('Error thrown : ', err);
           log.dbErrorLog("purchasereturn.service-savePurchaseReturn", err);
       }
       return null;
   };

   // delete Stock Adjustment     
   this.deletePurchaseReturn = async function (req, purchasereturn) {
    try {
        return await pool.query(req, "call spc_purchasereturn_delete(?)",                       
            [
                parseInt(purchasereturn.id),
            ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("purchasereturn.service-deletePurchaseReturn", err);
    }
    return null;
};
  

};
   
module.exports =purchasereturnRepository;