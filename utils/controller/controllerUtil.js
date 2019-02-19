var redisCache = require("../cache/redisCache"),
    rc;
function ControllerUtilFunction() {
    rc = new redisCache();
}

ControllerUtilFunction.prototype.getAll = function (commonModel, req, res, next, callback) {
    var params = {};
    params.query = req.query;
    console.log("********** came to urllllllllllllllllllll****")
    console.log(req.originalUrl)
    rc.get(req.originalUrl, function (err, replay) {
        if (replay) {
            console.log("************* REDIS")
            res.status(200).json({ status: true, data: replay });
        } else {
            console.log("#################### DB")
            commonModel.getAll(params, function (err, data) {
                if (err) {
                    res.status(500).json({ status: false, data: [], err: err });
                }
                if (!Object.keys(data).length) {
                    res.status(200).json({ data: [], status: false });
                } else {
                    rc.set(req.originalUrl, data);
                    res.status(200).json({ status: true, data: data });
                }
            });
        }
    });
};

ControllerUtilFunction.prototype.getById = function (commonModel, req, res, next, callback) {
    var params = {};
    commonModel.getById(params, req.params.id, function (err, data) {
        if (err) {
            res.status(500).json({ status: false, data: [], err: err });
        }
        if (!Object.keys(data).length) {
            res.status(200).json({ data: "No Records Found", status: false });
        } else {
            res.status(200).json({ status: true, data: data });
        }
    });
};

ControllerUtilFunction.prototype.create = function (commonModel, req, res, next, callback) {
    var data = req.body;
    commonModel.create(data, function (err, result) {
        if (err) {
            res.status(500).send({ status: false, data: [], err: err });
        } else {
            // data.id = result.insertId;
            rc.delete(req.originalUrl);
            res.status(200).json({ status: true, data: data });
        }
    });
};

ControllerUtilFunction.prototype.update = function (commonModel, req, res, next, callback) {
    var data = req.body;
    commonModel.update(data, req.params.id, function (err, result) {
        if (err) {
            res.status(500).json({ status: false, data: [], err: err });
        } else {
            rc.delete(req.originalUrl);
            res.status(200).json({ status: true, data: data });
        }
    });
};

ControllerUtilFunction.prototype.remove = function (commonModel, req, res, next) {
    commonModel.remove(req.params.id, function (err, result) {
        if (err) {
            res.status(500).json({ status: false, data: [], err: err });
        } else if (result.affectedRows <= 0) {
            res.status(200).json({ status: false, data: [], err: 'Record Not Found To Delete' });
        } else {
            rc.delete(req.originalUrl);
            res.status(200).json({ status: true, data: "Record Deleted Successfully" });
        }
    });
};

ControllerUtilFunction.prototype.commonId = function (commonModel, req, res, next) {
    commonModel.commonId(req.params.id, function (err, result) {
        if (err) {
            res.status(500).json({ status: false, data: [], err: err });
        } else if (!Object.keys(result).length) {
            res.status(200).json({ data: [], status: false, err: err });
        } else {
            res.status(200).send({ status: true, data: result });
        }
    });
};

module.exports = ControllerUtilFunction;
