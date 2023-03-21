let breederliftingWeightRepository = function (pool, log) {
    
    this.getAllBreederLfWeight = async function (req, breederliftingweight) {
        try {
            return await pool.query(req, "call spc_breeder_liftingweight_search(?)",
            [
                breederliftingweight.companyid
              
    
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederliftingweight.repository - getAllBreederLfWeight", err);
        }
    
        return null;
    };   

    this.getBreederLfWeight = async function (req, breederliftingweight) {
        try {
            return await pool.query(req, "call spc_breeder_liftingweight_select(?,?)",
            [
                breederliftingweight.id,
                breederliftingweight.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederliftingweight.repository - getBreederLfWeight", err);
        } 
        return null;
    };    

  
    this.saveBreederLfWeight = async function (req, breederliftingweight) {
        try {
                var sp_text = "SET @out_id = 0; call spc_breeder_liftingweight_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        breederliftingweight["id"] != null ? parseInt(breederliftingweight.id) : null,
                        parseInt(breederliftingweight.liftingscheduleid ),
                        parseInt(breederliftingweight.breederbirdsalesorderid ),
                        parseInt(breederliftingweight.stdsalesorderid),
                        breederliftingweight.liftingdate,
                        parseInt(breederliftingweight.totaldeliveredqty),
                        parseInt(breederliftingweight.totaldeliveredwt),
                        parseInt(breederliftingweight.totaldeliverycost),
                        parseInt(breederliftingweight.excessbirds),
                        parseInt(breederliftingweight.birdshortage),
                        breederliftingweight.islastdelivery,
                        parseInt(breederliftingweight.batchid),
                        parseInt(breederliftingweight.warehouseid),
                        parseInt(breederliftingweight.companyid),
                        parseInt(breederliftingweight.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederliftingweight.repository - saveBreederLfWeight", err);
        };
        return null;
    };

    this.getWarehouseBySalesOrder = async function (req, breederliftingweight) {
        try {
            return await pool.query(req, "call spc_warehouse_bysalesorder_search(?,?)",
            [
                breederliftingweight.salesorderid,
                breederliftingweight.companyid
              
    
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederliftingweight.repository - getWarehouseBySalesOrder", err);
        }
    
        return null;
    };   


    
}
    
module.exports = breederliftingWeightRepository;