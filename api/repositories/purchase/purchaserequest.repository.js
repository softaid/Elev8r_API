let purchaseRequestRepository = function (pool, log) {
    //get all Hatcherbatchs
    
    this.getAllHatcherbatches = async function (req, PurchaseRequest) {
        console.log("PurchaseRequest : ",PurchaseRequest);
        try {
            return await pool.query(req, "call spc_hatcherbatch_search(?)",
            [
                PurchaseRequest.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service - getAllHatcherbatches", err);
        } 
        return null;
    };

    this.getAllBreederbatches = async function (req, PurchaseRequest) {
        console.log("PurchaseRequest : ",PurchaseRequest);
        try {
            return await pool.query(req, "call spc_breederbatch_search(?)",
            [
                PurchaseRequest.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service - getAllHatcherbatches", err);
        } 
        return null;
    };

    // get all PurchaseRequest
    this.getAllPurchaseRequest = async function (req, PurchaseRequest) {
        console.log("PurchaseRequest : ",PurchaseRequest);
        try {
            return await pool.query(req, "call spc_purchaserequest_search(?)",
            [
                PurchaseRequest.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service - getAllPurchaseRequest", err);
        } 
        return null;
    };

    // get PurchaseRequest for edit
    this.getPurchaseRequest = async function (req, PurchaseRequest) {
        console.log("PurchaseRequest : ",PurchaseRequest);
        try {
            return await pool.query(req, "call spc_purchaserequest_select(?)",
            [
                PurchaseRequest.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service - getPurchaseRequest", err);
        }
    
        return null;
    };    
  
    // save PurchaseRequest
    this.savePurchaseRequest = async function (req, PurchaseRequest) {
        try {
                var sp_text = "SET @out_id = 0; call spc_purchaserequest_save(?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        PurchaseRequest["id"] != null ? parseInt(PurchaseRequest.id) : null,
                        PurchaseRequest.purchaserequestno,
                        PurchaseRequest.requestsourceid,
                        PurchaseRequest.requestdate,
                        parseInt(PurchaseRequest.createdby),
                        parseInt(PurchaseRequest.approvedby),
                        PurchaseRequest.remark,
                        parseInt(PurchaseRequest.statusid),
                        PurchaseRequest["tobatchid"] != null ? parseInt(PurchaseRequest.tobatchid) : null,
                        PurchaseRequest["vendorid"] != null ? parseInt(PurchaseRequest.vendorid) : null,
                        PurchaseRequest.materialrequireddate,
                        parseInt(PurchaseRequest.companyid),
                        parseInt(PurchaseRequest.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service-savePurchaseRequest", err);
        }
        return null;
    };

    // // delete PurchaseRequest     
    this.deletePurchaseRequest = async function (req, PurchaseRequest) {
        try {
                return await pool.query(req, "call spc_purchaserequest_delete(?)",                       
                    [
                        parseInt(PurchaseRequest.id),
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service-deletePurchaseRequest", err);
        }
        return null;
    }

    // // get detail related to particular purchaserequest
    this.getAllPurchaseRequestDetail = async function (req, purchaserequestdetail) {
        
        try {
            return await pool.query(req, "call spc_purchaserequestdetail_searchbyrequestid(?,?)",
            [  
            
              purchaserequestdetail.purchaserequestid,
               purchaserequestdetail.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service - getAllPurchaseRequestDetail", err);
        }
    
        return null;
    };    
    // // get detail related to particular purchaserequest
    this.getAllPurchaseRequestbytaxcategory = async function (req, purchaserequestdetail) {
        
        try {
            return await pool.query(req, "call spc_purchaserequestdetail_searchbytaxcategory(?,?,?)",
            [  
            purchaserequestdetail.taxcategoryid,
            purchaserequestdetail.purchaserequestid,
            purchaserequestdetail.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service - getAllPurchaseRequestDetail", err);
        }

        return null;
    };    

    // // get getAllPurchaseRequestDetail for edit
    this.getPurchaseRequestDetail = async function (req, purchaserequestdetail) {
        try {
            return await pool.query(req, "call spc_purchaserequestdetail_select(?)",
            [
                purchaserequestdetail.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service - getPurchaseRequestDetail", err);
        }
    
        return null;
    };    

    // save purchase request detail
    this.savePurchaseRequestDetail = async function (req, purchaserequestdetail) {
        console.log("purchaserequestdetail : ",purchaserequestdetail);
        try {
                var sp_text = "SET @out_id = 0; call spc_purchaserequestdetail_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        purchaserequestdetail["id"] != null ? parseInt(purchaserequestdetail.id) : null,
                        purchaserequestdetail["purchaserequestid"] != null ? parseInt(purchaserequestdetail.purchaserequestid) : null,
                      
                        parseInt(purchaserequestdetail.itemid),
                        purchaserequestdetail.itemname,
                        parseFloat(purchaserequestdetail.quantity),
                        parseInt(purchaserequestdetail.unitid),
                        parseInt(purchaserequestdetail.itemstatusid),
                        parseInt(purchaserequestdetail.companyid),
                        parseInt(purchaserequestdetail.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service-savePurchaseRequestDetail", err);
        }
        return null;    
    }

    // delete purchaserequest detail
    this.deletePurchaseRequestDetail = async function (req, purchaserequestdetail) {
        try {
                return await pool.query(req, "call spc_purchaserequestdetail_delete(?)",                       
                    [
                        parseInt(purchaserequestdetail.id),
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service-deletePurchaseRequestDetail", err);
        }
        return null;
    }
    
    this.getPurchaseRequestList = async function (req, PurchaseRequest) {
        console.log("PurchaseRequest : ",PurchaseRequest);
        try {
            return await pool.query(req, "call spc_purchaserequestlist_search(?,?)",
            [
                PurchaseRequest.from_date,
                PurchaseRequest.to_date,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("purchaserequest.service - getPurchaseRequest", err);
        }
    
        return null;
    };


    

};
    
module.exports = purchaseRequestRepository;