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

    this.saveWarehouse = async function (req, Warehouse) {
        console.log("Warehouse",Warehouse);
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
                        Warehouse.city,
                        Warehouse.state,
                        Warehouse.zipcode,
                        Warehouse.gln,
                        parseInt(Warehouse.countryid),
                        Warehouse.active,
                        Warehouse["moduleid"] != null ? parseInt(Warehouse.moduleid) : null,
                        parseInt(Warehouse.companyid),
                        parseInt(Warehouse.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Warehouse.service-saveWarehouse", err);
        }
        return null;
    }
};
    
module.exports = warehouseRepository;