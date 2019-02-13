var express = require('express');
var router = express.Router();
var faqController = require('../controllers/faqController');
var fc = new faqController();

router.get('/', fc.getAll.bind(fc));

router.post('/', fc.create.bind(fc));

router.delete('/:id', frrrc.remove.bind(fc));

module.exports = router;