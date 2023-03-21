let freightdetailRepository = function (pool, log) {
    
    // get all FreightDetail
    this.getAllFreightDetail= async function (req, freightDetail) {
       console.log("freightDetail : ",freightDetail)
      try {
          return await pool.query(req, "call spc_freightdetail_search(?,?)",
          [
           freightDetail.purchaseinvoiceid,
           freightDetail.companyid
          ]);
      }
      catch (err) {
          console.log('Error thrown : ', err);
          log.dbErrorLog("freightDetail.service - getAllFreightDetail", err);
      } 
      return null;
  };

 
   // save Purchaseinvoice
   this.saveFreightDetail = async function (req, freightDetail) {
       console.log("freightDetail:",freightDetail);
       try {
               var sp_text = "SET @out_id = 0; call spc_freightdetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
               return await pool.query(req, sp_text,                       
                   [
                       freightDetail["id"] != null ? parseInt(freightDetail.id) : null,
                       parseInt(freightDetail.purchaseinvoiceid),
                       parseInt(freightDetail.freighttypeid), 
                       parseInt(freightDetail.freightamount), 
                       freightDetail["taxid"] != null ? parseInt(freightDetail.taxid) : null,
                       freightDetail["taxpercent"] != null ? parseFloat(freightDetail.taxpercent) : null,
                       freightDetail["cgstid"] != null ? parseInt(freightDetail.cgstid) : null,
                       freightDetail["cgstpercent"] != null ? parseFloat(freightDetail.cgstpercent) : null,
                       freightDetail["cgstamount"] != null ? parseFloat(freightDetail.cgstamount) : null,
                       freightDetail["sgstid"] != null ? parseInt(freightDetail.sgstid) : null,
                       freightDetail["sgstpercent"] != null ? parseFloat(freightDetail.sgstpercent) : null,
                       freightDetail["sgstamount"] != null ? parseFloat(freightDetail.sgstamount) : null,
                       freightDetail["igstid"] != null ? parseInt(freightDetail.igstid) : null,
                       freightDetail["igstpercent"] != null ? parseFloat(freightDetail.igstpercent) : null,
                       freightDetail["igstamount"] != null ? parseFloat(freightDetail.igstamount) : null,
                       freightDetail["ugstid"] != null ? parseInt(freightDetail.ugstid) : null,
                       freightDetail["utgstpercent"] != null ? parseFloat(freightDetail.utgstpercent) : null,
                       freightDetail["utgstamount"] != null ? parseFloat(freightDetail.utgstamount) : null,
                       freightDetail["vatid"] != null ? parseInt(freightDetail.vatid) : null,
                       freightDetail["vatpercent"] != null ? parseFloat(freightDetail.vatpercent) : null,
                       freightDetail["vatamount"] != null ? parseFloat(freightDetail.vatamount) : null,
                       
                       // parseInt(freightDetail.taxid),
                       parseInt(freightDetail.companyid),
                       parseInt(freightDetail.userid)   
                   ]);
       }
       catch (err) {
           console.log('Error thrown : ', err);
           log.dbErrorLog("freightDetail.service-saveFreightDetail", err);
       }
       return null;
   };
   this.getAllFreightType= async function (req, freightDetail) {
    console.log("freightDetail : ",freightDetail)
   try {
       return await pool.query(req, "call spc_freight_search(?)",
       [
        freightDetail.companyid
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("freightDetail.service - getAllFreightDetail", err);
   } 
   return null;
};

   

};
   
module.exports =freightdetailRepository;