let CBFReportsRepository = function (pool, log) {

    // All CBF Report Repository


    this.getAllBatchReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfbatchstatus_report(?,?,?)",
                [
                    CBF.branch_id,
                    CBF.line_id,
                    parseInt(CBF.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllBatchReport", err);
        }

        return null;
    };
    this.getAllBatchsheduleReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfbatchschedule_report(?,?,?)",
                [
                    CBF.branchid,
                    CBF.id,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllBatchsheduleReport", err);
        }

        return null;
    };


    this.getAllLine = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbflinename_bybranchname(?,?)",
                [
                    CBF.branchid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllLine", err);
        }

        return null;
    };



    this.getAllChickPlacementReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfchickplacementregister_report(?,?,?,?,?)",
                [
                    CBF.fromdate,
                    CBF.todate,
                    CBF.branch_id,
                    CBF.line_id,
                    parseInt(CBF.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllChickPlacementReport", err);
        }

        return null;
    };


    this.getAllLineChickPlacement = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_commonbranchlinebybranchid_report(?,?)",
                [

                    CBF.branchid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllLineChickPlacement", err);
        }

        return null;
    };
    this.getDensityReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfdensityregister_report(?,?,?,?,?,?,?)",
                [
                    CBF.fromdate,
                    CBF.todate,
                    CBF.fromage,
                    CBF.toage,
                    CBF.branch_id,
                    CBF.line_id,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getDensityReport", err);
        }

        return null;
    };

    this.getAllBatchFarmerListReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbffarmerlist_report(?,?,?,?)",
                [
                    CBF.branch_id,
                    CBF.line_id,
                    CBF.status_id,
                    parseInt(CBF.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllBatchFarmerListReport", err);
        }

        return null;
    };

    this.getAllLineWithStatus = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfcommonbranch_bylineandstatus(?,?)",
                [
                    CBF.branchid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllLineWithStatus", err);
        }

        return null;
    };

    this.getAllFarmer = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbffarmername_byline(?,?)",
                [

                    CBF.branchlineid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllFarmer", err);
        }

        return null;
    };

    this.getAllFarmerByBranchname = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbffarmername_bybranchname(?,?)",
                [

                    CBF.branch_id,
                    CBF.company_id

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllFarmerByBranchname", err);
        }

        return null;
    };




    this.getAllFarm = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbffarmname_byfarmername(?,?)",
                [

                    CBF.framerid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllFarm", err);
        }

        return null;
    };

    this.getAllBatch = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfbatch_byfarmname(?,?)",
                [

                    CBF.farmid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllBatch", err);
        }

        return null;
    };


    this.getAllShedByFarmer = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfshed_byfarmname(?,?)",
                [

                    CBF.farmid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllShedByFarmer", err);
        }

        return null;
    };

    this.getAllBatchByShed = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfbatch_byshedname(?,?)",
                [

                    CBF.shedid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllBatchByShed", err);
        }

        return null;
    };

    this.getAllBatchAgeMortalityReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfagewisemortality_report(?,?)",
                [
                    CBF.batch_id,
                    parseInt(CBF.companyid)

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllBatchAgeMortalityReport", err);
        }

        return null;
    };

      this.cbfDeviationReport = async function (req, cbfReport) {
        try {
            return await pool.query(req, "call spc_cbffeeddeviation_report(?,?,?,?)",
                [
                    cbfReport.batch_id,
                    cbfReport.fromdate,
                    cbfReport.todate,
                    cbfReport.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("cbfReport - cbfDeviationReport", err);
        }
        return null;
    };

    this.getAllBatchOfMaterialTransfer = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfmaterialtransferfinal_report(?,?,?,?)",
                [
                    CBF.fromdate,
                    CBF.todate,
                    CBF.batchid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllBatchOfMaterialTransfer", err);
        }

        return null;
    };

    this.getAllBatchOfLivestock = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfstockoflivebird_report(?,?,?,?)",
                [
                    CBF.curdate,
                    CBF.branch_id,
                    CBF.line_id,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllBatchOfLivestock", err);
        }

        return null;
    };


    this.getAllFarmerNameByParty = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_farmernamebypartyname(?)",
                [

                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllFarmerNameByParty", err);
        }

        return null;
    };



    this.getBirdSalesRegisterReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_birdsalesregister_report(?,?,?,?)",
                [
                    CBF.fromdate,
                    CBF.todate,
                    CBF.customerid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getBirdSalesRegisterReport", err);
        }

        return null;
    };

     this.getWeightFCRreport = async function (req, CBF) {
        console.log("req",req);
        try {
            return await pool.query(req, "call spc_cbfweekwisebodyweightfcr_report(?,?,?,?,?,?,?)",
                [
                    CBF.curdate,
                    CBF.branchid,
                    CBF.lineid,
                    CBF.farmerid,
                    CBF.farmid,
                    CBF.batch_id,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getWeightFCRreport", err);
        }

        return null;
    };

    this.getBirdForSaleReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfreadybirdforsale_report(?,?,?,?,?,?,?)",
                [
                    CBF.curdate,
                    CBF.branch_id,
                    CBF.fromage,
                    CBF.toage,
                    CBF.fromweight,
                    CBF.toweight,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getBirdForSaleReport", err);
        }

        return null;
    };

    this.getAllSupervisor = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_supervisorname_byline(?,?)",
                [

                    CBF.branchlineid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllSupervisor", err);
        }

        return null;
    };

    this.getDailySupervisiorReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfdailysupervisior_report(?,?,?,?,?)",
                [
                    CBF.curdate,
                    CBF.branch_id,
                    CBF.line_id,
                    CBF.empid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getDailySupervisiorReport", err);
        }

        return null;
    };

    this.getBatchDetailsReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfbatchdetails_report(?,?)",
                [
                    CBF.cbf_batchid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getBatchDetailsReport", err);
        }

        return null;
    };

    this.getBatchWiseBirdCostReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfbatchwisebirdcostreport_report(?,?,?)",
                [
                    CBF.placementdate,
                    CBF.cbf_batchid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getBatchWiseBirdCostReport", err);
        }

        return null;
    };

    this.getFarmperformanceReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbffarmperformance_report(?,?,?,?)",
                [
                    CBF.fromdate,
                    CBF.todate,
                    CBF.farm_id,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getFarmperformanceReport", err);
        }

        return null;
    };

    this.getBroilerBirdBalanceReport = async function (req, CBF) {
        console.log("getBroilerBirdBalanceReport",req);
        try {
            return await pool.query(req, "call spc_cbfbroilerbirdbalance_report(?,?,?,?)",
                [
                    CBF.farm_id,
                    CBF.batchid,
                    CBF.todate,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getBroilerBirdBalanceReport", err);
        }

        return null;
    };

     this.getGrowingchargesReport = async function (req, CBF) {
        console.log("getGrowingchargesReport",req);
        try {
            return await pool.query(req, "call spc_getgrowingchargesdetailreport_bycbfbatchid(?,?)",
                [
                    CBF.batchid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getGrowingchargesReport", err);
        }

        return null;
    };


    // this.BroilerBatchFinancialPerformanceReport = async function (req, CBF) {
    //     try {
    //         return await pool.query(req, "call spc_cbfBroiler_Batch_Financial_Performance_report(?,?,?,?)",
    //             [
    //                 CBF.farm_id,
    //                 CBF.batchid,
    //                 CBF.todate,
    //                 CBF.companyid

    //             ]);
    //     }
    //     catch (err) {
    //         console.log('Error thrown : ', err);
    //         log.dbErrorLog("CBF - getBroilerBirdBalanceReport", err);
    //     }

    //     return null;
    // };

    this.BroilerBatchFinancialPerformanceReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfBroiler_Batch_Financial_Performance_report(?,?,?,?)",
                [
                    CBF.farmid,
                    CBF.fromdate,
                    CBF.todate,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - BroilerBatchFinancialPerformanceReport", err);
        }

        return null;
    };
    this.BroilerBatchReconcilationPerformanceReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_cbfBroiler_Batch_Reconcilation_report(?,?,?,?)",
                [
                    CBF.batchid,
                    CBF.fromdate,
                    CBF.todate,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - BroilerBatchReconcilationPerformanceReport", err);
        }

        return null;
    };

    this.getFarmerstockReport = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_farmerstock_report(?,?)",
                [
                    CBF.batchid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getFarmerstockReport", err);
        }

        return null;
    };

    // CBF shed Name by Batch id
    this.getAllShedid = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_shedname_bybatch(?,?)",
                [

                    CBF.batchid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getAllShedid", err);
        }

        return null;
    };

    this.getBirdSalesRegisterReportBatchwise = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_birdsalesregisterbatchwise_report(?,?,?,?,?,?)",
                [
                    CBF.fromdate,
                    CBF.todate,
                    CBF.batchid,
                    CBF.shedid,
                    CBF.customerid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getBirdSalesRegisterReportBatchwise", err);
        }

        return null;
    };

    // CBF document collection report by farmer enquiry
    
    this.getCbfDocumentCollectionByEnquiryid = async function (req, CBF) {
        try {
            return await pool.query(req, "call spc_getCbfDocumentCollection_byenquiryid(?)",
                [
                    CBF.farmerenquiryid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getCbfDocumentCollectionByEnquiryid", err);
        }

        return null;
    };

    this.getPendingGCReport = async function (req, CBF) {
        console.log("getPendingGCReport",req);
        try {
            return await pool.query(req, "call spc_pendinggc_report(?,?)",
                [
                    CBF.branchid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getPendingGCReport", err);
        }

        return null;
    };

    this.getPaymentPendingGCReport = async function (req, CBF) {
        console.log("getPaymentPendingGCReport",req);
        try {
            return await pool.query(req, "call spc_pendingpaymentgc_report(?,?)",
                [
                    CBF.branchid,
                    CBF.companyid

                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("CBF - getPaymentPendingGCReport", err);
        }

        return null;
    };






};

module.exports = CBFReportsRepository;
