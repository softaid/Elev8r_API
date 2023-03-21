
var https = require('https');

let commondashboard = function (pool, log) {
    this.getOverDueInvoices = async function (req, DashBoard) {
        try {
            return await pool.query(req, "call spc_sales_invoice_overdue_detail(?,?)", [
                DashBoard.company_id,
                DashBoard.to_date

            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("commondashboard.service - getOverDueInvoices", err);
        }
        return null;
    };

    this.getOverDuePIInvoices = async function (req, DashBoard) {
        try {
            return await pool.query(req, "call spc_purchase_invoice_overdue_detail(?,?)", [
                DashBoard.company_id,
                DashBoard.to_date

            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("commondashboard.service - getOverDueInvoices", err);
        }
        return null;
    };





    // get common dashboard 
    this.getCommonDashboard = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_common_dashboard_search(?,?)",
                [
                    Common.company_id,
                    Common.to_date
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("commondashboard.service - getCommonDashboard", err);
        }
        return null;
    };

     // get common dashboard 
     this.getCommonDashboardPandL = async function (req, Common) {
        try {
            return await pool.query(req, "call spc_common_dashboard_profitandloss(?,?)",
                [
                    Common.to_date,
                    Common.company_id
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("commondashboard.service - getCommonDashboardPandL", err);
        }
        return null;
    };

};

module.exports = commondashboard;


