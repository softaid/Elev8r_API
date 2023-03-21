

let processingProductionOrderRepository = function (pool, log) {

    // get bom list by stage 
    this.getStagewiseBOM = async function (req, productionorder) {
        try {
            return await pool.query(req, "call spc_processingstagewise_bom(?,?)",
            [
		productionorder.stageid,
		productionorder.podate
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionorder.repository - getStagewiseBOM", err);
        }
    
        return null;
    };  

    this.searchProcessingProductionOrder = async function (req, productionorder) {
        try {
            return await pool.query(req, "call spc_processingproductionorder_search(?)",
            [
                productionorder.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionorder.repository - searchProcessingProductionOrder", err);
        } 
        return null;
    };    

    this.selectProcessingProductionOrder = async function (req, productionorder) {
        try {
            return await pool.query(req, "call spc_processingproductionorder_select(?)",
            [
                productionorder.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionorder.repository - selectProcessingProductionOrder", err);
        }
    
        return null;
    };    

    this.saveProcessingProductionOrder = async function (req, productionorder) {
        try {
                var sp_text = "SET @out_id = 0; call spc_processingproductionorder_save(?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        productionorder["id"] != null ? parseInt(productionorder.id) : null,
                        productionorder.pocode,
			            productionorder.podate,
                        parseInt(productionorder.stageid),
                        parseInt(productionorder.bomid),
			            parseInt(productionorder.statusid),
                        parseInt(productionorder.plannedqty),
                        parseInt(productionorder.companyid)  
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionorder.repository - saveProcessingProductionOrder", err);
        }
        return null;
    };

    this.deleteProcessingProductionOrder = async function (req, productionorder) {
        try {
                return await pool.query(req, "call spc_processingproductionorder_delete(?)",                       
                    [
                        parseInt(productionorder.id) 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionorder.repository - deleteProcessingProductionOrder", err);
        }
        return null;
    };

    // get PO list
    this.getProcessingProductionOrderList = async function (req, productionorder) {
        try {
            return await pool.query(req, "call spc_processingproductionorder_list(?)",
            [
		isNaN(productionorder.bomid) ? null : productionorder.bomid 

            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionorder.repository - getProcessingProductionOrderList", err);
        }
    
        return null;
    }; 

    // Processing Production JE 
    this.saveProcessingProductionJE = async function (req, productionorder) {
        try {
            return await pool.query(req, "call spc_saveprocessingproduction_je(?,?,?)",
            [
		productionorder.poid,
		productionorder.companyid,
		productionorder.userid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("productionorder.repository - saveProcessingProductionJE", err);
        }
    
        return null;
    };  

};
    
module.exports = processingProductionOrderRepository;