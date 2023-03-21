let materialrequestRepository = function (pool, log) {
    
    // get all material requests
    this.getAllMaterialRequests = async function (req, materialrequest) {
        console.log(materialrequest)
        try {
            return await pool.query(req, "call spc_materialrequest_search(?)",
            [
                materialrequest.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialrequest.service - getAllMaterialRequests", err);
        } 
        return null;
    };

     // get all material requests by companyid
     this.getMaterialRequestByCompanyid = async function (req, materialrequest) {
        console.log(materialrequest)
        try {
            return await pool.query(req, "call spc_materialrequest_bycompanyid(?)",
            [
                materialrequest.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialrequest.service - getMaterialRequestByCompanyid", err);
        } 
        return null;
    };

    // get material requests for edit
    this.getMaterialRequest = async function (req, materialrequest) {
        console.log("materialrequest : ",materialrequest);
        try {
            var materialRequest =  await pool.query(req, "call spc_materialrequest_select(?)",
            [
                materialrequest.id,
            ]);
            var materialRequestDtail =  await pool.query(req, "call spc_materialrequestdetail_select(?)",
            [
                materialrequest.id,
            ]);

            return {
                "materialRequest" : materialRequest,
                "materialRequestDtail" : materialRequestDtail
            };
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialrequest.service - getMaterialRequest", err);
        }
    
        return null;
    };    
  
    // save breeder schedule
    this.saveMaterialRequest = async function (req, materialrequest) {
        console.log("materialrequest : ",materialrequest);
        try {
                var sp_text = "SET @out_id = 0; call spc_materialrequest_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        materialrequest["id"] != null ? parseInt(materialrequest.id) : null,
                        parseInt(materialrequest.requestsource),
                        parseInt(materialrequest.requesttarget),
                        parseInt(materialrequest.statusid),
                        materialrequest.requestdate,
                        materialrequest.duedate,
                        materialrequest.remark,
                        parseInt(materialrequest.fromwarehouseid),
                        parseInt(materialrequest.fromwarehousebinid),
                        parseInt(materialrequest.towarehouseid),
                        parseInt(materialrequest.towarehousebinid),
                        materialrequest["tobatchid"] != null ? parseInt(materialrequest.tobatchid) : null,                   
                        parseInt(materialrequest.companyid),
                        parseInt(materialrequest.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialrequest.service-saveMaterialRequest", err);
        }
        return null;
    };

    // delete Breeder Schedule     
    this.deleteMaterialRequest = async function (req, materialrequest) {
        try {
            return await pool.query(req, "call spc_materialrequest_delete(?)",                       
                [
                    parseInt(materialrequest.id),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialrequest.service-deleteMaterialRequest", err);
        }
        return null;
    };

    //get batches by request target
    this.getBatchesByRequesTtarget = async function (req, materialrequest) {
        console.log("materialrequest : ",materialrequest)
        try {
            return await pool.query(req, "call spc_materialrequest_getbatchesbyrequesttarget(?,?)",
            [
                materialrequest.companyid,
                materialrequest.requesttarget
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialrequest.service - getBatchesByRequesTtarget", err);
        } 
        return null;
    };

};
    
module.exports = materialrequestRepository;