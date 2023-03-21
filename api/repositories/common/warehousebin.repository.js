let warehousebinRepository = function (pool, log) {
    
    this.getAllWarehouseBinSearch = async function (req, WarehouseBin) {
        try {
            return await pool.query(req, "call spc_warehousebin_search(?)",
            [
                WarehouseBin.warehouseid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("warehousebin.service - getAllWarehouseBinSearch", err);
        } 
        return null;
    };    

  
    this.getWarehouseBin = async function (req, WarehouseBin) {
        try {
            return await pool.query(req, "call spc_warehousebin_select(?)",
            [
                WarehouseBin.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("WarehouseBin.service - getWarehouse", err);
        } 
        return null;
    };  


    this.saveWarehouseBin = async function (req, WarehouseBin) {
        console.log("WarehouseBin : ",WarehouseBin)
        try {
                var sp_text = "SET @out_id = 0; call spc_warehousebin_save(?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        WarehouseBin["id"] != null ? parseInt(WarehouseBin.id) : null,
                        parseInt(WarehouseBin.warehouseid),
                        WarehouseBin.bincode,
                        WarehouseBin.binname,
                        parseInt(WarehouseBin.companyid),
                        WarehouseBin.isdefault,
                        parseInt(WarehouseBin.userid),
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("WarehouseBin.service-saveWarehouseBin", err);
        }
        return null;
    }

    // this.deleteLocation = async function (req, Location) {
    //     try {
    //             return await pool.query(req, "call spc_location_delete(?)",                       
    //                 [
    //                     parseInt(Location.id),
    //                 ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("Location.service-deleteLocation", err);
    //     }
    //     return null;
    // }

    this.getAllWarehouseBin = async function (req, WarehouseBin) {
        try {
            return await pool.query(req, "call spc_warehousebin_dll(?)",
            [
                WarehouseBin.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("warehousebin.service - getAllWarehouseBin", err);
        } 
        return null;
    };    

};
    
module.exports = warehousebinRepository;