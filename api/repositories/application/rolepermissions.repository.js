let RolePermissionsRepository = function (pool, log) {
    
    this.searchRolePermissions = async function (req, RolePermissions) {
        try {

            console.log('RolePermissions ==== : ', RolePermissions);

            return await pool.query(req, "call spc_entity_searchbyrole(?)", [
                RolePermissions.roleid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("RolePermissions.service - searchRolePermissions", err);
        } 
        return null;
    };    

    this.getPermissions = async function (req, ) {
        try {
            return await pool.query(req, "call spc_permission_ddl()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("RolePermissions.service - getPermissions", err);
        } 
        return null;
    };    

    this.getRoles = async function (req, ) {
        try {
            return await pool.query(req, "call spc_role_ddl()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("RolePermissions.service - getRoles", err);
        } 
        return null;
    };    

    // this.getRolePermissions = async function (req, RolePermissions) {
    //     try {

    //         console.log('==== RolePermissions ==== : ', RolePermissions);

    //         return await pool.query(req, "call spc_RolePermissions_select(?,?)",
    //         [
    //             RolePermissions.id,
    //             RolePermissions.companyid
    //         ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageRolePermissions.service - getRolePermissions", err);
    //     }
    
    //     return null;
    // };    

    // this.saveRolePermissions = async function (req, RolePermissions) {
    //     try {
    //             var sp_text = "SET @out_id = 0; call spc_RolePermissions_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
    //             return await pool.query(req, sp_text,                       
    //                 [
    //                     RolePermissions["id"] != null ? parseInt(RolePermissions.id) : null,
    //                     RolePermissions.RolePermissionsname,       
    //                     RolePermissions.mobile,       
    //                     RolePermissions.imei,       
    //                     RolePermissions.pwd,       
    //                     RolePermissions.active,       
    //                     RolePermissions.locked,       
    //                     parseInt(RolePermissions.RolePermissionsid),
    //                     RolePermissions.companyid              
    //                 ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageRolePermissions.service-saveRolePermissions", err);
    //     }
    //     return null;
    // }

    // this.deleteRolePermissions = async function (req, RolePermissions) {
    //     try {
    //             return await pool.query(req, "call spc_RolePermissions_delete(?)",                       
    //                 [
    //                     parseInt(RolePermissions.id)
    //                 ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageRolePermissions.service-deleteRolePermissions", err);
    //     }
    //     return null;
    // }
   
};
    
module.exports = RolePermissionsRepository;