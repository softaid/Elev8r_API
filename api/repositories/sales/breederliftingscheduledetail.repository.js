let breederliftingscheduledetailRepository = function (pool, log) {
    
    this.getAllBreederLfScheduleDetail = async function (req, breederLfScheduleDetail) {
        try {
            return await pool.query(req, "call spc_breeder_lifting_schedule_details_search(?)",
            [
                breederLfScheduleDetail.liftingscheduleid,
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederLfScheduleDetail.service - getAllBreederLfScheduleDetail", err);
        } 
        return null;
    };

    this.getBreederLfScheduleDetail = async function (req, breederLfScheduleDetail) {
        try {
            return await pool.query(req, "call spc_breeder_lifting_schedule_details_select(?,?)",
            [
                breederLfScheduleDetail.id,
                breederLfScheduleDetail.companyid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog(" breederLfScheduleDetail,service - getBreederLfScheduleDetail", err);
        }
    
        return null;
    };    

    

    this.saveBreederLfScheduleDetail = async function (req, breederLfScheduleDetail) {
        try {
            var sp_text = "SET @out_id = 0; call spc_breeder_lifting_schedule_details_save(?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req, sp_text,                       
                [
                    breederLfScheduleDetail["id"] != null ? parseInt(breederLfScheduleDetail.id) : null,
                    parseInt(breederLfScheduleDetail.liftingscheduleid),
                    parseInt(breederLfScheduleDetail.breederbirdsalesorderid),
                    parseInt(breederLfScheduleDetail.batchid),
                    parseFloat(breederLfScheduleDetail.batchweight),
                    parseFloat(breederLfScheduleDetail.plannedweight),
                    parseFloat(breederLfScheduleDetail.approvedweight),
                    parseFloat(breederLfScheduleDetail.batchcost),
                    parseInt(breederLfScheduleDetail.linesupervisorid),
                    parseInt(breederLfScheduleDetail.companyid),                      
                    parseInt(breederLfScheduleDetail.userid)
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederLfScheduleDetail.service-saveBreederLfScheduleDetail", err);
        }
        return null;
    }

    this.deleteBreederLfScheduleDetail = async function (req, breederLfScheduleDetail) {
        try {
                return await pool.query(req, "call spc_breeder_lifting_schedule_delete(?)",                       
                    [
                        parseInt(breederLfScheduleDetail.id)       
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("breederLfScheduleDetail.service-deleteBreederLfScheduleDetail", err);
        }
        return null;
    }

   

};
    
module.exports = breederliftingscheduledetailRepository;