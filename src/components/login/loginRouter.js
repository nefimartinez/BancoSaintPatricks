'use-strict';

const express = require('express');
const router = express.Router();

const { login } = require('./loginController');

// ruta login
router.post('/', login);

module.exports = router;