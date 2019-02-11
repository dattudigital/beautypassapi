var express = require('express');
var router = express.Router();
var beautyTipController = require('../controllers/beautyTipController');
var btc = new beautyTipController();

router.get('/', btc.getAll.bind(btc));

router.post('/', btc.create.bind(btc));

module.exports = router;