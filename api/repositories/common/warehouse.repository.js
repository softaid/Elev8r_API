let warehouseRepository = function (pool, log) {
    
    this.getAllWarehouse = async function (req, Warehouse) {
        try {
            return await pool.query(req, "call spc_warehouse_search(?)",
            [
                Warehouse.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("warehouse.service - getAllWarehouse", err);
        } 
        return null;
    };    
    

    this.getWarehouse = async function (req, Warehouse) {
        console.log("warehouse repo:",Warehouse);
        try {
            return await pool.query(req, "call spc_warehouse_select(?)",
            [
                Warehouse.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("warehouse.service - getWarehouse", err);
        } 
        return null;
    };  

    this.getWarehouseAddress = async function (req, Warehouse) {
        try {
            return await pool.query(req, "call spc_item_warehouseaddresses(?,?)",
            [
                isNaN(Warehouse.moduleid) ? null : Warehouse.moduleid,
                Warehouse.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("warehouse.service - getWarehouse", err);
        } 
        return null;
    }; 

    this.saveWarehouse = async function (req, Warehouse) {
        console.log("Warehouse : ",Warehouse)
        try {
                var sp_text = "SET @out_id = 0; call spc_warehouse_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Warehouse["id"] != null ? parseInt(Warehouse.id) : null,
                        Warehouse.warehousecode,
                        Warehouse.warehousename,
                        Warehouse.description,
                        parseInt(Warehouse.locationid),                        
                        Warehouse.shiptoname,
                        Warehouse.address,
                        parseInt(Warehouse.cityid),
                        parseInt(Warehouse.stateid),
                        Warehouse.zipcode,
                        Warehouse.gln,
                        parseInt(Warehouse.countryid),
                        Warehouse.active,
                        Warehouse.moduleid,
                        parseInt(Warehouse.companyid),
                        parseInt(Warehouse.userid),
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Location.service-saveLocation", err);
        }
        return null;
    }
};
    
module.exports = warehouseRepository;