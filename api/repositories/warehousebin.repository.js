let warehousebinRepository = function (pool, log) {
    
    this.getAllWarehousewiseWarehouseBin = async function (req, WarehouseBin) {
        try {
            return await pool.query(req, "call spc_warehousebin_search(?)",
            [
                WarehouseBin.warehouseid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("warehousebin.service - getAllWarehouseBin", err);
        } 
        return null;
    };    

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

  
    // this.getLocation = async function (req, Location) {
    //     try {
    //         return await pool.query(req, "call spc_location_select(?)",
    //         [
    //             Location.id,
    //         ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("location.service - getLocation", err);
    //     }
    
    //     return null;
    // };    

    // this.saveLocation = async function (req, Location) {
    //     try {
    //             var sp_text = "SET @out_id = 0; call spc_location_save(?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
    //             return await pool.query(req, sp_text,                       
    //                 [
    //                     Location["id"] != null ? parseInt(Location.id) : null,
    //                     parseInt(Location.locationtypeid),
    //                     Location.locationcode,
    //                     Location.locationname,
    //                     parseInt(Location.companyid),
    //                     parseInt(Location.userid),   
    //                 ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("Location.service-saveLocation", err);
    //     }
    //     return null;
    // }

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

};
    
module.exports = warehousebinRepository;