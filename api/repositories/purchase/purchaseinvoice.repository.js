let purchaseinvoiceRepository = function (pool, log) {
    

     // get all purchaseInvoice
     this.getAllPurchaseInvoice = async function (req, purchaseinvoice) {
        try {
            return await pool.query(req, "call spc_purchaseinvoice_search(?)",
            [
                purchaseinvoice.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseinvoice.service - getAllPurchaseInvoice", err);
        } 
        return null;
    };

    // get purchase invoice by id

    // get all purchaseInvoice
     this.getPurchaseInvoice = async function (req, purchaseinvoice) {
        try {
            return await pool.query(req, "call spc_purchaseinvoice_select(?)",
            [
                purchaseinvoice.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseinvoice.service - getPurchaseInvoice", err);
        } 
        return null;
    };
     
  
   // save Purchaseinvoice
    this.savePurchaseInvoice = async function (req, purchaseinvoice) {
        console.log("purchaseinvoice:",purchaseinvoice);
        try {
                var sp_text = "SET @out_id = 0; call spc_purchaseinvoice_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        purchaseinvoice["id"] != null ? parseInt(purchaseinvoice.id) : null,
                        purchaseinvoice.invoicedate,
			purchaseinvoice.postingdate,
			purchaseinvoice.duedate,
                        purchaseinvoice.purchaseinvoiceno,
                        parseInt(purchaseinvoice.vendorid),
			purchaseinvoice.isservice,
                        purchaseinvoice.grpono,
			purchaseinvoice.purchaseorderid,
                        purchaseinvoice["serviceno"] != null ? parseInt(purchaseinvoice.serviceno) : null,
                        purchaseinvoice.subject,
                        purchaseinvoice.referenceno,
                        purchaseinvoice.referencedate ,
                        purchaseinvoice["creditperiod"] != null ?parseFloat(purchaseinvoice.creditperiod): null,
                        parseFloat(purchaseinvoice.nettotal),
                        purchaseinvoice["discount"] != null ?parseFloat(purchaseinvoice.discount): null,
                        parseFloat(purchaseinvoice.taxtotal),
                        purchaseinvoice["frieght"] != null ? parseFloat(purchaseinvoice.frieght) : null,
                        parseFloat(purchaseinvoice.subtotal),
                        purchaseinvoice.remark,
                        purchaseinvoice["transactiontypeid"] != null ?parseFloat(purchaseinvoice.transactiontypeid): null,
                        parseInt(purchaseinvoice.deliveryfromaddressid),
                        parseInt(purchaseinvoice.deliverytowarehouseid),
			purchaseinvoice["towarehousebinid"] != null ?parseFloat(purchaseinvoice.towarehousebinid): null,
                        purchaseinvoice.deliveryfromstatecode,
                        purchaseinvoice.deliverytostatecode,
			purchaseinvoice["tdsid"] != null ? parseInt(purchaseinvoice.tdsid) : null,
			purchaseinvoice["tdsamount"] != null ? parseFloat(purchaseinvoice.tdsamount) : null,
			purchaseinvoice["tdsamount"] != null ? parseFloat(purchaseinvoice.tdsamount) : null,
                        parseInt(purchaseinvoice.companyid),
                        parseInt(purchaseinvoice.userid)   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("savePurchaseInvoice.service-savePurchaseInvoice", err);
        }
        return null;
    };
    
    this.deletePurchaseInvoice = async function (req, purchaseinvoice) {
console.log("***********purchaseinvoice***************",purchaseinvoice.id);
        try {
                return await pool.query(req, "call spc_purchaseinvoice_delete(?)",                       
                    [
                        parseInt(purchaseinvoice.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseinvoice.service-deletePurchaseInvoice", err);
        }
        return null;
    };

    this.getPurchaseInvoiceList = async function (req, purchaseinvoice) {
        try {
            return await pool.query(req, "call spc_purchaseinvoicelist_search(?,?)",
            [
                purchaseinvoice.from_date,
                purchaseinvoice.to_date,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseinvoice.service - getPurchaseInvoiceList", err);
        } 
        return null;
    };
  

};
    
module.exports =purchaseinvoiceRepository;