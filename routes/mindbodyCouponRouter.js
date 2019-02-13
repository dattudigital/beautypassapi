var express = require('express');
var router = express.Router();
var mindbodyCouponController = require('../controllers/mindbodyCouponController');
var mcc = new mindbodyCouponController();

router.get('/', mcc.getAll.bind(mcc));

router.post('/', mcc.create.bind(mcc));

router.delete('/:id', mcc.remove.bind(mcc));

module.exports = router;