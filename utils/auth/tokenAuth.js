var express = require('express');
app = express();
var jwt = require('jsonwebtoken');
app.set('superSecret', 'shapesBrow');

var middleAuth = function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('superSecret'), function (err, decode) {
            if (err) {
                return res.json({ success: false, status: 401, message: 'Auth Is Fail' })
            } else {                
                req.decode = decode;
                req.decode.role = decode.data[0].role;
                next();
            }
        })
    } else {
        return res.status(403).send({
            success: 403,
            message: 'No Token Provided'
        })
    }
}

module.exports = middleAuth;