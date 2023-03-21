let breederbirdsalesorderRepository = function (pool, log) {
    
    this.getModuleWiseBtches = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_modulelocationwise_batches(?,?,?,?,?)",
            [
                Params.moduleid,
                Params.companyid,
                Params.locationid,
                Params.fromweight,
                Params.toweight,
              
    
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BirdSalesOrder.repository - getModuleWiseBtches", err);
        }
    
        return null;
    };   

    this.getAllBreederBirdSalesOrder = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_breederbirdsalesoreder_search(?,?)",
            [
                Params.todaydate,
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Params.repository - getAllBirdSalesOrder", err);
        } 
        return null;
    };    

    this.getBreederBirdSalesOrder = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_breederbirdsalesorder_select(?,?)",
            [
                Params.id,
                Params.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Params.repository - getBirdSalesOrder", err);
        }
    
        return null;
    };    

    this.saveBreederBirdSalesOrder = async function (req, Params) {
        try {
                var sp_text = "SET @out_id = 0; call spc_breederbirdsalesorder_save(?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Params["id"] != null ? parseInt(Params.id) : null,
                        parseInt(Params.moduleid),
                        parseInt(Params.partyid),
                        parseInt(Params.locationid),
                        Params.orderdate,
                        parseFloat(Params.totalsalesweight),
                        parseFloat(Params.rateperkg),
                        parseFloat(Params.fromweight),
                        parseFloat(Params.toweight),
                        parseInt(Params.statusid),
                        parseInt(Params.companyid),
                        parseInt(Params.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Params.repository - saveBirdSalesOrder", err);
        }
        return null;
    };

    
}
    
module.exports = breederbirdsalesorderRepository;