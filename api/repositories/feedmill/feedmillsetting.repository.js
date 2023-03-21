let feedmillsettingRepository = function (pool, log) {

    // SEARCH REPOSITORY

this.getAllFeedMillSettingResult = async function (req, feedmillsetting) {
   try {
       return await pool.query(req, "call spc_feedmillsetting_search(?)",
       [
        feedmillsetting.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("feedmillsetting.service - getAllFeedMillSettingResult", err);
   } 
   return null;
};    

    // SELECT REPOSITORY

this.getFeedMillSetting = async function (req, feedmillsetting) {
   console.log("feedmillsetting repo:",feedmillsetting);
   try {
       return await pool.query(req, "call spc_feedmillsetting_select(?,?)",
       [
        feedmillsetting.id,
        feedmillsetting.companyid,
       ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("feedmillsetting.service - getFeedMillSetting", err);
   } 
   return null;
};  

    //SAVE REPOSITORY

this.saveFeedMillSetting = async function (req, feedmillsetting) {
   console.log("feedmillsetting",feedmillsetting);
   try {
           var sp_text = "SET @out_id = 0; call spc_feedmillsetting_save(?,?,?,?,?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
           return await pool.query(req, sp_text,                       
               [
                feedmillsetting["id"] != null ? parseInt(feedmillsetting.id) : null,
                parseFloat(feedmillsetting.tolerencepercentage),
                parseFloat(feedmillsetting.additionalcost),
                parseInt(feedmillsetting.warehouseid),
                parseInt(feedmillsetting.inventoryindrledgerid),
                parseInt(feedmillsetting.grpowithoutinvoiceledgerid),
                parseInt(feedmillsetting.discountledgerid),
                feedmillsetting.isfifo,
                parseInt(feedmillsetting.overheadledgerid),
                feedmillsetting.applyreciptloss,
                parseInt(feedmillsetting.lossledgerid),
                parseInt(feedmillsetting.companyid),
                parseInt(feedmillsetting.userid),   
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("feedmillsetting.service-saveFeedMillSetting", err);
   }
   return null;
};

   //DELETE REPOSITORY

this.deleteFeedMillSetting = async function (req, feedmillsetting) {
   try {
           return await pool.query(req, "call spc_feedmillsetting_delete(?)",                       
               [
                   parseInt(feedmillsetting.id)
               ]);
   }
   catch (err) {
       console.log('Error thrown : ', err);
       log.dbErrorLog("feedmillsetting.repository - deleteFeedMillSetting", err);
   }
   return null;
};

};

module.exports = feedmillsettingRepository;
