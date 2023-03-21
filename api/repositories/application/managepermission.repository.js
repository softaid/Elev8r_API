let managePermissionRepository = function (pool, log) {
    
    this.searchManagePermission = async function (req, ManagePermission) {
        try {

            console.log('ManagePermission ==== : ', ManagePermission);

            return await pool.query(req, "call spc_permission_search()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ManagePermission.service - searchManagePermission", err);
        } 
        return null;
    };    


    // this.getManagePermission = async function (req, ManagePermission) {
    //     try {

    //         console.log('==== ManagePermission ==== : ', ManagePermission);

    //         return await pool.query(req, "call spc_ManagePermission_select(?,?)",
    //         [
    //             ManagePermission.id,
    //             ManagePermission.companyid
    //         ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageManagePermission.service - getManagePermission", err);
    //     }
    
    //     return null;
    // };    

    // this.saveManagePermission = async function (req, ManagePermission) {
    //     try {
    //             var sp_text = "SET @out_id = 0; call spc_ManagePermission_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
    //             return await pool.query(req, sp_text,                       
    //                 [
    //                     ManagePermission["id"] != null ? parseInt(ManagePermission.id) : null,
    //                     ManagePermission.ManagePermissionname,       
    //                     ManagePermission.mobile,       
    //                     ManagePermission.imei,       
    //                     ManagePermission.pwd,       
    //                     ManagePermission.active,       
    //                     ManagePermission.locked,       
    //                     parseInt(ManagePermission.ManagePermissionid),
    //                     ManagePermission.companyid              
    //                 ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageManagePermission.service-saveManagePermission", err);
    //     }
    //     return null;
    // }

    // this.deleteManagePermission = async function (req, ManagePermission) {
    //     try {
    //             return await pool.query(req, "call spc_ManagePermission_delete(?)",                       
    //                 [
    //                     parseInt(ManagePermission.id)
    //                 ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageManagePermission.service-deleteManagePermission", err);
    //     }
    //     return null;
    // }
   
};
    
module.exports = managePermissionRepository;