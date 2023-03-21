let servicepodetailRepository = function (pool, log) {
    
    //get All Service PoDeatil
    this.getAllServicePoDetail = async function (req, servicepodetail) {
        try {
            return await pool.query(req, "call spc_servicepodetail_search(?)",
            [   
                servicepodetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("servicepodetail.service - getAllServicePoDetail", err);
        } 
        return null;
    };

     //get servicePoDeatil

     this.getServicePoDetail = async function (req, servicepodetail) {
         console.log("servicepodetail",servicepodetail);
        try {
            return await pool.query(req, "call spc_servicepodetail_select(?,?)",
            [    
                servicepodetail.servicepoid,
                servicepodetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("servicepodetail.service - getServicePoDetail", err);
        } 
        return null;
    };
   
  
     // save servicePoDeatil 
    this.saveServicePoDetail = async function (req, servicepodetail) {
        console.log("saveServicePoDetail",servicepodetail);
        
        try {
                var sp_text = "SET @out_id = 0; call spc_servicepodetail_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        servicepodetail["id"] != null ? parseInt(servicepodetail.id) : null,
                        parseInt(servicepodetail.servicepoid),
                        servicepodetail.servicename,
                        servicepodetail.description,
                        parseInt(servicepodetail.itemid),
                        servicepodetail.itemname,
                        parseFloat(servicepodetail.quantity),
                        parseInt(servicepodetail.unitid),
                        parseFloat(servicepodetail.rate), 
                        parseFloat(servicepodetail.discountpercent),
                        parseFloat(servicepodetail.discountamt),
                        parseFloat(servicepodetail.netamount), 
                        servicepodetail["taxid"] != null ? parseInt(servicepodetail.taxid) : null,
                        servicepodetail["taxpercent"] != null ? parseFloat(servicepodetail.taxpercent) : null,
                        servicepodetail["cgstid"] != null ? parseInt(servicepodetail.cgstid) : null,
                        servicepodetail["cgstpercent"] != null ? parseFloat(servicepodetail.cgstpercent) : null,
                        servicepodetail["cgstamount"] != null ? parseFloat(servicepodetail.cgstamount) : null,
                        servicepodetail["sgstid"] != null ? parseInt(servicepodetail.sgstid) : null,
                        servicepodetail["sgstpercent"] != null ? parseFloat(servicepodetail.sgstpercent) : null,
                        servicepodetail["sgstamount"] != null ? parseFloat(servicepodetail.sgstamount) : null,
                        servicepodetail["igstid"] != null ? parseInt(servicepodetail.igstid) : null,
                        servicepodetail["igstpercent"] != null ? parseFloat(servicepodetail.igstpercent) : null,
                        servicepodetail["igstamount"] != null ? parseFloat(servicepodetail.igstamount) : null,
                        servicepodetail["ugstid"] != null ? parseInt(servicepodetail.ugstid) : null,
                        servicepodetail["utgstpercent"] != null ? parseFloat(servicepodetail.utgstpercent) : null,
                        servicepodetail["utgstamount"] != null ? parseFloat(servicepodetail.utgstamount) : null,
                        servicepodetail["vatid"] != null ? parseInt(servicepodetail.vatid) : null,
                        servicepodetail["vatpercent"] != null ? parseFloat(servicepodetail.vatpercent) : null,
                        servicepodetail["vatamount"] != null ? parseFloat(servicepodetail.vatamount) : null,
                        parseInt(servicepodetail.companyid),
                        parseInt(servicepodetail.userid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("servicepodetail.service-saveServicePoDetail", err);
        }
        return null;
    };
    // delete Service PoDeatil     
    this.deleteServicePoDetail = async function (req, servicepodetail) {
        try {
            return await pool.query(req, "call spc_servicepodetail_delete(?)",                       
                [
                    parseInt(servicepodetail.id),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("servicepodetail.service-deleteServicePoDetail", err);
        }
        return null;
    };

};
    
module.exports = servicepodetailRepository;