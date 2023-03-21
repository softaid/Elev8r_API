let breederbirdsalesorderdetailRepository = function (pool, log) {

    this.getAllBirdSalesOrderDetail = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_breederbirdsalesorderdetail_search(?,?,?)",
            [
                Params.breederbirdsalesorderid,
                Params.moduleid,
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Params.repository - getAllBirdSalesOrderDetail", err);
        } 
        return null;
    };    

    

    this.saveBreederBirdSalesOrderDetail = async function (req, Params) {
        try {
                var sp_text = "SET @out_id = 0; call spc_breederbirdsalesorderdetail_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        Params["id"] != null ? parseInt(Params.id) : null,
                        parseInt(Params.breederbirdsalesorderid),
                        parseInt(Params.batchid), 
                        parseFloat(Params.batchsaleweight),
                        parseFloat(Params.avgweight),
                        parseInt(Params.itemid),
                        parseInt(Params.shedid),
                        parseInt(Params.companyid),
                        parseInt(Params.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Params.repository - saveBirdSalesOrderDetail", err);
        }
        return null;
    };

    this.getAllBirdSalesOrderbatch = async function (req, Params) {
        try {
            return await pool.query(req, "call spc_breederbirdsalesorderbatch_byorderid(?,?,?)",
            [
                Params.breederbirdsalesorderid,
                Params.warehouseid,
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Params.repository - getAllBirdSalesOrderbatch", err);
        } 
        return null;
    };   
    
    this.getAllBirdSalesOrderItem= async function (req, Params) {
        try {
            return await pool.query(req, "call spc_getsalesorder_bybatchid(?,?,?,?)",
            [   Params.breederbirdsalesorderid,
                Params.batchid,
                Params.warehouseid,
                Params.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Params.repository - getAllBirdSalesOrderItem", err);
        } 
        return null;
    };   


    
}
    
module.exports = breederbirdsalesorderdetailRepository;