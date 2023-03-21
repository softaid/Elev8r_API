let manageUserRepository = function (pool, log) {
    
    this.searchUser = async function (req,User) {
        try {
            return await pool.query(req, "call spc_user_search(?)",
            [
                User.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ManageUser.service - searchUser", err);
        } 
        return null;
    };    

    this.getUser = async function (req,User) {
        try {
            return await pool.query(req, "call spc_user_select(?,?)",
            [
                User.id,
                User.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ManageUser.service - getUser", err);
        }
    
        return null;
    };    

    this.getUserPermissions = async function (req,User) {
        try {

            console.log('spc_user_permissions', User);

            return await pool.query(req, "call spc_user_permissions(?,?)",
            [
                User.userid,
                User.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ManageUser.service - getUser", err);
        }
    
        return null;
    }; 

    this.saveUser = async function (req, User) {
        try {
                var sp_text = "SET @out_id = 0; call spc_user_save(?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req,  sp_text,                       
                    [
                        User["id"] != null ? parseInt(User.id) : null,
                        User.username,       
                        User.mobile,       
                        User.imei,       
                        User.email,       
                        User.pwd,       
                        User.active,       
                        User.locked,       
                        parseInt(User.userid),
                        User.companyid              
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ManageUser.service-saveUser", err);
        }
        return null;
    }

    this.deleteUser = async function (req, User) {
        try {
                return await pool.query(req,"call spc_user_delete(?)",                       
                    [
                        parseInt(User.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ManageUser.service-deleteUser", err);
        }
        return null;
    }
   
};
    
module.exports = manageUserRepository;