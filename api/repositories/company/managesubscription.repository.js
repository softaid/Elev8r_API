let manageSubscriptionRepository = function (pool, log) {
    
    this.activeLicenses = async function (req, Subscription) {
        try {

            return await pool.query(req, "call spc_companysubscription_activelicenses(?)",
            [
                Subscription.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("manageSubscription.service - activeLicenses", err);
        } 
        return null;
    };    

    this.userLicenses = async function (req, Subscription) {
        try {

            return await pool.query(req, "call spc_user_assignlicense(?)",
            [
                Subscription.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("manageSubscription.service - userLicenses", err);
        } 
        return null;
    };    

    this.userLicensesDdl = async function (req, Subscription) {
        try {
            console.log('Subscription Detail : ', Subscription);
            return await pool.query(req, "call spc_companysubscription_userlicenseDdl(?,?)",
            [
                Subscription.userid,
                Subscription.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("manageSubscription.service - userLicensesDdl", err);
        } 
        return null;
    };   

    this.saveUserLicenses = async function (req, User) {
        try {
                var sp_text = "SET @out_id = 0; call spc_userlicense_save(?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        User.userid,       
                        User.licenses              
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("manageSubscription.service-saveUserLicenses", err);
        }
        return null;
    }

    // this.deleteUser = async function (User) {
    //     try {
    //             return await pool.query(req, "call spc_user_delete(?)",                       
    //                 [
    //                     parseInt(User.id)
    //                 ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("ManageUser.service-deleteUser", err);
    //     }
    //     return null;
    // }
   
};
    
module.exports = manageSubscriptionRepository;