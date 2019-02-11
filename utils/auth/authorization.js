function unAuth(res) {
    res.status(403).json({
        error: {
            message: 'Not Auth'
        }
    })
}

module.exports.isSuper = function (req, res, next) {
    if (req.decode) {
        if (req.decode.role == 1) {
            next();
            return;
        }
    }
    unAuth(res);
}

module.exports.isBranchManager = function (req, res, next) {
    if (req.decode) {
        if (req.decode.role == 2) {
            next();
            return;
        }
    }
    unAuth(res);
}

module.exports.isEmployee = function (req, res, next) {
    if (req.decode) {
        if (req.decode.role == 3) {
            next();
            return;
        }
    }
    unAuth(res);
}

module.exports.isStylist = function (req, res, next) {
    if (req.decode) {
        if (req.decode.role == 4) {
            next();
            return;
        }
    }
    unAuth(res);
}