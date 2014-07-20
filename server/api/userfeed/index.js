// userfeed api is for public facing user data.

'use strict';

var express = require('express');
var controller = require('./userfeed.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;