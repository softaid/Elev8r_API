let userRepository = function (pool, log) {

    this.getUser = async function (req, Login) {
        try {
            return await pool.query(req, "call spc_user_search(?)",
                [
                  
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("user.service - getUser", err);
        }

        return null;
    };    
};

module.exports = userRepository;