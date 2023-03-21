

let processingReceiptFromProductionRepository = function (pool, log) {

    this.searchProcessingReceiptFromProduction = async function (req, receipt) {
        try {
            return await pool.query(req, "call spc_processingreceiptfromproduction_search(?)",
            [
                receipt.poid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receipt.repository - searchProcessingReceiptFromProduction", err);
        } 
        return null;
    };    

    this.selectProcessingReceiptFromProduction = async function (req, receipt) {
        try {
            return await pool.query(req, "call spc_processingreceiptfromproduction_select(?)",
            [
                receipt.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receipt.repository - selectProcessingReceiptFromProduction", err);
        }
    
        return null;
    };    

    this.saveProcessingReceiptFromProduction = async function (req, receipt) {
        try {
                var sp_text = "SET @out_id = 0; call spc_processingreceiptfromproduction_save(?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        receipt["id"] != null ? parseInt(receipt.id) : null,
                        parseInt(receipt.poid),
			            parseInt(receipt.itemid),
			            parseInt(receipt.warehouseid),
                        parseInt(receipt.receiptqty),  
			            parseInt(receipt.planqty),
                        parseFloat(receipt.receiptwt),
			            parseFloat(receipt.planweight),
			            parseFloat(receipt.receiptcost),
                        parseInt(receipt.companyid),
                        parseInt(receipt.userid)

                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receipt.repository - saveProcessingReceiptFromProduction", err);
        }
        return null;
    };

    this.deleteProcessingReceiptFromProduction = async function (req, receipt) {
        try {
                return await pool.query(req, "call spc_processingreceiptfromproduction_delete(?)",                       
                    [
                        parseInt(receipt.id) 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("receipt.repository - deleteProcessingReceiptFromProduction", err);
        }
        return null;
    };
 
};
    
module.exports = processingReceiptFromProductionRepository;