let purchaseOrderDetailRepository = function (pool, log) {
    
     // get all GrpoDetail
     this.getAllPurchaseorderDetail = async function (req, PurchaseOrderDetail) {
         console.log("PurchaseOrderDetail : ",PurchaseOrderDetail)
        try {
            return await pool.query(req, "call spc_purchaseorderdetail_search(?,?)",
            [
                PurchaseOrderDetail.purchaseorderid,
                PurchaseOrderDetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("PurchaseOrderDetail.service - getAllPurchaseorderDetail", err);
        } 
        return null;
    };


   // save purchase order detail
    this.savePurchaseOrderDetail = async function (req, purchaseorderdetail) {
        console.log("purchaseorderdetail : ",purchaseorderdetail);
        try {
                var sp_text = "SET @out_id = 0; call spc_purchaseorderdetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        purchaseorderdetail["id"] != null ? parseInt(purchaseorderdetail.id) : null,
                        parseInt(purchaseorderdetail.purchaseorderid),
                        parseInt(purchaseorderdetail.itemid),
                        purchaseorderdetail["chicksageindays"] != null ? parseInt(purchaseorderdetail.chicksageindays) : null,
                        parseFloat(purchaseorderdetail.quantity),
			purchaseorderdetail["weight"] != null ? parseInt(purchaseorderdetail.weight) : null,
                        purchaseorderdetail["freequantitypercent"] != null ? parseFloat(purchaseorderdetail.freequantitypercent) : null,
                        parseInt(purchaseorderdetail.itemunitid),
                        parseFloat(purchaseorderdetail.unitcost),
                        parseFloat(purchaseorderdetail.itemdiscount),
                        purchaseorderdetail["taxid"] != null ? parseInt(purchaseorderdetail.taxid) : null,
                        purchaseorderdetail["taxpercent"] != null ? parseFloat(purchaseorderdetail.taxpercent) : null,
                        purchaseorderdetail["cgstid"] != null ? parseInt(purchaseorderdetail.cgstid) : null,
                        purchaseorderdetail["cgstpercent"] != null ? parseFloat(purchaseorderdetail.cgstpercent) : null,
                        purchaseorderdetail["cgstamount"] != null ? parseFloat(purchaseorderdetail.cgstamount) : null,
                        purchaseorderdetail["sgstid"] != null ? parseInt(purchaseorderdetail.sgstid) : null,
                        purchaseorderdetail["sgstpercent"] != null ? parseFloat(purchaseorderdetail.sgstpercent) : null,
                        purchaseorderdetail["sgstamount"] != null ? parseFloat(purchaseorderdetail.sgstamount) : null,
                        purchaseorderdetail["igstid"] != null ? parseInt(purchaseorderdetail.igstid) : null,
                        purchaseorderdetail["igstpercent"] != null ? parseFloat(purchaseorderdetail.igstpercent) : null,
                        purchaseorderdetail["igstamount"] != null ? parseFloat(purchaseorderdetail.igstamount) : null,
                        purchaseorderdetail["ugstid"] != null ? parseInt(purchaseorderdetail.ugstid) : null,
                        purchaseorderdetail["utgstpercent"] != null ? parseFloat(purchaseorderdetail.utgstpercent) : null,
                        purchaseorderdetail["utgstamount"] != null ? parseFloat(purchaseorderdetail.utgstamount) : null,
                        purchaseorderdetail["vatid"] != null ? parseInt(purchaseorderdetail.vatid) : null,
                        purchaseorderdetail["vatpercent"] != null ? parseFloat(purchaseorderdetail.vatpercent) : null,
                        purchaseorderdetail["vatamount"] != null ? parseFloat(purchaseorderdetail.vatamount) : null,
                        parseInt(purchaseorderdetail.companyid),
                        parseInt(purchaseorderdetail.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseorder.service-savePurchaseOrderDetail", err);
        }
        return null;
    };

    //get items by poid
    this.getItemsByPoid = async function (req, PurchaseOrderDetail) {
        console.log("PurchaseOrderDetail : ",PurchaseOrderDetail)
       try {
           return await pool.query(req, "call spc_poitem_bypoid(?,?)",
           [
               PurchaseOrderDetail.purchaseorderid,
               PurchaseOrderDetail.companyid
           ]);
       }
       catch (err) {
           console.log('Error thrown : ', err);
           log.dbErrorLog("PurchaseOrderDetail.service - getItemsByPoid", err);
       } 
       return null;
   };

   //  get Purchaserequestdetails byrequestids
    
    this.getPurchaserequestdetailsByrequestids = async function (req, PurchaseOrderDetail) {
        console.log("PurchaseOrderDetail : ",PurchaseOrderDetail)
        try {
            return await pool.query(req, "call spc_getPurchaserequestdetails_byrequestids(?,?)",
            [
                PurchaseOrderDetail.purchaserequestids,
                PurchaseOrderDetail.taxcategoryid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("PurchaseOrderDetail.service - getPurchaserequestdetailsByrequestids", err);
        } 
        return null;
    };


};
    
module.exports = purchaseOrderDetailRepository;