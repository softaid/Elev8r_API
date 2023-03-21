let hatcheryReportsRepository = function (pool, log) {

    //get setter batch report
    this.getSetterBatchReport = async function (req, SetterBatch) {
        try {
            return await pool.query(req, "call spc_settingreport_select1(?,?,?)",
                [
                    SetterBatch.fromdate,
                    SetterBatch.todate,
                    SetterBatch.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getSetterBatchReport", err);
        }

        return null;
    };



    //get hatch batch report
    this.getHatchReport = async function (req, HatchBatch) {
        try {
            return await pool.query(req, "call spc_hatchreport_select1(?,?,?)",
                [
                    HatchBatch.fromdate,
                    HatchBatch.todate,
                    HatchBatch.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getHatchReport", err);
        }

        return null;
    };

    //get Economy report
    this.getEconomyReport = async function (req, Economy) {
        try {
            return await pool.query(req, "call spc_chickseconomyreport_select(?,?,?)",
                [
                    Economy.fromdate,
                    Economy.todate,
                    Economy.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getEconomyReport", err);
        }

        return null;
    };

    //get Candling Test Report
    this.getCandlingTestReport = async function (req, Economy) {
        try {
            return await pool.query(req, "call spc_candlingtestreport_select1(?,?,?)",
                [
                    Economy.fromdate,
                    Economy.todate,
                    Economy.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getCandlingTestReport", err);
        }

        return null;
    };

    //get Setting  Report With Bin Quantity
    this.getSettingReportWithBinQty = async function (req, Economy) {
        try {
            return await pool.query(req, "call spc_settingreportwithbinqty_report(?,?,?)",
                [
                    Economy.fromdate,
                    Economy.todate,
                    Economy.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getSettingReportWithBinQty", err);
        }

        return null;
    };

    //get Transfer to Hatcher Report
    this.getTransferToHatcher = async function (req, Economy) {
        try {
            return await pool.query(req, "call spc_transfertohatcher_report(?,?,?)",
                [
                    Economy.fromdate,
                    Economy.todate,
                    Economy.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getTransferToHatcher", err);
        }

        return null;
    };

    //get Egg collection value Report
    this.getEggcollectionValueWthControlValue = async function (req, Economy) {
        try {
            return await pool.query(req, "call spc_eggcollectionvaluewithcontrolvalue_report(?,?,?)",
                [
                    Economy.fromdate,
                    Economy.todate,
                    Economy.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getEggcollectionValueWthControlValue", err);
        }

        return null;
    };

    // Sale Module Reports
    // get Iten Wise Sale Report 
    this.getItemWiseSaleReport = async function (req, salesreports) {
        try {
            return await pool.query(req, "call spc_itemwisesalereport_report(?,?,?,?)",
                [
                    salesreports.fromdate,
                    salesreports.todate,
                    salesreports.itemid,
                    salesreports.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("saleReportsRepository - getItemWiseSaleReport", err);
        }

        return null;
    };

    // get Customer Wise Sale Report 
    this.getCustomerWiseSaleReport = async function (req, salesreports) {
        try {
            return await pool.query(req, "call spc_customerwisesalereport_report(?,?,?,?)",
                [
                    salesreports.fromdate,
                    salesreports.todate,
                    salesreports.partyid,
                    salesreports.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("saleReportsRepository - getCustomerWiseSaleReport", err);
        }

        return null;
    };

    // get Customer Wise Sale without Group Report 
    this.getCustomerWiseSaleWithoutGroupReport = async function (req, salesreports) {
        try {
            return await pool.query(req, "call spc_customerwisesalewithoutgroupreport_report(?,?,?,?)",
                [
                    salesreports.fromdate,
                    salesreports.todate,
                    salesreports.partyid,
                    salesreports.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("saleReportsRepository - getCustomerWiseSaleWithoutGroupReport", err);
        }

        return null;
    };

    // get Item Wise Sale Summary Report 
    this.getItemWiseSaleSummaryReport = async function (req, salesreports) {
        try {
            return await pool.query(req, "call spc_itemwisesalesummary_report(?,?,?)",
                [
                    salesreports.fromdate,
                    salesreports.todate,
                    salesreports.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("saleReportsRepository - getItemWiseSaleSummaryReport", err);
        }

        return null;
    };

    // get Collection Summary Report 
    this.getCollectionSummaryReport = async function (req, salesreports) {
        try {
            return await pool.query(req, "call spc_collectionsummary_report(?,?,?,?)",
                [
                    salesreports.fromdate,
                    salesreports.todate,
                    salesreports.partyid,
                    salesreports.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("saleReportsRepository - getCollectionSummaryReport", err);
        }

        return null;
    };

    // get Sale Summary Report 
    this.getSaleSummaryReport = async function (req, salesreports) {
        try {
            return await pool.query(req, "call spc_salesummary_report(?,?,?,?)",
                [
                    salesreports.fromdate,
                    salesreports.todate,
                    salesreports.partyid,
                    salesreports.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("saleReportsRepository - getSalSummaryReport", err);
        }

        return null;
    };

    //get Partbylocatinid for Production Report in Hatchery
    this.getPartbyLocatid = async function (req, Hatchery) {
        try {
            return await pool.query(req, "call spc_party_bylocation(?,?)",
                [
                    Hatchery.locationid,
                    Hatchery.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getPartbyLocatid", err);
        }

        return null;
    };

    //get Breederbatchbylocatinid for Production Report in Hatchery
    this.getBreederBatchbyLocatid = async function (req, Hatchery) {
        try {
            return await pool.query(req, "call spc_breederbtch_bylocation(?,?)",
                [
                    Hatchery.locationid,
                    Hatchery.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getBreederBatchbyLocatid", err);
        }

        return null;
    };

    //get Hatchery Production Report
    this.getHatcheryProductionReport = async function (req, Hatchery) {
        try {
            return await pool.query(req, "call spc_hatcheryproduction_report(?,?,?,?)",
                [
                    Hatchery.locationid,
                    Hatchery.breederbatchid,
                    Hatchery.partyid,
                    Hatchery.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getHatcheryProductionReport", err);
        }

        return null;
    };
	
    //get all hatcherybatches by locationid
    this.getAllhtacherbatch = async function (req, Hatchery) {
        try {
            return await pool.query(req, "call spc_gethatcherbatch_bylocationid(?,?)",
                [
                    Hatchery.locationid,
                    Hatchery.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getAllhtacherbatch", err);
        }

        return null;
    };

    //get all hatcherybatches by locationid
    this.getHatcheryvaccinationReport = async function (req, Hatchery) {
        try {
            return await pool.query(req, "call spc_hatcheryvaccination_report(?,?,?)",
                [
                    Hatchery.locationid,
                    Hatchery.hatcherbatchid,
                    Hatchery.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("hatcheryReportsRepository - getHatcheryvaccinationReport", err);
        }

        return null;
    };


};

module.exports = hatcheryReportsRepository;