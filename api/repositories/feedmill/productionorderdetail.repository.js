let productionorderdetailRepository = function (pool, log) {
    
    // Get All Farm Grade
    this.getAllProductionOrderDetail = async function (req, ProductionOrderDetail) {
        try {
            return await pool.query(req, "call spc_productionorderdetail_search(?,?)",
            [
               parseInt(ProductionOrderDetail.productionorderid),
               parseInt(ProductionOrderDetail.companyid),
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionOrderDetail.service - getAllProductionOrderDetail", err);
        } 
        return null;
    };    

    // Get  Farm Grade by id

    this.getProductionOrderDetail = async function (req, ProductionOrderDetail) {
        try {
            return await pool.query(req, "call spc_productionorderdetail_select(?)",
            [
                ProductionOrderDetail.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionOrderDetail.service - getProductionOrderDetail", err);
        }
    
        return null;
    };    
  
    
    this.saveProductionOrderDetail = async function (req, ProductionOrderDetail) {
        console.log("ProductionOrderDetail : ", ProductionOrderDetail);
        try {
                var sp_text = "SET @out_id = 0; call spc_productionorderdetail_save(?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        ProductionOrderDetail["id"] != null ? parseInt(ProductionOrderDetail.id) : null,
                        parseInt(ProductionOrderDetail.productionorderid),
                        parseInt(ProductionOrderDetail.typeid),
                        parseInt(ProductionOrderDetail.itemid),	
                        parseFloat(ProductionOrderDetail.baseqty),	
                        parseFloat(ProductionOrderDetail.plannedqty),
                        parseFloat(ProductionOrderDetail.pendingplannedqty),	
                        parseInt(ProductionOrderDetail.issuemethodid),
                        parseFloat(ProductionOrderDetail.itemstockqty),	
                        parseInt(ProductionOrderDetail.companyid),
                        parseInt(ProductionOrderDetail.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionOrderDetail.service-saveProductionOrderDetail", err);
        }
        return null;
    }

  // delete Farm Grade 

    this.deleteProductionOrderDetail = async function (req, ProductionOrderDetail) {
        console.log("ProductionOrderDetail",ProductionOrderDetail);
        try {
                return await pool.query(req, "call spc_productionorderdetail_delete(?,?,?)",                       
                    [
                        parseInt(ProductionOrderDetail.id),
                        parseInt(ProductionOrderDetail.companyid),
                        parseInt(ProductionOrderDetail.userid), 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionOrderDetail.service-deleteProductionOrderDetail", err);
        }
        return null;
    }

   


};
    
module.exports = productionorderdetailRepository;