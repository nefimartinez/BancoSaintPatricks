'use strict';

const express = require('express');

// rutas
const crudUsuariosRouter = require('../src/components/crudUsuarios/crudUsuariosRouter');
const tarjetasRouter = require('../src/components/crudTarjetas/tarjetaRouter');
const login = require('../src/components/login/loginRouter');

function routerApi(app) {
	const router = express.Router();

	// servicios Mantenedores TI
	router.use('/v1/crudUsuarios', crudUsuariosRouter);
	router.use('/v1/crudTarjetas', tarjetasRouter);
	router.use('/v1/login', login);

	// otros servicios

	// la ruta base de la api
	app.use('/proyectoBanco', router);
}

module.exports = routerApi;
