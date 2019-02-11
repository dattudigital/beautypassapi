var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var uc = new userController();

router.get('/', uc.getAll.bind(uc));

module.exports = router;