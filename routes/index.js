'use strict';

const express = require('express');
// ruta ejemplo
const listadoComunasRouter = require('../src/components/listadoComunas/listadoComunasRouter');

// rutas 
const crudUsuariosRouter = require('../src/components/crudUsuarios/crudUsuariosRouter');


function routerApi(app) {
	const router = express.Router();

	// servicios de ejemplo
	router.use('/v1/comunas/listado', listadoComunasRouter);



	// servicios Mantenedores TI
	router.use('/v1/crudUsuarios', crudUsuariosRouter);


	// otros servicios



	// la ruta base de la api hola
	app.use('/proyectoBanco', router);
}

module.exports = routerApi;
