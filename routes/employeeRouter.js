var express = require('express');
var router = express.Router();
var employeeController = require('../controllers/employeeController');
var ec = new employeeController();
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');

router.get('/', middleAuth, role.isSuper, ec.getAll.bind(ec));

router.post('/', middleAuth, role.isSuper, ec.create.bind(ec));

router.delete('/:id', middleAuth, role.isSuper, ec.remove.bind(ec));

module.exports = router;