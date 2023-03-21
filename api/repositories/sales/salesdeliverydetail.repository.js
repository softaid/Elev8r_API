let salesdeliverydetailRepository = function (pool, log) {
    
    this.getAllSalesDeliveryDetail = async function (req, SalesDeliveryDetail) {
        try {
            return await pool.query(req, "call spc_salesdeliverydetail_search(?,?)",
            [
                SalesDeliveryDetail.salesdeliveryid,
                SalesDeliveryDetail.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdeliverydetail.service - getAllSalesDeliveryDetail", err);
        } 
        return null;
    };

    this.getSalesDeliveryDetail = async function (req, SalesDeliveryDetail) {
        try {
            return await pool.query(req, "call spc_salesdeliverydetail_select(?)",
            [
                SalesDeliveryDetail.id,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdeliverydetail.service - getSalesDeliveryDetail", err);
        }
    
        return null;
    };    

    this.saveSalesDeliveryDetail = async function (req, SalesDeliveryDetail) {
        try {
            var sp_text = "SET @out_id = 0; call spc_salesdeliverydetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                    SalesDeliveryDetail["id"] != null ? parseInt(SalesDeliveryDetail.id) : null,
                    parseInt(SalesDeliveryDetail.salesdeliveryid),
                    SalesDeliveryDetail["salesorderdetailid"] != null ? parseInt(SalesDeliveryDetail.salesorderdetailid) : null,
                    parseInt(SalesDeliveryDetail.itemid),
                    parseFloat(SalesDeliveryDetail.deliveryquantity),
                    SalesDeliveryDetail["isbird"] != null ? parseInt(SalesDeliveryDetail.isbird) : null,
                    SalesDeliveryDetail["weight"] != null ? parseFloat(SalesDeliveryDetail.weight) : null,
                    SalesDeliveryDetail["itemunitid"] != null ? parseInt(SalesDeliveryDetail.itemunitid) : null,
                    SalesDeliveryDetail["materialissueid"] != null ? parseInt(SalesDeliveryDetail.materialissueid) : null,
                    SalesDeliveryDetail["warehousebinid"] != null ? parseInt(SalesDeliveryDetail.warehousebinid) : null,
                    SalesDeliveryDetail["statusid"] != null ? parseInt(SalesDeliveryDetail.statusid) : null,
                    parseInt(SalesDeliveryDetail.companyid),
                    parseFloat(SalesDeliveryDetail.rate),                      
                    SalesDeliveryDetail["itemdiscount"] != null ? parseFloat(SalesDeliveryDetail.itemdiscount) : null,
                    SalesDeliveryDetail["taxid"] != null ? parseInt(SalesDeliveryDetail.taxid) : null,
                    SalesDeliveryDetail["taxpercent"] != null ? parseFloat(SalesDeliveryDetail.taxpercent) : null,
		    SalesDeliveryDetail["batchid"] != null ? parseInt(SalesDeliveryDetail.batchid) : null,
                    parseInt(SalesDeliveryDetail.userid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdeliverydetail.service-saveSalesDeliveryDetail", err);
        }
        return null;
    }

    this.deleteSalesDeliveryDetail = async function (req, SalesDeliveryDetail) {
        try {
                return await pool.query(req, "call spc_salesdeliverydetail_delete(?,?,?)",                       
                    [
                        parseInt(SalesDeliveryDetail.id),
                        parseInt(SalesDeliveryDetail.companyid),
                        parseInt(SalesDeliveryDetail.userid)            
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("salesdeliverydetail.service-deleteSalesDeliveryDetail", err);
        }
        return null;
    }

};
    
module.exports = salesdeliverydetailRepository;