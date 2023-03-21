let servicepoRepository = function (pool, log) {
    
    //get All Service Po
    this.getAllServicePo = async function (req, servicepo) {
        try {
            return await pool.query(req, "call spc_servicepo_search(?)",
            [   
                servicepo.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("servicepo.service - getAllServicePo", err);
        } 
        return null;
    };

     //get servicePo

     this.getServicePo = async function (req, servicepo) {
        try {
            return await pool.query(req, "call spc_servicepo_select(?,?)",
            [   
                servicepo.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("servicepo.service - getServicePo", err);
        } 
        return null;
    };
   
  
    // save servicepo 
    this.saveServicePo = async function (req, servicepo) {
        console.log("servicepo",servicepo);
        
        try {
                var sp_text = "SET @out_id = 0; call spc_servicepo_save(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        servicepo["id"] != null ? parseInt(servicepo.id) : null,
                        servicepo.servicepono,
                        servicepo["partnerid"] != null ? parseInt(servicepo.partnerid) : null,
                        servicepo.servicedate,
                        servicepo.subject,
                        parseFloat(servicepo.nettotal),
                        parseFloat(servicepo.discountper),
                        parseFloat(servicepo.othercharges),
                        parseFloat(servicepo.roundoff),
                        parseFloat(servicepo.grandtotal),
                        parseInt(servicepo.transactiontypeid),
                        parseInt(servicepo.deliveryfromaddressid),
                        parseInt(servicepo.deliverytowarehouseid),
                        servicepo.deliveryfromstatecode,
                        servicepo.deliverytostatecode,
                        parseInt(servicepo.companyid),
                        parseInt(servicepo.userid),
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("servicepo.service-saveServicePo", err);
        }
        return null;
    };

    // delete Service po     
    this.deleteServicePo = async function (req, servicepo) {
        try {
            return await pool.query(req, "call spc_servicepo_delete(?)",                       
                [
                    parseInt(servicepo.id),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("servicepo.service-deleteBreederFeedStandard", err);
        }
        return null;
    };

     //get Service Po without grpo
     this.getAllServicePoWithoutGrpo = async function (req, servicepo) {
        try {
            return await pool.query(req, "call spc_servicepo_withoutgrpo_search(?)",
            [   
                servicepo.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("servicepo.service - getAllServicePo", err);
        } 
        return null;
    };

    this.getServicePoList = async function (req, servicepo) {
        try {
            return await pool.query(req, "call spc_servicepolist_search(?,?)",
            [   
                servicepo.from_date,
                servicepo.to_date,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("servicepo.service - getServicePoList", err);
        } 
        return null;
    };

};
    
module.exports = servicepoRepository;