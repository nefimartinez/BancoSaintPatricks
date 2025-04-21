'use strict';

const express = require('express');
const router = express.Router();
const validateSchema = require('../../middlewares/validateSchemaHandler');

// rutas servicios Mantenedor TI
const {
	crudUsuariosGetAllController,
	crudUsuariosGetAllByIdController,
	crudUsuariosCreateController,
	crudUsuariosUpdateController,
	crudUsuariosDeleteController,
} = require('./crudUsuariosController');

// rutas crudUsuarios
router.get('/', crudUsuariosGetAllController);
router.get('/:id', crudUsuariosGetAllByIdController);
router.post('/', crudUsuariosCreateController);
router.put('/:id', crudUsuariosUpdateController);
router.delete('/:id', crudUsuariosDeleteController);

module.exports = router;
