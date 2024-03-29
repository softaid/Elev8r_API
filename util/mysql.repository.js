const util = require('util');
const mysql = require('mysql');
var nconf = require('nconf');
const Crypto = require("crypto");

let pool = function (dev, prod, env) {

    this.getTokenConnection = async function (req) {
        
        var promise = new Promise(function (resolve, reject) {
            try {

                var token = req.body.token || req.query.token || req.headers['c-token'];
                //console.log('token : ', token);
                if (token != undefined) {
                    var decipher = Crypto.createDecipher("aes-256-cbc", 'PTS@99remote');
                    //var decrypted = Buffer.concat([decipher.update(req.body.token.toString(), "utf8"), decipher.final()]);
                    // // var decrypted = decipher.update(req.body.token, 'base64', 'utf8');
                    
                    // // console.log('decrypted : ', decrypted);
                    // // resolve({token : JSON.parse(decrypted) });

                    var decrypted = '';
                    decrypted += decipher.update(token, 'base64', 'utf8');
                    decrypted += decipher.final();

                    //console.log('decrypted : ', decrypted);
                    var jsonData = JSON.parse(decrypted)
                    resolve({token : jsonData });

                } else {
                    resolve(null);
                }

            } catch (exception) {
                resolve(null);
            }
        });

        return await promise;
    };

    this.getConnection = async function (req) {

        //console.log('dev:prod:env:,', dev, prod, env);

        var conn = await this.getTokenConnection(req);
        // console.log('getTokenConnection conn:', conn);

        if (conn == null) {

            var sconf = dev.server.dbconfig;
            if (env == "production") {
                sconf = prod.server.dbconfig;
            }

            // console.log("sconf ==== 1 : ", sconf);

            return mysql.createConnection({
                host: sconf.host,
                user: sconf.user,
                password: sconf.password,
                database: sconf.database,
                multipleStatements: true
            });

            
        }
        else {

            //============= LOCAL SERVER ====================
            //var sconf = dev.local.dbconfig;
            // console.log("sconf ==== 2 : ", conn);
            //console.log('token : ', conn.token);
            return mysql.createConnection({
                host: conn.token.host,
                user: conn.token.user,
                password: conn.token.password,
                database: conn.token.database,
                multipleStatements: true
            });
        }
    };


    this.query = async function (req, query, param) {
        try {

            var con = await this.getConnection(req);
            let promise = new Promise(function (resolve, reject) {

                con.connect(function (err) {
                    if (err) {
                         console.log('connection error : ', err);
                        reject("connection_error");
                    };
                     console.log('query :==== ', query);
                     console.log('param :==== ', param);
                    con.query(query, param, function (err, result) {
                        if (err) {
                             console.log('query_error : ', err);
                            //con.end();
                            reject("strquery_error");
                        };
                        con.destroy();
                        resolve(result);
                    });
                });

                //con.end();
                
            });

            return await promise;
        }
        catch (err) {
             console.log('Error thrown : ', err);
            log.dbErrorLog("user.service - getUser", err);
            return reject('queryfunction_error');
        }
    };

};

module.exports = pool;