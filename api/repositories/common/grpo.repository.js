let grpoRepository = function (pool, log) {
   
    //material GRPO entries by request id
    this.getGrpoByRequestId = async function(req, Grpo){
        try {
            return await pool.query(req, "call spc_grpo_bypurchaserequestid(?,?)",                       
                [
                    parseInt(Grpo.requestid),
                    parseInt(Grpo.companyid)                      
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("grpo.repository - getGrpoByRequestId", err);
        }
        return null;
    };

    //get PO of whose GRPO are not available
    this.getPurchaseOrderWithoutGrpo = async function(req, Grpo){
        try {
            return await pool.query(req, "call spc_purchaseorderwithoutgrpo_search(?)",                       
                [
                    parseInt(Grpo.companyid)                      
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("grpo.repository - getPurchaseOrderWithoutGrpo", err);
        }
        return null;
    };

       //get PO of whose GRPO are not available
       this.getPurchaseOrderWithoutGrpobymoduleid = async function(req, Grpo){
        try {
            return await pool.query(req, "call spc_purchaseorderWithoutgrpo_bymodueid(?,?)",                       
                [   Grpo.moduleid,
                    parseInt(Grpo.companyid)                      
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("grpo.repository - getPurchaseOrderWithoutGrpo", err);
        }
        return null;
    };

    // get all GRPO
    this.getAllGRPO = async function (req, Grpo) {
        try {
            return await pool.query(req, "call spc_grpo_search(?)",
            [
                Grpo.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Grpo.service - getAllGRPO", err);
        } 
        return null;
    };

    // get GRPO for edit
    this.getGRPO = async function (req, Grpo) {
        console.log("Grpo : ",Grpo);
        try {
            return await pool.query(req, "call spc_grpo_select(?)",
            [
                Grpo.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Grpo.service - getGRPO", err);
        }
    
        return null;
    };    
  
    // save GRPO
    this.saveGRPO = async function (req, Grpo) {
        console.log("servicepoid",Grpo)
        try {
                var sp_text = "SET @out_id = 0; call spc_grpo_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Grpo["id"] != null ? parseInt(Grpo.id) : null,
                        Grpo.grpono,
                        Grpo.grpodate,
                        parseInt(Grpo.supplierid),
                        Grpo.referenceno,
                        // Grpo["referenceno"] != null ? parseInt(Grpo.referenceno) : null,
                        Grpo.referencedate,
                        Grpo["purchaseorderid"] != null ? parseInt(Grpo.purchaseorderid) : null,
                        Grpo.purchaseorderdate,
                        parseInt(Grpo.modeoftransfer),
                        Grpo.vehiclenumber,
                        Grpo.subject,
                        Grpo.remark,
                        parseInt(Grpo.towarehouseid),
                        parseInt(Grpo.towarehousebinid),
                        parseFloat(Grpo.discount),
                        parseInt(Grpo.statusid),
                         Grpo["servicepoid"] != null ? parseInt(Grpo.servicepoid) : null,
                        Grpo["isservice"] != null ? (Grpo.isservice) : null,
                        Grpo["ackid"] != null ? parseInt(Grpo.ackid) : null,
                        parseInt(Grpo.companyid),
                        parseInt(Grpo.userid),
                        

                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Grpo.service-saveGRPO", err);
        }
        return null;
    };

    // // delete GRPO     
    this.deleteGRPO = async function (req, Grpo) {
        try {
                return await pool.query(req, "call spc_grpo_delete(?)",                       
                    [
                        parseInt(Grpo.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Grpo.service-deleteGRPO", err);
        }
        return null;
    }

    this.getgrposearchbystatus = async function (req, Grpo) {
        try {
            return await pool.query(req, "call spc_grpo_searchbystatus(?)",
            [
                // Grpo.statusid,
                Grpo.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Grpo.service - getgrposearchbystatus", err);
        } 
        return null;
    }

    this.getgrpodetailsbygrpoid = async function (req, Grpo) {
        try {
            return await pool.query(req, "call spc_grndetails_bygrpoid(?,?)",
            [
                Grpo.id,
             	Grpo.isservice   
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Grpo.service - getgrpodetailsbygrpoid", err);
        } 
        return null;
    }

    // get chicks mortality for edit
    this.getChicksMortality = async function (req, Mortality) {
        console.log("Mortality : ",Mortality);
        try {
            return await pool.query(req, "call spc_chicksmortality_select(?)",
            [
                Mortality.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Grpo.service - getChicksMortality", err);
        }
    
        return null;
    };    
  
    // save chicks mortalty
    this.saveChicksMortality = async function (req, Mortality) {
        try {
                var sp_text = "SET @out_id = 0; call spc_chicksmortality_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Mortality["id"] != null ? parseInt(Mortality.id) : null,
                        Mortality["grpono"] != null ? parseInt(Mortality.grpono) : null,
                        Mortality["itemid"] != null ? parseInt(Mortality.itemid) : null,
                        Mortality["culls"] != null ? parseInt(Mortality.culls) : null,
                        Mortality["mortality"] != null ? parseInt(Mortality.mortality) : null,
                        Mortality["shortage"] != null ? parseInt(Mortality.shortage) : null,
                        Mortality["freeqty"] != null ? parseInt(Mortality.freeqty) : null,
                        Mortality["companyid"] != null ? parseInt(Mortality.companyid) : null,
                        Mortality["userid"] != null ? parseInt(Mortality.userid) : null
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Grpo.service-saveChicksMortality", err);
        }
        return null;
    };

        // save Layer chicks mortalty
        this.saveLayerChicksMortality = async function (req, Mortality) {
            try {
                    var sp_text = "SET @out_id = 0; call spc_layerchicksmortality_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                    return await pool.query(req, sp_text,                       
                        [
                            Mortality["id"] != null ? parseInt(Mortality.id) : null,
                            Mortality["grpono"] != null ? parseInt(Mortality.grpono) : null,
                            Mortality["itemid"] != null ? parseInt(Mortality.itemid) : null,
                            Mortality["culls"] != null ? parseInt(Mortality.culls) : null,
                            Mortality["mortality"] != null ? parseInt(Mortality.mortality) : null,
                            Mortality["shortage"] != null ? parseInt(Mortality.shortage) : null,
                            Mortality["freeqty"] != null ? parseInt(Mortality.freeqty) : null,
                            Mortality["companyid"] != null ? parseInt(Mortality.companyid) : null,
                            Mortality["userid"] != null ? parseInt(Mortality.userid) : null
                        ]);
            }
            catch (err) {
                console.log('Error thrown : ', err);
                log.dbErrorLog("Grpo.service-saveChicksMortality", err);
            }
            return null;
        };

        this.getGRPOList = async function (req, Grpo) {
            console.log("Grpo : ",Grpo);
            try {
                return await pool.query(req, "call spc_grpolist_search(?,?)",
                [
                    Grpo.fromdate,
                    Grpo.todate,
                ]);
            }
            catch (err) {
                console.log('Error thrown : ', err);
                log.dbErrorLog("Grpo.service - getGRPO", err);
            }
        
            return null;
        };
    

		// save saveInvoiceByGrpo
	this.saveInvoiceByGrpo= async function (req, Grpo) {
        try {
                var sp_text = "SET @out_id = 0; call spc_purchaseinvoice_bygrpoid(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Grpo["id"] != null ? parseInt(Grpo.id) : null,
                        Grpo.invoicedate,
                        Grpo.postingdate,
                        Grpo.duedate,
                        parseInt(Grpo.vendorid),
			parseInt(Grpo.grpono),
                        parseInt(Grpo.purchaseorderid),
                        Grpo.subject,
                        Grpo.referenceno,
                        Grpo.referencedate,
			Grpo.creditperiod,
                        Grpo.nettotal,
			Grpo.discount,
                        Grpo.taxtotal,
                        Grpo.freight,
                        Grpo.remark,
                        parseInt(Grpo.transactiontypeid),
                        parseInt(Grpo.companyid),
                        parseInt(Grpo.userid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Grpo.service-saveInvoiceByGrpo", err);
        }
        return null;
    };

    

    
};

    
module.exports = grpoRepository;