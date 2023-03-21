let saleReportsRepository = function (pool, log) {
    
 


this.getItemWiseSaleReport = async function (req, salesreports) {
    
    try {
        return await pool.query(req, "call spc_itemwisesalereport_report(?,?,?,?)",
        [
          salesreports.fromdate,
          salesreports.todate,
          salesreports.partyid,
          salesreports.companyid
        ]);
    }
    catch (err) {
        console.log('Error thrown : ', err);
        log.dbErrorLog("saleReportsRepository - getItemWiseSaleReport", err);
    }

    return null;
};  

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


};
    
module.exports = saleReportsRepository;
