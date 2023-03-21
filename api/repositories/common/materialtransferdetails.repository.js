let materialtransferdetailsRepository = function (pool, log) {
    
    this.getMaterialTransferDetailsByTransferId = async function (req, MaterialTransferDetails) {
        try {
            return await pool.query(req, "call spc_materialtransferdetails_search(?)",
            [
                MaterialTransferDetails.materialtransferid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialtransferdetails.repository - getMaterialTransferDetailsByTransferId", err);
        } 
        return null;
    };

    this.getMaterialTransferDetail = async function (req, MaterialTransferDetails) {
        try {
            return await pool.query(req, "call spc_materialtransferdetails_select(?)",
            [
                MaterialTransferDetails.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialtransferdetails.repository - getMaterialTransferDetail", err);
        } 
        return null;
    };
    
    this.saveMaterialTransferDetail = async function (req, MaterialTransferDetails) {
        try {
                var sp_text = "SET @out_id = 0; call spc_materialtransferdetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        MaterialTransferDetails["id"] != null ? parseInt(MaterialTransferDetails.id) : null,
                        parseInt(MaterialTransferDetails.materialtransferid),   
                        MaterialTransferDetails["towarehouseid"] != null ? parseInt(MaterialTransferDetails.towarehouseid) : null,
                        MaterialTransferDetails["towarehousebinid"] != null ? parseInt(MaterialTransferDetails.towarehousebinid) : null,
                        parseInt(MaterialTransferDetails.itemid),                     
                        MaterialTransferDetails.itemname,
                        MaterialTransferDetails["requestedquantity"] != null ? parseFloat(MaterialTransferDetails.requestedquantity) : null,
                        parseFloat(MaterialTransferDetails.transferedquantity),
                        MaterialTransferDetails["transferedweight"] != null ? parseFloat(MaterialTransferDetails.transferedweight) : null,
                        parseInt(MaterialTransferDetails.unitid),
                        MaterialTransferDetails.itembatch,
                        parseInt(MaterialTransferDetails.userid),                          
                        parseInt(MaterialTransferDetails.companyid),          
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialtransferdetails.repository - saveMaterialTransferDetail", err);
        }
        return null;
    };
    
    this.deleteMaterialTransferDetail = async function (req, MaterialTransferDetails) {
        try {
                return await pool.query(req, "call spc_materialtransferdetail_delete(?,?,?)",                       
                    [
                        parseInt(MaterialTransferDetails.id),
                        parseInt(MaterialTransferDetails.companyid),
                        parseInt(MaterialTransferDetails.userid)     
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("materialtransferdetails.repository - deleteMaterialTransferDetail", err);
        }
        return null;
    }
};
    
module.exports = materialtransferdetailsRepository;