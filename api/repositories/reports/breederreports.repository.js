let breederReportsRepository = function (pool, log) {
    

    this.getAllbreederbatch = async function (req, BreederBatch) {
        try {
            return await pool.query(req, "call spc_eggscollection_breederbatch_search(?,?)",
            [
              BreederBatch.companyid,
              BreederBatch.locationid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getAllbreederbatch", err);
        }
    
        return null;
    };   

    this.getAllbreederbatchbywarehouse = async function (req, BreederBatch) {
        try {
            return await pool.query(req, "call spc_breederbatch_bywarehouseid(?,?)",
            [
              BreederBatch.companyid,
              BreederBatch.warehouseid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getAllbreederbatchbywarehouse", err);
        }
    
        return null;
    };   

      this.getLocationwisebreederbatches = async function (req, BreederBatch) {
        try {
            return await pool.query(req, "call spc_breederbatch_forlocation(?,?)",
            [
                
                BreederBatch.companyid,
                BreederBatch.locationid
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getAllbreederbatch", err);
        }
    
        return null;
    };   

     //get shed by breederbatchid

     this.getShedByBatchid = async function (req, BreederBatch) {
        try {
            return await pool.query(req, "call spc_eggscollection_forshed(?)",
            [   BreederBatch.breederbatchid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch.service - BreederBatch", err);
        } 
        return null;
    };
    //get eggscollection  report
    this.getEggscollectionReport = async function (req, Eggscollection) {
      try {
          return await pool.query(req, "call spc_eggscollection_report(?,?,?,?,?,?)",
          [
            Eggscollection.breederbatchid,
            Eggscollection.shedid,
            Eggscollection.fromdate,
            Eggscollection.todate,
            Eggscollection.frequency,
            Eggscollection.companyid

          ]);
      }
      catch (err) {
          console.log('Error thrown : ', err);
          log.dbErrorLog("Eggscollection - getEggscollectionReport", err);
      };
  
      return null;
  };   
  this.getbreedershed = async function (req, BreederBatch) {
    try {
        return await pool.query(req, "call spc_breedershedforreport_search(?)",
        [
          BreederBatch.breederbatchid

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("BreederBatch - getAllbreedershed", err);
    }

    return null;
}; 
this.getDailyBrodGrowReport = async function (req, BreederBatch) {
    try {
        return await pool.query(req, "call spc_dailybrodGrowReport_serch(?,?,?,?,?,?)",
        [
          BreederBatch.breederbatchid,
          BreederBatch.shedid,
          BreederBatch.fromdate,
          BreederBatch.todate,
          BreederBatch.frequency,
          BreederBatch.companyid,
          

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("BreederBatch - getDailyBrodGrowReport", err);
    }

    return null;
}; 
this.getflockgatherReport = async function (req, BreederBatch) {
    try {
        return await pool.query(req, "call spc_flockgather_report(?,?)",
        [
          BreederBatch.batchid,
          BreederBatch.companyid,
          

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("BreederBatch - getDailyBrodGrowReport", err);
    }

    return null;
};     
this.getdailyconsumptionReport = async function (req, BreederBatch) {
    try {
        return await pool.query(req, "call spc_dailyconsumption_report(?,?,?,?)",
        [
          BreederBatch.batchid,
          BreederBatch.fromdate,
          BreederBatch.todate,
          BreederBatch.companyid
          

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("BreederBatch - getdailyconsumptionReport", err);
    }

    return null;
};     



    //get Floct detail report
    this.getFlockDetailReport = async function (req, FlockDetail) {
     
        try {
            return await pool.query(req, "call spc_breederbatchdetail_report(?,?,?,?)",
            [
                FlockDetail.breederbatchid, 
                FlockDetail.fromdate,
                FlockDetail.todate,
                FlockDetail.companyid

  
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Eggscollection - getFlockDetailReport", err);
        }
        return null;
    };

    //get Floct detail report
    this.getFeddRequiredPlan = async function (req, FeedRequired) {
        try {
            return await pool.query(req, "call spc_feedrequiredplan_report(?,?,?,?,?)",
            [   FeedRequired.warehouseid,
                FeedRequired.breederbatchid, 
                FeedRequired.fromdate,
                FeedRequired.todate,
                FeedRequired.companyid
  
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("Eggscollection - getFeddRequiredPlan", err);
        }
        return null;
    };

    this.getItemWiseDailyConsumptionReport = async function (req, BreederBatch) {

        try {
            return await pool.query(req, "call spc_itemwise_dailyconsumption_report(?,?,?,?,?)",
            [   BreederBatch.batchid,
                BreederBatch.fromdate, 
                BreederBatch.todate,
                BreederBatch["itemid"] != null ? parseInt(BreederBatch.itemid) : null,
                BreederBatch.companyid
  
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getItemWiseDailyConsumptionReport", err);
        }
        return null;
    };
    this.getEggscollectiontilldate = async function (req, BreederBatch) {

        try {
            return await pool.query(req, "call spc_eggscollection_tilldate(?,?,?,?)",
            [   BreederBatch.breederbatchid,
                BreederBatch.shedid, 
                BreederBatch.collectiondate,
                BreederBatch.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getEggscollectiontilldate", err);
        }
        return null;
    };

    this.getFutureEggsCollectionReport = async function (req, BreederBatch) {

        try {
            return await pool.query(req, "call spc_futureeggscollection_livestock(?,?,?,?,?)",
            [   
                BreederBatch.fromdate,
                BreederBatch.todate,
                BreederBatch.shedid, 
                BreederBatch.breederbatchid,
                BreederBatch.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getFutureEggsCollectionReport", err);
        }
        return null;
    };

    this.getFeedDeviationReport = async function (req, BreederBatch) {

        try {
            return await pool.query(req, "call spc_breeder_feeddeviation_report(?,?,?,?,?)",
            [   
                BreederBatch.breederbatchid,
                BreederBatch.shedid,
                BreederBatch.fromdate,
                BreederBatch.todate, 
                BreederBatch.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getFeedDeviationReport", err);
        }
        return null;
    };
    
    this.getbatchwisedailypronconReport = async function (req, BreederBatch) {

        try {
            return await pool.query(req, "call spc_batchwisedailyproncon_finalonereport(?,?,?,?,?)",
            [   
                BreederBatch.breederbatchid,
                BreederBatch.shedid,
                BreederBatch.fromdate,
                BreederBatch.todate, 
                BreederBatch.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getbatchwisedailypronconReport", err);
        }
        return null;
    };

    this.flockExpencesBefore24WeekReport = async function (req, BreederBatch) {

        try {
            return await pool.query(req, "call spc_breeder_before_amortization_exp_reporst(?,?,?,?)",
            [   
                BreederBatch.batchid,
                BreederBatch.fromdate,
                BreederBatch.todate, 
                BreederBatch.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - flockExpencesBefore24WeekReport", err);
        }
        return null;
    };

    this.ParentBirdBalanceReport = async function (req, BreederBatch) {

        try {
            return await pool.query(req, "call spc_parent_bird_balance(?,?,?,?)",
            [   
                BreederBatch.batchid,
                BreederBatch.fromdate,
                BreederBatch.todate, 
                BreederBatch.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - ParentBirdBalanceReport", err);
        }
        return null;
    };

    this.flocksummaryReport = async function (req, BreederBatch) {
            
        try {
            return await pool.query(req, "call spc_flockproduction_summary(?,?)",

            [   
                BreederBatch.breederbatchid,
                BreederBatch.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - flocksummaryReport", err);
        }
        return null;
    };

    this.getFarmPerformanceReport = async function (req, BreederBatch) {
            
        try {
            return await pool.query(req, "call spc_farm_performace_report(?,?,?)",

            [   
                BreederBatch.fromdate,
                BreederBatch.todate, 
                BreederBatch.batchid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getFarmPerformanceReport", err);
        }
        return null;
    };

    this.getFlockWiseCostAnalysisReport = async function (req, BreederBatch) {
            
        try {
            return await pool.query(req, "call spc_flockanalysis_report(?,?,?,?)",

            [   
                BreederBatch.fromdate,
                BreederBatch.todate, 
                BreederBatch.batchid,
                BreederBatch.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getFlockWiseCostAnalysisReport", err);
        }
        return null;
    };

    this.getFlockWiseCostAnalysisReportPartOne = async function (req, BreederBatch) {
            
        try {
            return await pool.query(req, "call spc_flockanlysis_reportpartone(?,?,?,?)",

            [   
                BreederBatch.fromdate,
                BreederBatch.todate, 
                BreederBatch.batchid,
                BreederBatch.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getFlockWiseCostAnalysisReportPartOne", err);
        }
        return null;
    };

    this.getParentBirdBalanceStockWithAllDetail = async function (req, BreederBatch) {
            
        try {
            return await pool.query(req, "call spc_parentbirdstockbalancealldetail_breeder(?,?,?)",

            [   
                BreederBatch.batchid,
                BreederBatch.todate, 
                BreederBatch.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getParentBirdBalanceStockWithAllDetail", err);
        }
        return null;
    };

    this.getshedwisefarmperformancereport = async function (req, BreederBatch) {
        try {
            return await pool.query(req, "call spc_shedwiseflockperformance_report(?,?)",
            [
              BreederBatch.breederbatchid,
              BreederBatch.companyid
    
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getshedwisefarmperformancereport", err);
        }
    
        return null;
    }; 

    // Flockwise profit and loss report

    this.getbatchwiseprofitandlossReport = async function (req, BreederBatch) {

        try {
            return await pool.query(req, "call spc_breederbatchwise_profitandloss(?,?,?,?)",
            [   
                BreederBatch.breederbatchid,
                BreederBatch.fromdate,
                BreederBatch.todate, 
                BreederBatch.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getbatchwiseprofitandlossReport", err);
        }
        return null;
    };
	
	// Egg Stock report

    this.getEggStockReport = async function (req, BreederBatch) {

        try {
            return await pool.query(req, "call spc_eggstock_report(?,?,?)",
            [   
                BreederBatch.fromdate,
                BreederBatch.todate,
		BreederBatch.breederbatchids
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getEggStockReport", err);
        }
        return null;
    };

    
    	// Batch Valuation report

    this.getBatchValuationReport= async function (req, BreederBatch) {

        try {
            return await pool.query(req, "call spc_batchvaluation_report(?,?)",
            [   
                BreederBatch.breederbatchid,
                BreederBatch.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("BreederBatch - getBatchValuationReport", err);
        }
        return null;
    };



};
  
module.exports = breederReportsRepository;