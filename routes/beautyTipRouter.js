var express = require('express');
var router = express.Router();
var beautyTipController = require('../controllers/beautyTipController');
var btc = new beautyTipController();
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');

router.get('/',middleAuth, role.isSuperOrCandidate, btc.getAll.bind(btc));

router.post('/',middleAuth, role.isSuper, btc.create.bind(btc));

router.delete('/:id',middleAuth, role.isSuper, btc.remove.bind(btc));

module.exports = router;