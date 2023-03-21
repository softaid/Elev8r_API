let ProductionPlanningRepository = function (pool, log) {

    this.getModule = async function (req, ProductionPlanning) {
        try {
            return await pool.query(req, "call spc_modulebylocation_search(?,?)",
                [

                    ProductionPlanning.lid,
                    ProductionPlanning.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionPlanning - getModule", err);
        }

        return null;
    };

    this.getgenerateProductionPlan = async function (req, ProductionPlanning) {
        try {
            return await pool.query(req, "call spc_modulewise_productionplanning(?,?,?,?,?)",
                [
                    ProductionPlanning.moduleids,
                    ProductionPlanning.locationid,
                    ProductionPlanning.fromdate,
                    ProductionPlanning.todate,
                    ProductionPlanning.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("ProductionPlanning - getgenerateProductionPlan", err);
        }

        return null;
    };

        //SAVE REPOSITORY

this.saveproductionplan = async function (req, ProductionPlanning) {
    // console.log("ProductionPlanning",ProductionPlanning);
    // console.log('--------------------------req-------------------------- : ', req);
    try {
            var sp_text = "SET @out_id = 0; call spc_productionplanning_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                 ProductionPlanning["id"] != null ? parseInt(ProductionPlanning.id) : null,
                 parseInt(ProductionPlanning.productionplanningid),
                 ProductionPlanning.itemname,
                 parseInt(ProductionPlanning.required),
                 parseInt(ProductionPlanning.plannedqty),
                 parseInt(ProductionPlanning.itemid),
                 parseInt(ProductionPlanning.isactive),
                 parseInt(ProductionPlanning.companyid),
                 parseInt(ProductionPlanning.userid),   
              ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionPlanning.service-saveproductionplan", err);
    }
    return null;
 };

 this.saveproductionplanparent = async function (req, ProductionPlanning) {
    try {
            var sp_text = "SET @out_id = 0; call spc_productionplanparent_save(?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                 ProductionPlanning["id"] != null ? parseInt(ProductionPlanning.id) : null,
                 ProductionPlanning.fromdate,
                 ProductionPlanning.todate,
                 ProductionPlanning.locationid,
                 ProductionPlanning.operationid,
                 parseInt(ProductionPlanning.companyid),
                 parseInt(ProductionPlanning.userid),   
              ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionPlanning.service-saveproductionplanparent", err);
    }
    return null;
 };


 this.getproductanditems = async function (req, ProductionPlanning) {
    console.log("----------------ProductionPlanning repo:-----------------",ProductionPlanning);
    console.log("----------------req repo:-----------------",req);
    try {
        return await pool.query(req, "call spc_product_select(?,?)",
        [
            ProductionPlanning.id,
            ProductionPlanning.companyid,
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionPlanning.service - getproductanditems", err);
    } 
    return null;
 };  

 // SELECT REPOSITORY

this.getProductionPlanning = async function (req, ProductionPlanning) {
    console.log("ProductionPlanning repo:",ProductionPlanning);
    try {
        return await pool.query(req, "call spc_productionplanning_select(?)",
        [
            ProductionPlanning.id,
           
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionPlanning.service - getProductionPlanning", err);
    } 
    return null;
 };  

  // Get All Production Order
  this.getAllProductionPlanning = async function (req, ProductionPlanning) {
    try {
        return await pool.query(req, "call spc_productionplanning_search(?)",
        [
            ProductionPlanning.companyid,
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionPlanning.service - getAllProductionPlanning", err);
    } 
    return null;
};    

 // Get All Farm Grade
 this.getProductionPlanningDetail = async function (req, ProductionPlanning) {
    try {
        return await pool.query(req, "call spc_productionplanningdetail_search(?,?)",
        [
           parseInt(ProductionPlanning.productionplanningid),
           parseInt(ProductionPlanning.companyid),
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionPlanning.service - getProductionPlanningDetail", err);
    } 
    return null;
};    

this.saveProducctionOrder = async function (req, ProductionPlanning) {
    try {
            var sp_text = "call spc_productionorderfrom_planing(?,?,?);";                  
            return await pool.query(req, sp_text,                       
                [
                 parseInt(ProductionPlanning.id),
                 parseInt(ProductionPlanning.companyid),
                 parseInt(ProductionPlanning.userid),   
              ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("ProductionPlanning.service-saveProducctionOrder", err);
    }
    return null;
 };




};

module.exports = ProductionPlanningRepository;    
