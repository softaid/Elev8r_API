let layerReportsRepository = function (pool, log) {
    

    this.getAlllayerbatch = async function (req, LayerBatch) {
        try {
            return await pool.query(req, "call spc_layereggscollection_batch_search(?,?)",
            [
              LayerBatch.companyid,
              LayerBatch.locationid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerBatch - getAllLayerBatch", err);
        }
    
        return null;
    };   

      this.getLocationwiselayerbatches = async function (req, LayerBatch) {
        try {
            return await pool.query(req, "call spc_layerbatch_bylocation(?,?)",
            [
                
                LayerBatch.companyid,
                LayerBatch.locationid
              
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerBatch - getLocationwiselayerbatches", err);
        }
    
        return null;
    };   

    //  //get shed by LayerBatchid

     this.getLayerShedByBatchid = async function (req, LayerBatch) {
        try {
            return await pool.query(req, "call spc_layereggscollection_forshed(?)",
            [   LayerBatch.layerbatchid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerBatch.service - getLayerShedByBatchid", err);
        } 
        return null;
    };
    //get eggscollection  report
    this.getLayerEggscollectionReport = async function (req, Eggscollection) {
      try {
          return await pool.query(req, "call spc_layereggscollection_report(?,?,?,?,?,?)",
          [
            Eggscollection.layerbatchid,
            Eggscollection.shedid,
            Eggscollection.fromdate,
            Eggscollection.todate,
            Eggscollection.frequency,
            Eggscollection.companyid

          ]);
      }
      catch (err) {
          console.log('Error thrown : ', err);
          log.dbErrorLog("Eggscollection - getLayerEggscollectionReport", err);
      };
  
      return null;
  };   
  this.getlayershed = async function (req, LayerBatch) {
    try {
        return await pool.query(req, "call spc_layershedforreport_search(?)",
        [
          LayerBatch.layerbatchid

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("LayerBatch - getlayershed", err);
    }

    return null;
}; 

this.getLayerDailyBrodGrowReport = async function (req, LayerBatch) {
    try {
        return await pool.query(req, "call spc_layerdailybrodGrowReport_search(?,?,?,?,?,?)",
        [
          LayerBatch.layerbatchid,
          LayerBatch.shedid,
          LayerBatch.fromdate,
          LayerBatch.todate,
          LayerBatch.frequency,
          LayerBatch.companyid,
          

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("LayerBatch - getLayerDailyBrodGrowReport", err);
    }

    return null;
}; 
this.getlayerflockgatherReport = async function (req, LayerBatch) {
    try {
        return await pool.query(req, "call spc_flockgatherlayer_report(?,?)",
        [
          LayerBatch.batchid,
          LayerBatch.companyid,
          

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("LayerBatch - getlayerflockgatherReport", err);
    }

    return null;
};     
this.getlayerdailyconsumptionReport = async function (req, LayerBatch) {
    try {
        return await pool.query(req, "call spc_layerdailyconsumption_report(?,?,?,?)",
        [
          LayerBatch.batchid,
          LayerBatch.fromdate,
          LayerBatch.todate,
          LayerBatch.companyid
          

        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("LayerBatch - getlayerdailyconsumptionReport", err);
    }

    return null;
};     



    // //get Floct detail report
    this.getLayerFlockDetailReport = async function (req, LayerFlockDetail) {
        console.log("layerbatchidid",LayerFlockDetail);
        try {
            return await pool.query(req, "call spc_layerflockdetailreport_search(?,?,?,?)",
            [
                LayerFlockDetail.layerbatchid, 
                LayerFlockDetail.fromdate,
                LayerFlockDetail.todate,
                LayerFlockDetail.companyid
  
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getLayerFlockDetailReport", err);
        }
    };

    this.getLayerFeedDeviationReport = async function (req, LayerFlockDetail) {

        try {
            return await pool.query(req, "call spc_layer_feeddeviation_report(?,?,?,?,?)",
            [   
                LayerFlockDetail.layerbatchid,
                LayerFlockDetail.shedid,
                LayerFlockDetail.fromdate,
                LayerFlockDetail.todate, 
                LayerFlockDetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getLayerFeedDeviationReport", err);
        }
        return null;
    };

    this.getItemWiseLyrDailyConsumptionReport = async function (req, LayerFlockDetail) {

        try {
            return await pool.query(req, "call spc_itemwise_lyr_dailyconsumption_report(?,?,?,?,?)",
            [   LayerFlockDetail.batchid,
                LayerFlockDetail.fromdate, 
                LayerFlockDetail.todate,
                LayerFlockDetail.itemid,
                LayerFlockDetail.companyid
  
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getItemWiseLyrDailyConsumptionReport", err);
        }
        return null;
    };

    this.getLyrEggscollectiontilldate = async function (req, LayerFlockDetail) {

        try {
            return await pool.query(req, "call spc_layer_eggscollection_tilldate(?,?,?,?)",
            [   LayerFlockDetail.layerbatchid,
                LayerFlockDetail.shedid, 
                LayerFlockDetail.collectiondate,
                LayerFlockDetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getLyrEggscollectiontilldate", err);
        }
        return null;
    };

    this.getLyrFutureEggsCollectionReport = async function (req, LayerFlockDetail) {

        try {
            return await pool.query(req, "call spc_lyr_futureeggscollection_livestock(?,?,?,?,?)",
            [   
                LayerFlockDetail.fromdate,
                LayerFlockDetail.todate,
                LayerFlockDetail.shedid, 
                LayerFlockDetail.layerbatchid,
                LayerFlockDetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getLyrFutureEggsCollectionReport", err);
        }
        return null;
    };

    this.getParentBirdBalanceStockWithAllDetail = async function (req, LayerFlockDetail) {
            
        try {
            return await pool.query(req, "call spc_parentbirdstockbalancealldetail_Layerone(?,?,?)",

            [   
                LayerFlockDetail.batchid,
                LayerFlockDetail.todate, 
                LayerFlockDetail.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getParentBirdBalanceStockWithAllDetail", err);
        }
        return null;
    };

    this.getParentBirdBalance = async function (req, LayerFlockDetail) {
            
        try {
            return await pool.query(req, "call spc_parent_bird_balance_report_layer_final(?,?,?,?)",

            [   
                LayerFlockDetail.batchid,
                LayerFlockDetail.fromdate, 
                LayerFlockDetail.todate, 
                LayerFlockDetail.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getParentBirdBalance", err);
        }
        return null;
    };

    this.getFlockExpencesBefore19Week = async function (req, LayerFlockDetail) {
            
        try {
            return await pool.query(req, "call spc_layer_before_amortization_exp_reporst(?,?,?,?)",

            [   
                LayerFlockDetail.batchid,
                LayerFlockDetail.fromdate, 
                LayerFlockDetail.todate, 
                LayerFlockDetail.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getFlockExpencesBefore19Week", err);
        }
        return null;
    };

    this.getFlockWisecostanalysisReport = async function (req, LayerFlockDetail) {
            
        try {
            return await pool.query(req, "call spc_flockanalysislayer_report(?,?,?,?)",

            [   LayerFlockDetail.fromdate, 
                LayerFlockDetail.todate, 
                LayerFlockDetail.batchid,
                LayerFlockDetail.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getFlockWisecostanalysisReport", err);
        }
        return null;
    };

    this.getFlockWisecostanalysispartoneReport = async function (req, LayerFlockDetail) {
            
        try {
            return await pool.query(req, "call spc_flockanlysislayer_reportpartone(?,?,?,?)",

            [   LayerFlockDetail.fromdate, 
                LayerFlockDetail.todate, 
                LayerFlockDetail.batchid,
                LayerFlockDetail.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getFlockWisecostanalysispartoneReport", err);
        }
        return null;
    };

    this.getAlllayerbatchbywarehouse = async function (req, LayerFlockDetail) {
        try {
            return await pool.query(req, "call spc_layerbatch_bywarehouseid(?,?)",
            [
                LayerFlockDetail.companyid,
                LayerFlockDetail.warehouseid
  
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getAlllayerbatchbywarehouse", err);
        }
    
        return null;
    };   

    this.layerflocksummaryReport = async function (req, LayerFlockDetail) {
            console.log("req",req);
        try {
            return await pool.query(req, "call spc_layerflockproduction_summary(?,?)",

            [   
                LayerFlockDetail.batchid,
                LayerFlockDetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - layerflocksummaryReport", err);
        }
        return null;
    }; 
     this.getBatchDetailData = async function (req, LayerFlockDetail) {
            
        try {
            return await pool.query(req, "call spc_layerflockdetaildatareport(?,?,?,?)",

            [   
                LayerFlockDetail.fromdate, 
                LayerFlockDetail.todate, 
                LayerFlockDetail.layerbatchid,
                LayerFlockDetail.companyid
                
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail - getBatchDetailData", err);
        }
        return null;
    };            

    
    // Batch Valuation report

    this.getLayerBatchValuationReport= async function (req, LayerFlockDetail) {

        try {
            return await pool.query(req, "call spc_layerbatchvaluation_report(?,?)",
            [   
                LayerFlockDetail.layerbatchid,
                LayerFlockDetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail- getLayerBatchValuationReport", err);
        }
        return null;
    };
                                                                                                                     

    // Flockwise profit and loss report

    this.getlayerbatchwiseprofitandlossReport= async function (req, LayerFlockDetail) {

        try {
            return await pool.query(req, "call spc_layerbatchwise_profitandloss(?,?,?,?)",
            [   
                LayerFlockDetail.layerbatchid,
		LayerFlockDetail.fromdate,
                LayerFlockDetail.todate, 
                LayerFlockDetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("LayerFlockDetail- getlayerbatchwiseprofitandlossReport", err);
        }
        return null;
    };


};
  
module.exports = layerReportsRepository;
