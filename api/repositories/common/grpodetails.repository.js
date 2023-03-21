let grpoDetailRepository = function (pool, log) {

    // get all GrpoDetail
    this.getAllGRPODetail = async function (req, GrpoDetail) {
        try {
            return await pool.query(req, "call spc_grpodetail_search(?)",
            [
                GrpoDetail.grpoid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("GrpoDetail.service - getAllGRPODetail", err);
        } 
        return null;
    };

    // get GrpoDetail for edit
    this.getGRPODetail = async function (req, GrpoDetail) {
        console.log("GrpoDetail : ",GrpoDetail);
        try {
            return await pool.query(req, "call spc_grpodetail_select(?)",
            [
                GrpoDetail.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("GrpoDetail.service - getGRPODetail", err);
        }
    
        return null;
    };    
  
    // save GRPO
    this.saveGRPODetail = async function (req, GrpoDetail) {
        console.log("GrpoDetail : ",GrpoDetail);
        try {
                var sp_text = "SET @out_id = 0; call spc_grpodetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        GrpoDetail["id"] != null ? parseInt(GrpoDetail.id) : null,
                        parseInt(GrpoDetail.grpoid),
			GrpoDetail["purchaseorderdetailid"] != null ? parseInt(GrpoDetail.purchaseorderdetailid) : null,
                        parseInt(GrpoDetail.itemid),
                        GrpoDetail.itemname,
                        GrpoDetail.quantity,
			GrpoDetail.weight,
                        GrpoDetail.freequantity,
                        parseInt(GrpoDetail.itemunitid),
                        parseFloat(GrpoDetail.unitprice),
                        parseFloat(GrpoDetail.itemdiscount),
                        parseInt(GrpoDetail.taxpercent),
                        GrpoDetail["taxid"] != null ? parseInt(GrpoDetail.taxid) : null,
                        // parseInt(GrpoDetail.taxid),
                        GrpoDetail.remark,
                        parseInt(GrpoDetail.companyid),   
                        parseInt(GrpoDetail.userid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("GrpoDetail.service-saveGRPODetail", err);
        }
        return null;
    };

    // // delete GRPO     
    this.deleteGRPODetail = async function (req, GrpoDetail) {
        try {
                return await pool.query(req, "call spc_grpodetail_delete(?)",                       
                    [
                        parseInt(GrpoDetail.id),
                        parseInt(GrpoDetail.companyid),
                        parseInt(GrpoDetail.userid),
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("GrpoDetail.service-deleteGRPODetail", err);
        }
        return null;
    };

    // get grpo detail for servicepo
    this.getAllGRPODetailBySerPO= async function (req, GrpoDetail) {
        try {
            return await pool.query(req, "call spc_grpodetail_byservicepo_search(?)",
            [
                GrpoDetail.grpoid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("GrpoDetail.service - getAllGRPODetail", err);
        } 
        return null;
    };

    this.saveJE = async function (req, GrpoDetail) {
        try {
            return await pool.query(req, "call spc_savechiksreceived_je(?,?,?,?)",
            [
                GrpoDetail.grpoid,
                GrpoDetail.moduleid,
                GrpoDetail.companyid,
                GrpoDetail.userid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("GrpoDetail.service - saveJE", err);
        } 
        return null;
    };

    this.saveGRPOJE = async function (req, GrpoDetail) {
        try {
            return await pool.query(req, "call spc_savegrpo_je(?,?,?)",
            [
                GrpoDetail.grpoid,
                GrpoDetail.companyid,
                GrpoDetail.userid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("GrpoDetail.service - saveGRPOJE", err);
        } 
        return null;
    };
    

    

    // get grpo details by grpoids
    this.getGRPODetailByGRPOids= async function (req, GrpoDetail) {
        try {
            return await pool.query(req, "call spc_getGrpodetails_Bygrpoids(?)",
            [
                GrpoDetail.grpoid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("GrpoDetail.service - getGRPODetailByGRPOids", err);
        } 
        return null;
    };
};


    
module.exports = grpoDetailRepository;
