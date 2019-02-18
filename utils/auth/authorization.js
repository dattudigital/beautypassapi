function unAuth(res) {
    res.status(403).json({
        status: false,
        error: {
            message: 'Not Auth'
        }
    })
}

module.exports.isSuper = function (req, res, next) {
    
    if (req.decode) {
        if (req.decode.sb_u_role == 1) {
            next();
            return;
        }
    }
    unAuth(res);
}

module.exports.isCandidate = function (req, res, next) {
    console.log(req.decode)
    if (req.decode) {
        if (req.decode.sb_u_role == 2) {
            next();
            return;
        }
    }
    unAuth(res);
}

module.exports.isSuperOrCandidate = function (req, res, next) {
    if (req.decode) {
        if (req.decode.sb_u_role == 2 || req.decode.sb_u_role == 1) {
            next();
            return;
        }
    }
    unAuth(res);
}
