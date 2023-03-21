let purchaseOrderRepository = function (pool, log) {
    
    // get all purchaseorder
    this.getAllPurchaseOrder = async function (req, purchaseorder) {
        try {
            return await pool.query(req, "call spc_purchaseorder_search(?)",
            [
                purchaseorder.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseorder.service - getAllPurchaseOrder", err);
        } 
        return null;
    };

     // get all purchaseorder
     this.getPurchaseOrderReport = async function (req, purchaseorder) {
        try {
            return await pool.query(req, "call spc_purchaseorder_report(?,?,?)",
            [
                purchaseorder.fromdate,
                purchaseorder.todate,
                purchaseorder.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseorder.service - getPurchaseOrderReport", err);
        } 
        return null;
    };


    // get purchaseorder for edit
    this.getPurchaseOrder = async function (req, purchaseorder) {
        try {
            return await pool.query(req, "call spc_purchaseorder_select(?)",
            [
                purchaseorder.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseorder.service - getPurchaseOrder", err);
        }
    
        return null;
    };    
  
     // save PurchaseOrder
    this.savePurchaseOrder = async function (req, purchaseorder) {
        console.log("purchaseorder:",purchaseorder);
        try {
                var sp_text = "SET @out_id = 0; call spc_purchaseorder_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        purchaseorder["id"] != null ? parseInt(purchaseorder.id) : null,
                        parseInt(purchaseorder.vendorid ),
                        purchaseorder.purchaserequestid,
                        (purchaseorder.purchaseorderno ),
                        purchaseorder.podate,
                        purchaseorder.deliverydate ,
                        purchaseorder["discount"] != null ?parseFloat(purchaseorder.discount): null,
                        purchaseorder.remark,
                        parseInt(purchaseorder.statusid),
                        purchaseorder.shipfromwarehouseid,
                        purchaseorder.transactiontypeid,
                        parseInt(purchaseorder.deliveryfromaddressid),
                        parseInt(purchaseorder.deliverytowarehouseid),
                        purchaseorder.deliveryfromstatecode,
                        purchaseorder.deliverytostatecode,
                        purchaseorder["moduleid"] != null ? parseInt(purchaseorder.moduleid) : null,
                        parseInt(purchaseorder.createdbyname), 
                        parseInt(purchaseorder.approvedbyname),
                        parseInt(purchaseorder.companyid),
                        parseInt(purchaseorder.userid),   
                    ]);
        }

        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("PurchaseOrder.service-savePurchaseOrder", err);
        }
        return null;
    };

    // // delete PurchaseRequest     
    this.deletePurchaseOrder = async function (req, PurchaseOrder) {
        try {
                return await pool.query(req, "call spc_purchaseorder_delete(?)",                       
                    [
                        parseInt(PurchaseOrder.id),
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseorder.service-deletePurchaseOrder", err);
        }
        return null;
    };

    this.getPartyAddressespo = async function (req, purchaseorder) {
        try {
            return await pool.query(req, "call spc_partyaddress_bypartyidpo(?,?)",
            [
                purchaseorder.partyid,
                purchaseorder.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseorder.service - getPartyAddressespo", err);
        } 
        return null;
    };

    // get po details by poid 
    
    this.getpodetailsbypoid = async function (req, purchaseorder) {
        try {
            return await pool.query(req, "call spc_podetails_bypoid(?,?)",
            [
                purchaseorder.id,
             	purchaseorder.isservice   
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseorder.service - getpodetailsbypoid ", err);
        } 
        return null;
    }


    //get all suppliers
    // this.getAllPartnerRole = async function (req, PurchaseOrder) {
    //     try {
    //         return await pool.query(req, "call spc_purchaseorder_search(?)",
    //         [
    //             PurchaseOrder.companyid,
    //         ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("purchaseorder.service - getAllPartnerRole", err);
    //     } 
    //     return null;
    // };

     // get purchase order list
     this.getPurchaseOrderList = async function (req, purchaseorder) {
        try {
            return await pool.query(req, "call spc_purchaseorderlist_search(?,?,?,?)",
            [
                purchaseorder.module_type,
                purchaseorder.from_date,
                purchaseorder.to_date,
                purchaseorder.supplier,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaseorder.service - getPurchaseOrderList", err);
        } 
        return null;
    };
};
    
module.exports = purchaseOrderRepository;