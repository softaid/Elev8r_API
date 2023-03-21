let itemhsnRepository = function (pool, log) {
    
    this.getAllItemHSN = async function (req, itemhsn) {
        try {
            return await pool.query(req, "call spc_hsnmaster_search(?)",
            [
                itemhsn.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("itemhsn.service - getAllItemHSN", err);
        } 
        return null;
    };    

    this.getHSNList = async function (req, itemhsn) {
        try {
            return await pool.query(req, "call spc_hsnmaster_ddl(?)",
            [
                itemhsn.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("itemhsn.service - getAllItemHSN", err);
        } 
        return null;
    };  

    this.getItemHSN = async function (req, itemhsn) {
        try {
            return await pool.query(req, "call spc_hsnmaster_select(?)",
            [
                itemhsn.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("itemhsn.service - getItemHSN", err);
        }
    
        return null;
    };    

    this.saveItemHSN = async function (req, ItemHSN) {
        try {
                var sp_text = "SET @out_id = 0; call spc_hsnmaster_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        ItemHSN["id"] != null ? parseInt(ItemHSN.id) : null,
                        ItemHSN.chapter,
                        ItemHSN.heading,
                        ItemHSN.subheading,
                        ItemHSN.description,
                        ItemHSN.chapterid,
                        ItemHSN.chapterformatted,
                        parseInt(ItemHSN.companyid),
                        parseInt(ItemHSN.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ItemHSN.service-saveItemHSN", err);
        }
        return null;
    };

    this.deleteItemHSN = async function (req, itemhsn) {
        try {
                return await pool.query(req, "call spc_itemhsn_delete(?)",                       
                    [
                        parseInt(itemhsn.id),
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ItemHSN.service-deleteItemHSN", err);
        }
        return null;
    };

};
    
module.exports = itemhsnRepository;