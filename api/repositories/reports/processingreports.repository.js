let processingReportsRepository = function (pool, log) {

    // All Processing Report Repository


    this.getAllInputItems = async function (req, Processing) {
        try {
            return await pool.query(req, "call spc_getallinputitems_fromprocessingproduction(?,?,?)",
                [
                    Processing.fromdate,
                    Processing.todate,
                    parseInt(Processing.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Processing - getAllInputItems", err);
        }

        return null;
    };

    this.getAllInputBatches = async function (req, Processing) {
        try {
            return await pool.query(req, "call spc_getallinputitemsbatches_frominputitem(?,?,?,?)",
                [
                    Processing.fromdate,
                    Processing.todate,
                    Processing.inputitems,
                    parseInt(Processing.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Processing - getAllInputBatches", err);
        }

        return null;
    };

    this.getAllOutputitems = async function (req, Processing) {
        try {
            return await pool.query(req, "call spc_getalloutputitems_fromprocessingproduction(?)",
                [
                    
                    parseInt(Processing.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Processing - getAllOutputitems", err);
        }

        return null;
    };


    this.getProcessingRegisterReport = async function (req, Processing) {
        try {
            return await pool.query(req, "call spc_processingproductionregister_report(?,?,?,?,?,?)",
                [
                    Processing.fromdate,
                    Processing.todate,
                    isNaN(Processing.inputitems) ? null : Processing.inputitems,
                    isNaN(Processing.inputitembatches) ? null : Processing.inputitembatches,
                    isNaN(Processing.outputitems) ? null : Processing.outputitems,
                    parseInt(Processing.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Processing - getProcessingRegisterReport", err);
        }

        return null;
    };

    this.getProcessingLiveBirdDetailReport = async function (req, Processing) {
        try {
            return await pool.query(req, "call spc_processing_LivebirdDetail(?,?,?)",
                [
                    Processing.moduleid,
                    Processing.itemid,
                    parseInt(Processing.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Processing - getProcessingLiveBirdDetailReport", err);
        }

        return null;
    };

     //get itemwisestock  report
     this.getItemWiseStockReport = async function (req, Processing) {
        console.log("-------------processing-------------",Processing);
      try {
          return await pool.query(req, "call spc_itemwisestock_report_weightwise(?,?,?,?,?)",
          [
            Processing.fromdate,
            Processing.todate,  
            Processing.itemid,
            Processing.warehouseids,
            Processing.companyid

          ]);
      }
      catch (err) {
          console.log('Error thrown : ', err);
          log.dbErrorLog("Processing - getItemWiseStockReport", err);
      };
  
      return null;
  };   





};

module.exports = processingReportsRepository;
