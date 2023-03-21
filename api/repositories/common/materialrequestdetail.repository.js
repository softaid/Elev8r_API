let materialrequestdetailRepository = function (pool, log) {
    
    // get Material request details corresponding to request id
    this.getMaterialRequestDetailsFromRequest = async function (req, materialrequestdetail) {
        console.log("materialrequestdetail : ",materialrequestdetail);
        try {
            return await pool.query(req, "call spc_materialrequestdetail_search(?)",
            [
                materialrequestdetail.materialrequestid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialrequestdetail.service - getMaterialRequestDetailsFromRequest", err);
        } 
        return null;
    };

    // get Material request for edit
    this.getMaterialRequestDetail = async function (req, materialrequestdetail) {
        try {
            return await pool.query(req, "call spc_materialrequestdetail_select(?)",
            [
                materialrequestdetail.id
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialrequestdetail.service - getMaterialRequestDetail", err);
        }
    
        return null;
    };    
  
    // save breeder schedule
    this.saveMaterialRequestDetail = async function (req, materialrequestdetail) {
        console.log("materialrequestdetail : ",materialrequestdetail);
        try {
                var sp_text = "SET @out_id = 0; call spc_materialrequestdetail_save(?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        materialrequestdetail["id"] != null ? parseInt(materialrequestdetail.id) : null,
                        parseInt(materialrequestdetail.materialrequestid),
                        parseInt(materialrequestdetail.itemid),
                        materialrequestdetail.itemname,
                        parseInt(materialrequestdetail.quantity),
                        materialrequestdetail["unitid"] != null ? parseInt(materialrequestdetail.unitid) : null,
                        parseInt(materialrequestdetail.companyid),
                        parseInt(materialrequestdetail.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialrequestdetail.service-saveMaterialRequestDetail", err);
        }
        return null;
    };

    // delete Breeder Schedule     
    this.deleteMaterialRequestDetail = async function (req, materialrequestdetail) {
        try {
            return await pool.query(req, "call spc_materialrequestdetail_delete(?)",                       
                [
                    parseInt(materialrequestdetail.id),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialrequestdetail.service-deleteMaterialRequestDetail", err);
        }
        return null;
    };

};
    
module.exports = materialrequestdetailRepository;