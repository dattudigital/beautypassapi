var redisCache = require("../cache/redisCache"),
    rc;
function ControllerUtilFunction() {
    rc = new redisCache();
}

ControllerUtilFunction.prototype.getAll = function (commonModel, req, res, next, callback) {
    var params = {};
    params.query = req.query;
    rc.get(req.baseUrl, function (err, replay) {        
        if (replay) {
            res.status(200).json({ status: true, result: replay });
        } else {
            commonModel.getAll(params, function (err, data) {
                if (err) {
                    res.status(500).json({ status: false, result: err });
                }
                if (!Object.keys(data).length) {
                    res.status(200).json({ "result": "No Records Found", status: false });
                } else {
                    rc.set(req.baseUrl, data);
                    res.status(200).json({ status: true, result: data });
                }
            });
        }
    });
};

ControllerUtilFunction.prototype.getById = function (commonModel, req, res, next, callback) {
    var params = {};
    commonModel.getById(params, req.params.id, function (err, data) {
        if (err) {
            res.status(500).json({ status: false, result: err });
        }
        if (!Object.keys(data).length) {
            res.status(200).json({ "result": "No Records Found", status: false });
        } else {
            res.status(200).json({ status: true, result: data });
        }
    });
};

ControllerUtilFunction.prototype.create = function (commonModel, req, res, next, callback) {
    var data = req.body;
    commonModel.create(data, function (err, result) {
        if (err) {
            res.status(500).send({ status: false, result: err });
        } else {
            data.id = result.insertId;
            rc.delete(req.baseUrl);
            res.status(200).json({ status: true, result: data });
        }
    });
};

ControllerUtilFunction.prototype.update = function (commonModel, req, res, next, callback) {
    var data = req.body;
    commonModel.update(data, req.params.id, function (err, result) {
        if (err) {
            res.status(500).json({ status: false, result: err });
        } else {
            data.id = req.params.id;
            rc.delete(req.baseUrl);
            res.status(200).json({ status: true, result: data });
        }
    });
};

ControllerUtilFunction.prototype.remove = function (commonModel, req, res, next) {
    commonModel.remove(req.params.id, function (err, result) {
        if (err) {
            res.status(500).json({ status: false, result: err });
        } else if (result.affectedRows <= 0) {
            res.status(200).json({ status: false, result: 'Record Not Found To Delete' });
        } else {
            rc.delete(req.baseUrl);
            res.status(200).send(JSON.stringify({
                message: ' 1 record deleted.'
            }));
        }
    });
};

ControllerUtilFunction.prototype.commonId = function (commonModel, req, res, next) {
    commonModel.commonId(req.params.id, function (err, result) {
        if (err) {
            res.status(500).json({ status: false, result: err });
        } else if (!Object.keys(result).length) {
            res.status(200).json({ "result": "No Records Found", status: false });
        } else {
            res.status(200).send({ status: true, result: result });
        }
    });
};
module.exports = ControllerUtilFunction;
