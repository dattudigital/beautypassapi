var express = require("express");
var app = express();
var mysql = require('mysql');
var config = require("./config/config.json");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors')
console.log(config.PORT)
app.listen(config.PORT, function () {
    console.log("shapes")
    console.log(config.PORT + "port")
});

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,username,password , x-access-token");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use(cors())
app.options('*', cors())

app.use(function (req, res, next) {
    console.log("************8");
    console.log(req.headers['x-access-token'])
    console.log(req.headers['username'])
    console.log(req.headers['password'])
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

process.on('exit', function () {

    process.exit();
});
process.on('sigint', function () {

});

app.use(express.static('/var/server-new/uploads/'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes'));
