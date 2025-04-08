'use strict';

const express = require('express');
const router = express.Router();
const validateSchema = require('../../middlewares/validateSchemaHandler');

// rutas servicios Mantenedor TI
const {
	crudUsuariosGetAllController,
	crudUsuariosGetAllByIdController,
	crudUsuariosCreateController,
} = require('./crudUsuariosController');

// rutas crudUsuarios
router.get('/', crudUsuariosGetAllController);
router.get('/:id', crudUsuariosGetAllByIdController);
router.post('/', crudUsuariosCreateController);

module.exports = router;
