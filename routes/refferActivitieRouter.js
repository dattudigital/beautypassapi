var express = require('express');
var router = express.Router();
var refferActivitieController = require('../controllers/refferActivitieController');
var vtc = new refferActivitieController();
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');

router.get('/', middleAuth, role.isSuperOrCandidate, vtc.getAll.bind(vtc));

router.post('/',middleAuth, role.isSuper, vtc.create.bind(vtc));

router.delete('/:id',middleAuth, role.isSuper, vtc.remove.bind(vtc));

module.exports = router;