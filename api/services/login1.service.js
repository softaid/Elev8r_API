
var express = require('express');
var router = express.Router();
const Crypto = require("crypto");

module.exports = function (Login, bcrypt, jwt, log) {

    router.post('/test', async function (req, res, next) {
        console.log('test service is called');
        let rows = await Login.test(req, req.body);
        res.status(200).send(rows);
    });

    router.post('/validatecompany', async function (req, res, next) {

        let rows = await Login.checkCompany(req, req.body);

        console.log('rows : ', rows);

        if (rows[0].length > 0) {

            let encryptedData = new Promise(function (resolve, reject) {
                try {
                    var cipher = Crypto.createCipher('aes-256-cbc', 'PTS@99remote');
                    // var encrypted = Buffer.concat([cipher.update(new Buffer(JSON.stringify(rows[0][0]), "utf8")), cipher.final()]);

                    //console.log('data.length : ', rows[0], rows[0][0]);

                    var data = JSON.stringify(rows[0][0]);

                    //var crypted = cipher.update(JSON.stringify(rows[0][0]), 'utf8', 'base64');
                    //crypted += cipher.final('base64');

                    console.log('data.length : ', data);

                    var decoded = '';
                    var blockSize = 3;
                    var datalength = data.length;

                    //for (var i = 0; i < datalength; i += blockSize) {
                    //   partialData = data.slice(i, i + blockSize);
                    decoded += cipher.update(data, 'utf8', 'base64');
                    //console.log("  decoded=" + decoded);
                    //}
                    decoded += cipher.final('base64');

                    resolve(decoded);


                } catch (exception) {
                    reject({ message: exception.message });
                }
            });

            let result = await encryptedData;

            res.status(200).send({ token: result, companyid: rows[0][0].companyid });
        }
        else {
            res.status(401).send({ auth: false, token: null });
        }

        // let dec = new Promise(function (resolve, reject) {
        //     try {
        //         var decipher = Crypto.createDecipher("aes-256-cbc", 'PTS@99remote');
        //         var decrypted = Buffer.concat([decipher.update(result), decipher.final()]);
        //         resolve(JSON.parse(decrypted.toString()));

        //     } catch (exception) {
        //         reject({ message: exception.message });
        //     }
        // });
        // let result2 = await dec;

        
    });

    // router.post('/', async function (req, res, next) {

    //     //console.log("Encrypted Password : ",bcrypt.hashSync(req.body.password, 10));

    //     console.log('body request :', req.body);
    //     console.log('params request :', req.params);
    //     console.log('query request :', req.query);

    //     let rows = await Login.checkLogin(req, req.body);

    //     //console.log('rows result : ', rows);

    //     let user = JSON.parse(JSON.stringify(rows))[0][0];
    //     let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    //     if (!passwordIsValid)
    //         return res.status(401).send({ auth: false, token: null });

    //     // Create token
    //     let token = jwt.sign(user, "secret", {
    //         expiresIn: 86400 // expires in 24 hours
    //     });

    //     //console.log('token : ', token);

    //     res.status(200).send({ auth: true, token: token });
    // });


    router.post('/user', async function (req, res, next) {

        //console.log('body request :', req.body);
        //console.log('params request :', req.params);
        //console.log('query request :', req.query);

        let rows = await Login.checkUserLogin(req, req.body);

        console.log('rows:', rows);

        let data = JSON.parse(JSON.stringify(rows));

        let errorcode = data[0][0];
        let user = data[1][0];

        console.log('user data check === : ', data);

        if (user != undefined) {
            console.log('user username === : ', user.username);

            req.body.userid = data[1][0].id;
            let notificationuserid = await Login.saveNotificationUser(req, req.body);

            user.userkey = req.body.userkey;

            // Create token
            let token = jwt.sign(user, "secret", {
                expiresIn: 86400 // expires in 24 hours
            });

            console.log('token : ', token);
            res.status(200).send({ auth: true, token: token, ctoken: req.body.token, d: data[1], userkey :  user.userkey });
        }
        else {
            return res.status(401).send({ auth: false, token: null, errorcode: errorcode });
        }
    });

    

    return router;
}
