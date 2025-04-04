'use strict';

const express = require('express');

const listadoComunasRouter = require('../src/components/listadoComunas/listadoComunasRouter');

function routerApi(app) {
	const router = express.Router();

	router.use('/v1/comunas/listado', listadoComunasRouter);


	// la ruta base de la api hola
	app.use('/proyectoBanco', router);
}

module.exports = routerApi;
