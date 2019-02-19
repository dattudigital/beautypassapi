var express = require('express');
app = express();
var jwt = require('jsonwebtoken');
app.set('superSecret', 'shapesBrow');

var middleAuth = function (req, res, next) {
    headerUsername = req.headers['username'];
    headerPassword = req.headers['password'];
    token = req.headers['x-access-token'];   
    if (headerUsername == "sh_br_ba" && headerPassword == "sh@sh.com" && token) {
        jwt.verify(token, app.get('superSecret'), function (err, decode) {
            if (err) {
                return res.json({ status: false, status: 401, message: 'Auth Is Fail' })
            } else {          
                req.decode = decode;
                req.decode.sb_u_role = decode.data.sb_u_role;                              
                next();
            }
        })
    } else {
        return res.status(403).send({
            status: false,
            success: 403,
            message: 'Invalid User Name And Password'
        })
    }
}

module.exports = middleAuth;