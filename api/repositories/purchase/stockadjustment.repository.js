let stockadjustmentRepository = function (pool, log) {
    
    // get all stockAdjustment
    this.getAllStockAdjustment= async function (req, stockAdjustment) {
       console.log("stockAdjustment : ",stockAdjustment)
      try {
          return await pool.query(req, "call spc_stockAdjustment_search(?)",
          [
           stockAdjustment.companyid
          ]);
      }
      catch (err) {
          console.log('Error thrown : ', err);
          log.dbErrorLog("stockAdjustment.service - getAllStockAdjustment", err);
      } 
      return null;
  };

  // get stockAdjustment
  this.getStockAdjustment= async function (req, stockAdjustment) {
    console.log("stockAdjustment : ",stockAdjustment)
   try {
       return await pool.query(req, "call spc_stockAdjustment_select(?)",
       [
        stockAdjustment.id
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("stockAdjustment.service - getStockAdjustment", err);
   } 
   return null;
};

 
   // save Purchaseinvoice
   this.saveStockAdjustment = async function (req, stockAdjustment) {
       try {
               var sp_text = "SET @out_id = 0; call spc_stockAdjustment_save(?,?,?,?,?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
               return await pool.query(req, sp_text,                       
                   [
                       stockAdjustment["id"] != null ? parseInt(stockAdjustment.id) : null,
                       stockAdjustment.date,
                       parseInt(stockAdjustment.itemid), 
                       parseInt(stockAdjustment.warehouseid),
                       parseInt(stockAdjustment.warehousebinid),
                       parseInt(stockAdjustment.adjustmenttypeid), 
					   parseFloat(stockAdjustment.instock),
                       parseFloat(stockAdjustment.quantity), 
                       parseFloat(stockAdjustment.unitcost), 
                       parseFloat(stockAdjustment.amount), 
                       parseInt(stockAdjustment.statusid),
                       parseInt(stockAdjustment.companyid),
                       parseInt(stockAdjustment.userid)   
                   ]);
       }
       catch (err) {
           console.log('Error thrown : ', err);
           log.dbErrorLog("stockAdjustment.service-saveStockAdjustment", err);
       }
       return null;
   };

   // delete Stock Adjustment     
   this.deleteStockAdjustment = async function (req, stockAdjustment) {
    try {
        return await pool.query(req, "call spc_stockAdjustment_delete(?)",                       
            [
                parseInt(stockAdjustment.id),
            ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("stockAdjustment.service-deleteStockAdjustment", err);
    }
    return null;
};
  

};
   
module.exports =stockadjustmentRepository;