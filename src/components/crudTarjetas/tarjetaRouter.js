'use strict';

const express = require('express');
const router = express.Router();
const {	getAllController } = require('./tarjetaController');

router.get('/', getAllController);


module.exports = router;
