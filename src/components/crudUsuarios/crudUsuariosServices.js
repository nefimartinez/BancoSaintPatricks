'use strict';

const logger = require('../../utils/LoggerCNS').loggerCNS;
const { executeQuery } = require('../../utils/handleDBPostgres');
const ModuleError = require('../../utils/moduleError');

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

		logger.info(' crudUsuariosCreateServices ');
		query = `INSERT INTO "bancoDB"."user" (rut, nombre, apellido, email, password, rol_id, createat) VALUES ($1, $2, $3, $4, $5, $6, now()) RETURNING *;`;

		return await executeQuery(query, [
			body.rut,
			body.nombre,
			body.apellido,
			body.email,
			body.password,
			body.rol_id,
			//new Date().toISOString(),
		]);
	} catch (error) {
		logger.error(' Error en crudUsuariosCreateServices: ', error);
		throw error;
	}
};
