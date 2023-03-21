let breederliftingweightDetailRepository = function (pool, log) {
    
    this.getAllBreederLfWeightDetail = async function (req, breederliftingweightdetail) {
        try {
            return await pool.query(req, "call spc_breeder_liftingweightdetail_search(?,?)",
            [
                breederliftingweightdetail.breederliftingweightid,
                breederliftingweightdetail.companyid
              
    
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("getAllBreederLfWeightDetail.repository - getAllBreederLfWeight", err);
        }
    
        return null;
    };   

    this.getBreederLfWeightDetail = async function (req, breederliftingweightdetail) {
        try {
            return await pool.query(req, "call spc_breeder_liftingweightdetail_select(?,?)",
            [
                breederliftingweightdetail.id,
                breederliftingweightdetail.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederliftingweightdetail.repository - getBreederLfWeightDetail", err);
        } 
        return null;
    };    

  
    this.saveBreederLfWeightDetail = async function (req, breederliftingweightdetail) {
        try {
                var sp_text = "SET @out_id = 0; call spc_breeder_liftingweightdetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        breederliftingweightdetail["id"] != null ? parseInt(breederliftingweightdetail.id) : null,
                        parseInt(breederliftingweightdetail.itemid),
                        parseInt(breederliftingweightdetail.breederliftingweightid),
                        parseInt(breederliftingweightdetail.plannedqty),
                        parseInt(breederliftingweightdetail.deliveredqty),
                        parseFloat (breederliftingweightdetail.plannedwt),
                        parseFloat(breederliftingweightdetail.deliveredwt),
                        breederliftingweightdetail.liftingtime,
                        parseFloat(breederliftingweightdetail.rateperkg),
                        parseFloat(breederliftingweightdetail.totalcost),
                        parseInt(breederliftingweightdetail.excessbirds),
                        parseInt(breederliftingweightdetail.birdshortage),
                        parseInt(breederliftingweightdetail.shedid),
                        parseInt(breederliftingweightdetail.warehousebinid),
                        parseInt(breederliftingweightdetail.companyid),
                        parseInt(breederliftingweightdetail.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederliftingweightdetail.repository - saveBreederLfWeightDetail", err);
        }
        return null;
    };

    
}
    
module.exports = breederliftingweightDetailRepository;