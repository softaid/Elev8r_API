let productionorderRepository = function (pool, log) {
    
    // Get All Production Order
    this.getAllProductionOrder = async function (req, ProductionOrder) {
        try {
            return await pool.query(req, "call spc_productionorder_search(?)",
            [
                ProductionOrder.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionOrder.service - getAllProductionOrder", err);
        } 
        return null;
    };    

    // Get  Production Order by id

    this.getProductionOrder = async function (req, ProductionOrder) {
        try {
            return await pool.query(req, "call spc_productionorder_select(?)",
            [
                ProductionOrder.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionOrder.service - getProductionOrder", err);
        }
    
        return null;
    };    
  
    
    this.saveProductionOrder = async function (req, ProductionOrder) {
        console.log("ProductionOrder : ", ProductionOrder);
        try {
                var sp_text = "SET @out_id = 0; call spc_productionorder_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        ProductionOrder["id"] != null ? parseInt(ProductionOrder.id) : null,
                        parseInt(ProductionOrder.productionno),
                        ProductionOrder["typeid"] != null ? parseInt(ProductionOrder.typeid) : null,
                        ProductionOrder["statusid"] != null ? parseInt(ProductionOrder.statusid) : null,	
                        parseFloat(ProductionOrder.plannedqty),	
                        ProductionOrder["warehouseid"] != null ? parseInt(ProductionOrder.warehouseid) : null,
                        ProductionOrder.orderdate,
                        ProductionOrder.startdate,	
                        ProductionOrder.duedate,
                        ProductionOrder["employeeid"] != null ? parseInt(ProductionOrder.employeeid) : null,
                        ProductionOrder.origin,	
                        ProductionOrder["customerid"] != null ? parseInt(ProductionOrder.customerid) : null,
                        ProductionOrder["salesorderid"] != null ? parseInt(ProductionOrder.salesorderid) : null,
                        ProductionOrder["costcenterid"] != null ? parseInt(ProductionOrder.costcenterid) : null,
                        ProductionOrder["projectid"] != null ? parseInt(ProductionOrder.projectid) : null,
                        parseFloat(ProductionOrder.actualitemcost),	
                        parseFloat(ProductionOrder.actualresourcecost),	
                        parseFloat(ProductionOrder.actualadditionalcost),	
                        parseFloat(ProductionOrder.actualproductcost),	
                        parseFloat(ProductionOrder.actualbyproductcost),
                        parseFloat(ProductionOrder.totalvariance),	
                        parseFloat(ProductionOrder.completedqty),	
                        parseFloat(ProductionOrder.rejectedqty),
                        ProductionOrder.actualclosingdate,	
                        ProductionOrder.overduedate,
                        ProductionOrder.totalruntime,
                        ProductionOrder.totaladditionaltime,	
                        ProductionOrder.totaltime,
                        ProductionOrder.journalremark,
                        ProductionOrder.remarks,	
                        ProductionOrder.productionorderno,
                        parseFloat(ProductionOrder.receipt_pendingqty),
                        parseInt(ProductionOrder.companyid),
                        parseInt(ProductionOrder.userid),   
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionOrder.service-saveProductionOrder", err);
        }
        return null;
    }

  // delete Production Order 

    this.deleteProductionOrder = async function (req, ProductionOrder) {
        console.log("ProductionOrder",ProductionOrder);
        try {
                return await pool.query(req, "call spc_productionorder_delete(?,?,?)",                       
                    [
                        parseInt(ProductionOrder.id),
                        parseInt(ProductionOrder.companyid),
                        parseInt(ProductionOrder.userid), 
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionOrder.service-deleteProductionOrder", err);
        }
        return null;
    }
     // Get All Production register reports
     this.getProductionRegisterReport = async function (req, ProductionOrder) {
        try {
            return await pool.query(req, "call spc_Productionregister_report(?,?,?)",
            [
                ProductionOrder.fromdate,
                ProductionOrder.todate,
                ProductionOrder.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionOrder.service - getProductionRegisterReport", err);
        } 
        return null;
    };  

    // get warehousewise item stock
    this.getItemStockqty = async function (req, ProductionOrder) {
        console.log("ProductionOrder repo:", ProductionOrder);
        try {
            return await pool.query(req, "call spc_feedmill_item_stockqty(?,?,?)",
                [
                    ProductionOrder.itemid,
                    ProductionOrder.warehouseid,
                    ProductionOrder.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionOrder.service - getItembatchBalByItemid", err);
        }
        return null;
    };


      // Get All Production register reports
      this.getwhWiseBomDetail = async function (req, ProductionOrder) {
          console.log("ProductionOrder",ProductionOrder);
        try {
            return await pool.query(req, "call spc_warehousewise_bomdetail_search(?,?,?,?)",
            [
                ProductionOrder.bomid,
                ProductionOrder.warehouseid,
                ProductionOrder.transactiondate,
                ProductionOrder.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionOrder.service - getwhWiseBomDetail", err);
        } 
        return null;
    };  

   


};
    
module.exports = productionorderRepository;
