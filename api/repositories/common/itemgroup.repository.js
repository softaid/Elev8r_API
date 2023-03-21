let itemgroupRepository = function (pool, log) {
    
    this.getAllItemGroup = async function (req, itemgroup) {
        try {
            return await pool.query(req, "call spc_itemgroup_search(?)",
            [
                itemgroup.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("itemgroup.service - getAllItemGroup", err);
        } 
        return null;
    };    

    this.getItemGroup = async function (req, itemgroup) {
        try {
            return await pool.query(req, "call spc_itemgroup_select(?)",
            [
                itemgroup.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("itemgroup.service - getItemGroup", err);
        }
    
        return null;
    };    

    this.saveItemGroup = async function (req, ItemGroup) {
        console.log("ItemGroup",ItemGroup);
        try {
                var sp_text = "SET @out_id = 0; call spc_itemgroup_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        ItemGroup["id"] != null ? parseInt(ItemGroup.id) : null,
                        ItemGroup.groupname,
                        parseInt(ItemGroup.seriesstartwith),
                        ItemGroup.seriesprefix,
                        ItemGroup.seriesseparator,
                        ItemGroup.moduleid,
                        ItemGroup.grouptypeid,
                        parseInt(ItemGroup.companyid),
                        parseInt(ItemGroup.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ItemGroup.service-saveItemGroup", err);
        }
        return null;
    };

    this.deleteItemGroup = async function (req, itemgroup) {
        try {
                return await pool.query(req, "call spc_itemgroup_delete(?)",                       
                    [
                        parseInt(itemgroup.id),
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ItemGroup.service-deleteItemGroup", err);
        }
        return null;
    };

};
    
module.exports = itemgroupRepository;