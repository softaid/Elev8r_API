let notificationsettingRepository = function (pool, log) {
    
    this.getAppTransactions = async function (req, NotificationSetting) {
        try {
            return await pool.query(req, "call spk_apptransaction_search()", 
            [
               //isNaN(NotificationSetting.moduleid) ? null : NotificationSetting.moduleid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("NotificationSetting.service - getAppTransactions", err);
        } 
        return null;
    };  

    this.getNotificationPlaceholder = async function (req, NotificationSetting) {
        try {
            return await pool.query(req, "call spk_notificationplaceholder_select(?)", [
                NotificationSetting.transactiontypeid
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("NotificationSetting.service - getNotificationPlaceholder", err);
        } 
        return null;
    };  

    this.getNotificationSetting = async function (req) {
        try {
            return await pool.query(req, "call spk_notificationtemplate_search()",  []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("NotificationSetting.service - getNotificationSetting", err);
        } 
        return null;
    };    
    
    this.getNotificationSettingById = async function (req, NotificationSetting) {
        try {
            return await pool.query(req, "call spk_notificationtemplate_select(?)",
            [
                NotificationSetting.id
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("NotificationSetting.service - getHatcherBatch", err);
        }
    
        return null;
    }; 
    
    this.saveNotificationSetting = async function (req, NotificationSetting) {
        try {
                
                console.log('NotificationSetting : ', NotificationSetting);
                
                var sp_text = "SET @out_id = 0; call spk_notificationtemplate_save(?,?,?,?,?,?,?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        NotificationSetting["id"] != null ? parseInt(NotificationSetting.id) : null,
                        NotificationSetting.moduleid,              
                        parseInt(NotificationSetting.transactiontypeid),
                        NotificationSetting.roleids,              
                        NotificationSetting["template"] != null ? NotificationSetting.template : null,
                        NotificationSetting["inapp"] != null ? NotificationSetting.inapp : null,
                        NotificationSetting["sms"] != null ? NotificationSetting.sms : null,
                        NotificationSetting["email"] != null ? NotificationSetting.email : null,
                        parseInt(NotificationSetting.userid)         
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("NotificationSetting.service-saveNotificationSetting", err);
        }
        return null;
    };

    this.deleteNotificationSetting = async function (req, NotificationSetting) {
        try {
                return await pool.query(req, "call spk_notificationtemplate_delete(?)",                       
                    [
                        parseInt(NotificationSetting.id),
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("NotificationSetting.service-deleteNotificationSetting", err);
        }
        return null;
    }


};
    
module.exports = notificationsettingRepository;