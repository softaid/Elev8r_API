let roleAccessRepository = function (pool, log) {
    
    this.searchRoleAccess = async function (req, RoleAccess) {
        try {

            console.log('RoleAccess ==== : ', RoleAccess);

            return await pool.query(req, "call spc_entity_searchbyrole(?)", [
                RoleAccess.roleid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("RoleAccess.service - searchRoleAccess", err);
        } 
        return null;
    };    

    this.getPermissions = async function (req, ) {
        try {
            return await pool.query(req, "call spc_permission_ddl()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("RoleAccess.service - getPermissions", err);
        } 
        return null;
    };    

    this.getRoles = async function (req, ) {
        try {
            return await pool.query(req, "call spc_role_ddl()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("RoleAccess.service - getRoles", err);
        } 
        return null;
    };    

    // this.getRoleAccess = async function (req, RoleAccess) {
    //     try {

    //         console.log('==== RoleAccess ==== : ', RoleAccess);

    //         return await pool.query(req, "call spc_RoleAccess_select(?,?)",
    //         [
    //             RoleAccess.id,
    //             RoleAccess.companyid
    //         ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageRoleAccess.service - getRoleAccess", err);
    //     }
    
    //     return null;
    // };    

    // this.saveRoleAccess = async function (req, RoleAccess) {
    //     try {
    //             var sp_text = "SET @out_id = 0; call spc_RoleAccess_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
    //             return await pool.query(req, sp_text,                       
    //                 [
    //                     RoleAccess["id"] != null ? parseInt(RoleAccess.id) : null,
    //                     RoleAccess.RoleAccessname,       
    //                     RoleAccess.mobile,       
    //                     RoleAccess.imei,       
    //                     RoleAccess.pwd,       
    //                     RoleAccess.active,       
    //                     RoleAccess.locked,       
    //                     parseInt(RoleAccess.RoleAccessid),
    //                     RoleAccess.companyid              
    //                 ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageRoleAccess.service-saveRoleAccess", err);
    //     }
    //     return null;
    // }

    // this.deleteRoleAccess = async function (req, RoleAccess) {
    //     try {
    //             return await pool.query(req, "call spc_RoleAccess_delete(?)",                       
    //                 [
    //                     parseInt(RoleAccess.id)
    //                 ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageRoleAccess.service-deleteRoleAccess", err);
    //     }
    //     return null;
    // }
   
};
    
module.exports = roleAccessRepository;