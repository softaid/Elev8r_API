let purchaseinvoicedetailRepository = function (pool, log) {
    
     // get all PurchaseInvoiceDetail
     this.getAllPurchaseInvoiceDetail = async function (req, purchaseinvoicedetail) {
        console.log("purchaseinvoicedetail : ",purchaseinvoicedetail)
       try {
           return await pool.query(req, "call spc_purchaseinvoicedetail_search(?,?)",
           [
            purchaseinvoicedetail.purchaseinvoiceid,
            purchaseinvoicedetail.companyid
           ]);
       }
       catch (err) {
           console.log('Error thrown : ', err);
           log.dbErrorLog("purchaseinvoicedetail.service - getAllPurchaseInvoiceDetail", err);
       } 
       return null;
   };

  
      // save Purchaseinvoice
    this.savePurchaseInvoicedetail = async function (req, purchaseinvoicedetail) {
        console.log("purchaseinvoicedetail:",purchaseinvoicedetail);
        try {
                var sp_text = "SET @out_id = 0; call spc_purchaseinvoicedetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        purchaseinvoicedetail["id"] != null ? parseInt(purchaseinvoicedetail.id) : null,
                        parseInt(purchaseinvoicedetail.purchaseinvoiceid),
                        parseInt(purchaseinvoicedetail.itemid),
                        purchaseinvoicedetail.itemname,
                        parseInt(purchaseinvoicedetail.itemunitid),
                        parseFloat(purchaseinvoicedetail.quantity),
                         purchaseinvoicedetail["weight"] != null ? parseFloat(purchaseinvoicedetail.weight) : null,
                        parseFloat(purchaseinvoicedetail.freequantity),
                        parseFloat(purchaseinvoicedetail.unitprice),
                        parseFloat(purchaseinvoicedetail.itemdiscount), 
                        purchaseinvoicedetail["taxid"] != null ? parseInt(purchaseinvoicedetail.taxid) : null,
                        purchaseinvoicedetail["taxpercent"] != null ? parseFloat(purchaseinvoicedetail.taxpercent) : null,
                        purchaseinvoicedetail["cgstid"] != null ? parseInt(purchaseinvoicedetail.cgstid) : null,
                        purchaseinvoicedetail["cgstpercent"] != null ? parseFloat(purchaseinvoicedetail.cgstpercent) : null,
                        purchaseinvoicedetail["cgstamount"] != null ? parseFloat(purchaseinvoicedetail.cgstamount) : null,
                        purchaseinvoicedetail["sgstid"] != null ? parseInt(purchaseinvoicedetail.sgstid) : null,
                        purchaseinvoicedetail["sgstpercent"] != null ? parseFloat(purchaseinvoicedetail.sgstpercent) : null,
                        purchaseinvoicedetail["sgstamount"] != null ? parseFloat(purchaseinvoicedetail.sgstamount) : null,
                        purchaseinvoicedetail["igstid"] != null ? parseInt(purchaseinvoicedetail.igstid) : null,
                        purchaseinvoicedetail["igstpercent"] != null ? parseFloat(purchaseinvoicedetail.igstpercent) : null,
                        purchaseinvoicedetail["igstamount"] != null ? parseFloat(purchaseinvoicedetail.igstamount) : null,
                        purchaseinvoicedetail["ugstid"] != null ? parseInt(purchaseinvoicedetail.ugstid) : null,
                        purchaseinvoicedetail["utgstpercent"] != null ? parseFloat(purchaseinvoicedetail.utgstpercent) : null,
                        purchaseinvoicedetail["utgstamount"] != null ? parseFloat(purchaseinvoicedetail.utgstamount) : null,
                        purchaseinvoicedetail["vatid"] != null ? parseInt(purchaseinvoicedetail.vatid) : null,
                        purchaseinvoicedetail["vatpercent"] != null ? parseFloat(purchaseinvoicedetail.vatpercent) : null,
                        purchaseinvoicedetail["vatamount"] != null ? parseFloat(purchaseinvoicedetail.vatamount) : null,
                        
                        // parseInt(purchaseinvoicedetail.taxid),
                        parseInt(purchaseinvoicedetail.companyid),
                        parseInt(purchaseinvoicedetail.userid)   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseinvoicedetail.service-savePurchaseInvoicedetail", err);
        }
        return null;
    };
    

    this.deletePurchaseInvoiceDetail = async function (req, purchaseinvoicedetail) {
        try {
                return await pool.query(req, "call spc_purchaseinvoicedetail_delete(?)",                       
                    [
                        parseInt(purchaseinvoicedetail.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseinvoicedetail.service-deletePurchaseInvoiceDetail", err);
        }
        return null;
    };

    //purchase invoice JE
    this.savePurchaseInvoiceJE = async function (req, purchaseinvoicedetail) {
        try {
            return await pool.query(req, "call spc_savepurchaseinvoice_je(?,?,?)",
            [
                purchaseinvoicedetail.purchaseinvoiceid,
                purchaseinvoicedetail.companyid,
                purchaseinvoicedetail.userid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseinvoicedetail.service - savePurchaseInvoiceJE", err);
        } 
        return null;
    };

};
    
module.exports =purchaseinvoicedetailRepository;