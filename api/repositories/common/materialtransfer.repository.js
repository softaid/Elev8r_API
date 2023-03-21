let materialtransferRepository = function (pool, log) {
    
    this.getAllMaterialTransfer = async function (req, MaterialTransfer) {
        
        try {
            return await pool.query(req, "call spc_materialtransfer_search(?)",
            [
                MaterialTransfer.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialtransfer.repository - getAllMaterialTransfer", err);
        } 
        return null;
    };
    // this.getMaterialTransfersBySource = async function (req, MaterialTransfer) {
        
    //     try {
    //         return await pool.query(req, "call spc_materialtransfer_search(?,?)",
    //         [
    //             MaterialTransfer.transfertarget,
    //             MaterialTransfer.companyid,
    //         ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("materialtransfer.repository - getMaterialTransfersBySource", err);
    //     } 
    //     return null;
    // };

    this.getMaterialTransfer = async function (req, MaterialTransfer) {
        try {
            return await pool.query(req, "call spc_materialtransfer_select(?)",
            [
                MaterialTransfer.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialtransfer.repository - getMaterialTransfer", err);
        }
    
        return null;
    };    

    this.saveMaterialTransfer = async function (req, MaterialTransfer) {
        try {
                var sp_text = "SET @out_id = 0; call spc_materialtransfer_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        MaterialTransfer["id"] != null ? parseInt(MaterialTransfer.id) : null,
                        MaterialTransfer["transfersourceid"] != null ? parseInt(MaterialTransfer.transfersourceid) : null,
                        MaterialTransfer["transfertargetid"] != null ? parseInt(MaterialTransfer.transfertargetid) : null,
                        MaterialTransfer["statusid"] != null ? parseInt(MaterialTransfer.statusid) : null,
                        MaterialTransfer.duedate,
                        MaterialTransfer.transferdate,
                        MaterialTransfer.remark,
                        MaterialTransfer["fromwarehouseid"] != null ? parseInt(MaterialTransfer.fromwarehouseid) : null,
                        MaterialTransfer["fromwarehousebinid"] != null ? parseInt(MaterialTransfer.fromwarehousebinid) : null,
                        MaterialTransfer["usagetypeid"] != null ? parseInt(MaterialTransfer.usagetypeid) : null,
                        MaterialTransfer["frombatchid"] != null ? parseInt(MaterialTransfer.frombatchid) : null,
                        MaterialTransfer["tobatchid"] != null ? parseInt(MaterialTransfer.tobatchid) : null,
                        MaterialTransfer["requestid"] != null ? parseInt(MaterialTransfer.requestid) : null,         
                        parseInt(MaterialTransfer.companyid),
                        parseInt(MaterialTransfer.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialtransfer.repository - saveMaterialTransfer", err);
        }
        return null;
    }

    this.deleteMaterialTransfer = async function (req, MaterialTransfer) {
        try {
                return await pool.query(req, "call spc_materialtransfer_delete(?,?,?)",                       
                    [
                        parseInt(MaterialTransfer.id),
                        parseInt(MaterialTransfer.companyid),
                        parseInt(MaterialTransfer.userid),                        
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialtransfer.repository - deleteMaterialTransfer", err);
        }
        return null;
    }


    //material transfer entries by request id
    this.getMaterialTransferByRequestId = async function(req, MaterialTransfer){
        console.log("MaterialTransfer : ",MaterialTransfer);
        try {
            return await pool.query(req, "call spc_materialtransfer_byrequestid(?,?)",                       
                [
                    parseInt(MaterialTransfer.requestid),
                    parseInt(MaterialTransfer.companyid)                      
                ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("materialtransfer.repository - getMaterialTransferByRequestId", err);
    }
    return null;
    }

    // material transfer JE

    this.saveMaterialTransferJE = async function (req, MaterialTransfer) {
        try {
            return await pool.query(req, "call spc_savematerialtransfer_je(?,?,?)",
            [
                MaterialTransfer.id,
                MaterialTransfer.companyid,
                MaterialTransfer.userid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialtransfer.repository - saveMaterialTransferJE", err);
        }
    
        return null;
    };    

    // this is for material&transfer schedule list
    this.getMaterialRequestandTransferScheduleList = async function (req, MaterialTransfer) {
        try {
            return await pool.query(req, "call spc_cbfmaterialrequestandtransferschedulelist_search(?,?)",
            [
                MaterialTransfer.fromdate,
                MaterialTransfer.todate,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialtransfer.repository - getMaterialRequestandTransferScheduleList", err);
        }
    
        return null;
    };    


};
    
module.exports = materialtransferRepository;