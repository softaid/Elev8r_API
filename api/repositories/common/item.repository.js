let itemRepository = function (pool, log) {

    this.getAllItem = async function (req, Item) {
        try {
            return await pool.query(req, "call spc_item_search(?)",
                [
                    Item.companyid,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("item.service - getAllItem", err);
        }
        return null;
    };

    

    this.getItem = async function (req, Item) {
        try {
            return await pool.query(req, "call spc_item_select(?)",
            [
                Item.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("item.service - getItem", err);
        }
    
        return null;
    };

    this.saveItem = async function (req, Item) {
        try {
                var sp_text = "SET @out_id = 0; call spc_item_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Item["id"] != null ? parseInt(Item.id) : null,
                        parseInt(Item.itemgroupid),
                        Item.itemcode,
                        Item.itemname,
                        Item.description,
                        Item.manufacturer,
                        parseInt(Item.itemunitid),
                        Item.active,
                        parseFloat(Item.unitcost),
                        parseInt(Item.ledgerid),
                        Item["isgst"] != null ? parseInt(Item.isgst) : null,
                        Item["materialtypeid"] != null ? parseInt(Item.materialtypeid) : null,
                        Item["hsnid"] != null ? parseInt(Item.hsnid) : null,
                        Item["taxcategoryid"] != null ? parseInt(Item.taxcategoryid) : null,
                        parseInt(Item.companyid),
                        Item.issalable, 
                        parseInt(Item.revenueledgerid),
                        parseInt(Item.userid),   
			Item["isweightapplicable"] != null ? parseInt(Item.isweightapplicable) : null,
			Item["weight"] != null ? parseInt(Item.weight) : null
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Item.service-saveItem", err);
        }
        return null;
    }

    this.deleteItem = async function (req, Item) {
        try {
                return await pool.query(req, "call spc_item_delete(?)",                       
                    [
                        parseInt(Item.id),
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Item.service-deleteItem", err);
        }
        return null;
    }

};
    
module.exports = itemRepository;