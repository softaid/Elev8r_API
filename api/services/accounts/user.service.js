
var express = require('express');
var router = express.Router();

module.exports = function (User,bcrypt, oauth, log) {

    router.get('/:id?', oauth.ensureLoggedIn, async function (request, response, next) {
        try {
            let userReturn = await User.getUser(request, request.params);
            response.send(userReturn);
        }
        catch (err) {

            console.log(' Error in router : ', err);
            log.dbErrorLog("user-get", err);
        }
    });

    return router;
}
