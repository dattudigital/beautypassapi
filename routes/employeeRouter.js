var express = require('express');
var router = express.Router();
var employeeController = require('../controllers/employeeController');
var ec = new employeeController();

router.get('/', ec.getAll.bind(ec));

router.post('/', ec.create.bind(ec));

module.exports = router;