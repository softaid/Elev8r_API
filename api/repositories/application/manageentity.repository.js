let manageEntityRepository = function (pool, log) {
    
    this.searchManageEntity = async function (req, ManageEntity) {
        try {

            console.log('ManageEntity ==== : ', ManageEntity);

            return await pool.query(req, "call spc_entity_search()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ManageEntity.service - searchManageEntity", err);
        } 
        return null;
    };    

    this.searchManageEntityByRole = async function (req, ManageEntity) {
        try {
            console.log('ManageEntity ==== : ', ManageEntity);

            return await pool.query(req, "call spc_entity_searchbyrole(?)", [
                ManageEntity.roleid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ManageEntity.service - searchManageEntityByRole", err);
        } 
        return null;
    }; 

    this.searchManageEntityByUser = async function (req, ManageEntity) {
        try {
            console.log('ManageEntity ==== : ', ManageEntity);

            return await pool.query(req, "call spc_entity_searchbyuserrole(?)", [
                ManageEntity.userid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ManageEntity.service - searchManageEntityByUser", err);
        } 
        return null;
    }; 

    // this.getManageEntity = async function (req, ManageEntity) {
    //     try {

    //         console.log('==== ManageEntity ==== : ', ManageEntity);

    //         return await pool.query(req, "call spc_ManageEntity_select(?,?)",
    //         [
    //             ManageEntity.id,
    //             ManageEntity.companyid
    //         ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageManageEntity.service - getManageEntity", err);
    //     }
    
    //     return null;
    // };    

    // this.saveManageEntity = async function (req, ManageEntity) {
    //     try {
    //             var sp_text = "SET @out_id = 0; call spc_ManageEntity_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
    //             return await pool.query(req, sp_text,                       
    //                 [
    //                     ManageEntity["id"] != null ? parseInt(ManageEntity.id) : null,
    //                     ManageEntity.ManageEntityname,       
    //                     ManageEntity.mobile,       
    //                     ManageEntity.imei,       
    //                     ManageEntity.pwd,       
    //                     ManageEntity.active,       
    //                     ManageEntity.locked,       
    //                     parseInt(ManageEntity.ManageEntityid),
    //                     ManageEntity.companyid              
    //                 ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageManageEntity.service-saveManageEntity", err);
    //     }
    //     return null;
    // }

    // this.deleteManageEntity = async function (req, ManageEntity) {
    //     try {
    //             return await pool.query(req, "call spc_ManageEntity_delete(?)",                       
    //                 [
    //                     parseInt(ManageEntity.id)
    //                 ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageManageEntity.service-deleteManageEntity", err);
    //     }
    //     return null;
    // }
   
};
    
module.exports = manageEntityRepository;