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
        console.log("warehouse repo:",warehouse);
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

    this.saveWarehouse = async function (req, Location) {
        try {
                var sp_text = "SET @out_id = 0; call spc_warehouse_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Location["id"] != null ? parseInt(Location.id) : null,
                        parseInt(Location.locationtypeid),
                        Location.locationcode,
                        Location.locationname,
                        parseInt(Location.companyid),
                        parseInt(Location.userid),   
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