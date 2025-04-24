'use strict';

const logger = require('../../utils/LoggerCNS').loggerCNS;
const { executeQuery } = require('../../utils/handleDBPostgres');
const hashPassword = require('../../utils/hashPassword');
const RolesId = require('../../utils/roles')

// servicio crudUsuariosGetAll
module.exports.crudUsuariosGetAllServices = async () => {
	logger.info('=========================================');
	logger.info('  Iniciando crudUsuariosGetAllServices   ');
	logger.info('=========================================');

	try {
		let query = null;

		logger.info(' crudUsuariosGetAllServices ');
		query = `SELECT * FROM "bancoDB"."user";`;

		return await executeQuery(query, []);
	} catch (error) {
		logger.error(' Error en crudUsuariosGetAllServices: ', error);
		throw error;
	}
};

// servicio crudUsuariosGetAllById
module.exports.crudUsuariosGetAllByIdServices = async (id) => {
	logger.info('=============================================');
	logger.info('  Iniciando crudUsuariosGetAllByIdServices   ');
	logger.info('=============================================');

	try {
		let query = null;

		logger.info(' crudUsuariosGetAllByIdServices ');
		query = `SELECT * FROM "bancoDB"."user" WHERE id = $1;`;

		return await executeQuery(query, [id]);
	} catch (error) {
		logger.error(' Error en crudUsuariosGetAllByIdServices: ', error);
		throw error;
	}
};

// servicio crudUsuariosCreate
module.exports.crudUsuariosCreateServices = async (body) => {
	logger.info('=============================================');
	logger.info('  Iniciando crudUsuariosCreateServices       ');
	logger.info('=============================================');

	try {
		let query = null;

		const hashedPassword = await hashPassword(body.password);

		logger.info(' crudUsuariosCreateServices ');
		query = `INSERT INTO "bancoDB"."user" (rut, nombre, apellido, email, password, rol_id, createdat) 
		         VALUES ($1, $2, $3, $4, $5, $6, now()) RETURNING *;`;

		return await executeQuery(query, [
			body.rut,
			body.nombre,
			body.apellido,
			body.email,
			hashedPassword,
			RolesId.USER
			//new Date().toISOString(),
		]);
	} catch (error) {
		logger.error(' Error en crudUsuariosCreateServices: ', error);
		throw error;
	}
};

// servicio crudUsuariosUpdate
module.exports.crudUsuariosUpdateServices = async (body, id) => {
	logger.info('=============================================');
	logger.info('  Iniciando crudUsuariosUpdateServices       ');
	logger.info('=============================================');

	try {
		let query = null;

		logger.info(' crudUsuariosUpdateServices ');
		query = `UPDATE "bancoDB"."user" 
		         SET rut = $1, nombre = $2, apellido = $3, email = $4, password = $5, rol_id = $6, updatedat = now() 
		         WHERE id = $7 RETURNING *;`;

		return await executeQuery(query, [
			body.rut,
			body.nombre,
			body.apellido,
			body.email,
			body.password,
			body.rol_id,
			id,
		]);
	} catch (error) {
		logger.error(' Error en crudUsuariosUpdateServices: ', error);
		throw error;
	}
};

// service find useByEmail
module.exports.findUserByEmail = async (email) => {
	logger.info('=============================================');
	logger.info('  Iniciando findUserByEmailServices          ');
	logger.info('=============================================');

	try {
		let query = null;

		logger.info(' findUserByEmailServices ');
		query = `SELECT * FROM "bancoDB"."user" WHERE email = $1;`;

		return await executeQuery(query, [email]);
	} catch (error) {
		logger.error(' Error en findUserByEmailServices: ', error);
		throw error;
	}
};

// service findUserByRut
module.exports.findUserByRut = async (rut) => {
	logger.info('=============================================');
	logger.info('  Iniciando findUserByRutServices            ');
	logger.info('=============================================');

	try {
		let query = null;

		logger.info(' findUserByRutServices ');
		query = `SELECT * FROM "bancoDB"."user" WHERE rut = $1;`;

		return await executeQuery(query, [rut]);
	} catch (error) {
		logger.error(' Error en findUserByRutServices: ', error);
		throw error;
	}
};
