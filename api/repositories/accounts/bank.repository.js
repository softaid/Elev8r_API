let bankRepository = function (pool, log) {
    
    this.getAllBank = async function (req, Bank) {
        console.log("Bank : ",Bank);
        try {
            return await pool.query(req, "call spc_bank_search(?)",
            [
                Bank.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Bank.repository - getAllBank", err);
        } 
        return null;
    };    

    this.getBank = async function (req, Bank) {
        try {
            return await pool.query(req, "call spc_bank_select(?)",
            [
                Bank.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Bank.repository - getBank", err);
        }
    
        return null;
    };    

    this.saveBank = async function (req, Bank) {
        try {
                var sp_text = "SET @out_id = 0; call spc_bank_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Bank["id"] != null ? parseInt(Bank.id) : null,
                        Bank.bankname,
                        Bank.microcode,
                        Bank.ifsccode,
                        Bank.address,
                        Bank.phoneno,
                        Bank.inactiveinyear,
                        parseInt(Bank.accounttypeid), 
                        parseInt(Bank.accountledgerid),
                        Bank.accountno,
                        Bank.relationshipmanager,
                        Bank.managercontactno,
                        parseInt(Bank.companyid),
                        parseInt(Bank.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Bank.repository - saveBank", err);
        }
        return null;
    };

    this.deleteBank = async function (req, Bank) {
        try {
                return await pool.query(req, "call spc_bank_delete(?)",                       
                    [
                        parseInt(Bank.id)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Bank.repository - deleteBank", err);
        }
        return null;
    };
};
    
module.exports = bankRepository;