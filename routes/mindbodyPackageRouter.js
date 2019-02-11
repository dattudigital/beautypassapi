var express = require('express');
var router = express.Router();
var mindbodyPackageController = require('../controllers/mindbodyPackageController');
var mcc = new mindbodyPackageController();

router.get('/', mcc.getAll.bind(mcc));

router.post('/', mcc.create.bind(mcc));

module.exports = router;