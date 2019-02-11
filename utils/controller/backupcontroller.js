function ControllerUtilFunction() {
}

ControllerUtilFunction.prototype.getAll = function (commonModel, req, res, next, callback) {
    var params = {};
    params = req.query;
    commonModel.getAll(params, function (err, data) {
        if (err) {
            res.status(500).json({ status: false, data: err });
        }
        if (!Object.keys(data).length) {
            res.status(200).json({ data: "No Records Found", status: false });
        } else {
            res.status(200).json({ status: true, data: data });
        }
    });
};

ControllerUtilFunction.prototype.getById = function (commonModel, req, res, next, callback) {
    var params = {};
    commonModel.getById(params, req.params.id, function (err, data) {
        if (err) {
            res.status(500).json({ status: false, data: err });
        }
        if (!Object.keys(data).length) {
            res.status(200).json({ data: "No Records Found", status: false });
        } else {
            res.status(200).json({ status: true, data: data });
        }
    });
};

ControllerUtilFunction.prototype.create = function (commonModel, req, res, next, callback) {
    commonModel.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send({ status: false, data: err });
        } else {
            res.status(200).json({ status: true, data: result });
        }
    });
};

ControllerUtilFunction.prototype.update = function (commonModel, req, res, next, callback) {
    var data = req.body;
    commonModel.update(data, req.params.id, function (err, result) {
        if (err) {
            res.status(500).json({ status: false, data: err });
        } else {
            res.status(200).json({ status: true, data: data });
        }
    });
};

ControllerUtilFunction.prototype.remove = function (commonModel, req, res, next) {
    commonModel.remove(req.params.id, function (err, result) {
        if (err) {
            res.status(500).json({ status: false, data: err });
        } else if (result.affectedRows <= 0) {
            res.status(200).json({ status: false, data: { message: 'Record Not Found To Delete' } });
        } else {
            res.status(200).send(JSON.stringify({
                message: ' 1 record deleted.'
            }));
        }
    });
};

ControllerUtilFunction.prototype.commonId = function (commonModel, req, res, next) {
    commonModel.commonId(req.params.id, function (err, result) {
        if (err) {
            res.status(500).json({ status: false, data: err });
        } else if (!Object.keys(result).length) {
            res.status(200).json({ data: "No Records Found", status: false });
        } else {
            res.status(200).send({ status: true, data: result });
        }
    });
};
module.exports = ControllerUtilFunction;
