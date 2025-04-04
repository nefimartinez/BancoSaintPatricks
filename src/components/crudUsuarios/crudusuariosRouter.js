'use strict';

const express = require('express');
const router = express.Router();
const validateSchema = require('../../middlewares/validateSchemaHandler');

// rutas Schemas
const { listadoComunaSchema } = require('../../schemas/listadoComunasSchema'); // ruta de ejemplo

// rutas Controllers
const { listadoComunasController } = require('./listadoComunasController'); // ruta de ejemplo

// rutas servicios Mantenedor TI
const {
	crudUsuariosGetAllController,
	crudUsuariosGetAllByIdController,
} = require('./crudUsuariosController');

// rutas ejemplo
router.post(
	'/',
	validateSchema(listadoComunaSchema, 'body'),
	listadoComunasController,
);

// crudUsuariosALL
router.get('/', crudUsuariosGetAllController);

// crudUsuariosById
router.get('/:id', crudUsuariosGetAllByIdController);

module.exports = router;
