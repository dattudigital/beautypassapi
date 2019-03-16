var express = require('express');
var router = express.Router();
var mindbodyPackageController = require('../controllers/mindbodyPackageController');
var mcc = new mindbodyPackageController();
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');

router.get('/', middleAuth, role.isSuperOrCandidate, mcc.getAll.bind(mcc));

router.get('/:id', middleAuth, role.isSuperOrCandidate, mcc.getById.bind(mcc));

router.post('/', middleAuth, role.isSuper, mcc.create.bind(mcc));

router.delete('/:id', middleAuth, role.isSuper, mcc.remove.bind(mcc))

module.exports = router;