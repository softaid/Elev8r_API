let salesreturnRepository = function (pool, log) {
    
    // get all salesreturn
    this.getAllSalesReturn= async function (req, salesreturn) {
       console.log("salesreturn : ",salesreturn)
      try {
          return await pool.query(req, "call spc_salesreturn_search(?)",
          [
           salesreturn.companyid
          ]);
      }
      catch (err) {
          console.log('Error thrown : ', err);
          log.dbErrorLog("salesreturn.service - getAllSalesReturn", err);
      } 
      return null;
  };

  // get salesreturn
  this.getSalesReturn= async function (req, salesreturn) {
    console.log("salesreturn : ",salesreturn)
   try {
       return await pool.query(req, "call spc_salesreturn_select(?)",
       [
        salesreturn.id
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("salesreturn.service - getSalesReturn", err);
   } 
   return null;
};

 
   // save Purchaseinvoice
   this.saveSalesReturn = async function (req, salesreturn) {
       try {
               var sp_text = "SET @out_id = 0; call spc_salesreturn_save(?,?,?,?,?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
               return await pool.query(req, sp_text,                       
                   [
                       salesreturn["id"] != null ? parseInt(salesreturn.id) : null,
                       salesreturn.date,
                       parseInt(salesreturn.itemid), 
                       parseInt(salesreturn.warehouseid),
                       parseInt(salesreturn.warehousebinid),
                       parseInt(salesreturn.transactionid),
                       parseFloat(salesreturn.quantity), 
                       parseFloat(salesreturn.unitcost), 
                       parseFloat(salesreturn.amount), 
                       parseInt(salesreturn.statusid),
		       salesreturn.remark,
                       parseInt(salesreturn.companyid),
                       parseInt(salesreturn.userid)   
                   ]);
       }
       catch (err) {
           console.log('Error thrown : ', err);
           log.dbErrorLog("salesreturn.service-saveSalesReturn", err);
       }
       return null;
   };

   // delete Stock Adjustment     
   this.deleteSalesReturn = async function (req, salesreturn) {
    try {
        return await pool.query(req, "call spc_salesreturn_delete(?)",                       
            [
                parseInt(salesreturn.id),
            ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("salesreturn.service-deleteSalesReturn", err);
    }
    return null;
};
  

};
   
module.exports =salesreturnRepository;