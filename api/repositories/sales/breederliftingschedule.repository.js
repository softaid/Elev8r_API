let breederliftingscheduleRepository = function (pool, log) {

    // get location wise sales order
    this.getSalesOrderByLocation = async function (req, breederLfSchedule) {
        try {
            return await pool.query(req, "call spc_breederbirdsalesorder_bylocation(?,?,?,?)",
            [
                breederLfSchedule.locationid,
                breederLfSchedule.date,
                breederLfSchedule.moduleid,
                breederLfSchedule.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederLfSchedule.service - getSalesOrderByLocation", err);
        } 
        return null;
    };
    
    this.getAllBreederLfSchedule = async function (req, breederLfSchedule) {
        try {
            return await pool.query(req, "call spc_breeder_lifting_schedule_search(?)",
            [
                breederLfSchedule.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederLfSchedule.service - getAllBreederLfSchedule", err);
        } 
        return null;
    };

    this.getBreederLfSchedule = async function (req, breederLfSchedule) {
        try {
            return await pool.query(req, "call spc_breeder_lifting_schedule_select(?,?)",
            [
                breederLfSchedule.id,
                breederLfSchedule.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog(" breederLfSchedule.id,.service - getBreederLfSchedule", err);
        }
    
        return null;
    };    

    

    this.saveBreederLfSchedule = async function (req, breederLfSchedule) {
        try {
            var sp_text = "SET @out_id = 0; call spc_breeder_lifting_schedule_save(?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                    breederLfSchedule["id"] != null ? parseInt(breederLfSchedule.id) : null,
                    parseInt(breederLfSchedule.moduleid),
                    parseInt(breederLfSchedule.locationid),
                    breederLfSchedule.scheduledate,
                    parseInt(breederLfSchedule.statusid),
                    parseInt(breederLfSchedule.companyid),                      
                    parseInt(breederLfSchedule.userid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederLfSchedule.service-saveBreederLfSchedule", err);
        }
        return null;
    }

    this.deleteBreederLfSchedule = async function (req, breederLfSchedule) {
        try {
                return await pool.query(req, "call spc_breeder_lifting_schedule_delete(?)",                       
                    [
                        parseInt(breederLfSchedule.id)       
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederLfSchedule.service-deleteBreederLfSchedule", err);
        }
        return null;
    }

    this.getBirdSalesOrderByLfSchedule= async function (req, breederLfSchedule) {
        try {
            return await pool.query(req, "call spc_getbirdsalesorderbylfschedule(?,?)",
            [
                breederLfSchedule.liftingscheduleid,
                breederLfSchedule.companyid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederLfSchedule.service - getBirdSalesOrderByLfSchedule", err);
        } 
        return null;
    };

};
    
module.exports = breederliftingscheduleRepository;