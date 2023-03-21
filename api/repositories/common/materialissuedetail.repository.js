let materialissuedetailRepository = function (pool, log) {
    
    // get all Material issue detail
    this.getAllMaterialIssueDetail = async function (req, materialissuedetail) {
        try {
            return await pool.query(req, "call spc_materialissuedetail_search(?)",
            [
                materialissuedetail.materialissueid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialissuedetail.service - getAllMaterialIssueDetail", err);
        } 
        return null;
    };

    // get Material issue detail for edit
    this.getMaterialIssueDetail = async function (req, materialissuedetail) {
        console.log("materialissuedetail : ",materialissuedetail);
        try {
            return await pool.query(req, "call spc_materialissuedetail_select(?,?)",
            [
                materialissuedetail.id,
                materialissuedetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialissuedetail.service - getMaterialIssueDetail", err);
        }
    
        return null;
    };    
  
    // save materialissuedetail
    this.saveMaterialIssueDetail = async function (req, materialissuedetail) {
        console.log("materialissuedetail : ",materialissuedetail);
        try {
                var sp_text = "SET @out_id = 0; call spc_materialissuedetail_save(?,?,?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        materialissuedetail["id"] != null ? parseInt(materialissuedetail.id) : null,
                        parseInt(materialissuedetail.materialissueid),
                        parseInt(materialissuedetail.itemid),
                        materialissuedetail.itemname,
                        parseInt(materialissuedetail.issuequantity),
                        parseFloat(materialissuedetail.unitcost),
                        parseFloat(materialissuedetail.totalcost),
                        parseInt(materialissuedetail.itemunitid),
                        materialissuedetail.itembatch,
                        parseInt(materialissuedetail.companyid),
                        parseInt(materialissuedetail.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialissuedetail.service-saveMaterialIssueDetail", err);
        }
        return null;
    };

    // delete materialissuedetail   
    this.deleteMaterialIssueDetail = async function (req, materialissuedetail) {
        try {
            return await pool.query(req, "call spc_materialissuedetail_delete(?)",                       
                [
                    parseInt(materialissuedetail.id),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialissuedetail.service-deleteMaterialIssueDetail", err);
        }
        return null;
    };

};
    
module.exports = materialissuedetailRepository;