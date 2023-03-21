let loginRepository = function (pool, log) {

    this.test = async function (req, Login) {
        console.log('test repository is called');
        try {
            return await pool.query(req, "call spc_test()", []);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("login.service-test", err);
        }
        return null;
    },

    this.checkCompany = async function (req, Login) {
        console.log("Login : ",Login);
        try {
            return await pool.query(req,"call spk_companyuser_checkcompany(?)",
                [
                    Login.companycode,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("login.service-checkCompany", err);
        }
        return null;
    },

    this.checkLogin = async function (req, Login) {

        try {
            return await pool.query(req, "call spc_login(?)",
                [
                    Login.username,
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("login.service-checkLogin", err);
        }
        return null;
    },

    this.checkUserLogin = async function (req, Login) {

        console.log('Login : ', Login);

        try {
            return await pool.query(req, "call spc_user_login(?,?,?)",
                [
                    Login.username,
                    Login.pwd,
                    Login.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("login.service-checkUserLogin", err);
        }
        return null;
    },

    this.saveNotificationUser = async function (req, NotificationUser) {
        try {
                var sp_text = "SET @out_id = 0; call spc_notificationuser_save(?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        parseInt(NotificationUser.userid),
                        NotificationUser.userkey,
                        parseInt(NotificationUser.companyid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("login.service-saveNotificationUser", err);
        }
        return null;
    };

    // set access token to user table
   /* this.saveSaveAccessToken = async function (req, NotificationUser) {
        try {
                var sp_text = "SET @out_id = 0; call spc_accesstoken_save(?,?,?, @out_id); SELECT @out_id as id;";                  
                return await pool.query(req, sp_text,                       
                    [
                        parseInt(NotificationUser.userid),
                        NotificationUser.accesstoken,
                        parseInt(NotificationUser.companyid)
                    ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("login.service-saveSaveAccessToken", err);
        }
        return null;
    };*/


    // get user by mobile no.
    this.getuserByMobileNo = async function (req, Login) {
        try {
            return await pool.query(req,"call spc_getUser_bymobileno(?,?,?)",
                [
                    Login.mobileno,
                    Login.companycode,
                    Login.companyid
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("login.service-getuserByMobileNo", err);
        }
        return null;
    };

    // reset password
    this.resetPwd = async function (req, Login) {
        try {
            var sp_text = "SET @out_id = 0; call spc_user_resetpassword(?,?,?, @out_id); SELECT @out_id as id;";                  
            return await pool.query(req,sp_text,
                [
                    parseInt(Login.id),
                    Login.pwd,
                    parseInt(Login.companyid),
                ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("login.service-resetPwd", err);
        }
        return null;
    };

    // get company code by email 
    this.getCompanyCodeByEmail = async function (req, Login) {
        try {
            return await pool.query(req,"call spc_getCompanycode_byemail(?)",
            [
                Login.email
            ]);
        }
        catch (err) {
            console.log('Error thrown : ', err);
            log.dbErrorLog("login.service-getCompanyCodeByEmail", err);
        }
        return null;
    };

    this.sendCompanycodeByEmail = async function (req, params) {

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'poultryos.user@gmail.com',
                pass: 'PTS@99remote'
            }
        });

        var mailOptions = {
            from: 'poultryos.user@gmail.com',
            to: params.to,
            subject: params.subject,
            text: params.text
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return null;
    };
}

module.exports = loginRepository;