'use strict';

const {
	crudUsuariosGetAllServices,
	crudUsuariosGetAllByIdServices,
	crudUsuariosCreateServices,
} = require('./crudUsuariosServices');
const ModuleError = require('../../utils/moduleError');
const logger = require('../../utils/LoggerCNS').loggerCNS;
const { INTERNAL_ERROR, NOT_FOUND } = require('../../utils/constantes');

// module crudUsuariosGetAll
module.exports.crudUsuariosGetAllModule = async () => {
	logger.info('=============================================');
	logger.info('     Iniciando crudUsuariosGetAllModule      ');
	logger.info('=============================================');
	try {
		const response = await crudUsuariosGetAllServices();

		if (response.length === 0) {
			const moduleError = new ModuleError();
			moduleError.statusCode = NOT_FOUND;
			moduleError.err_msg = 'No se encontró el registro';
			throw moduleError;
		}

		const lista = [];
		for (const user of response) {
			let dato = {
				id: user.id,
				rut: user.rut || '',
				nombre: user.nombre || '',
				apellido: user.apellido || '',
				email: user.email || '',
				password: user.password || '',
				rol_id: user.rol_id,
				createdAt: user.createdat || '',
				updatedAt: user.updatedat || '',
			};
			lista.push(dato);
		}

		return lista;
	} catch (error) {
		if (error.statusCode) throw error; // error controlado
		const moduleError = new ModuleError(error);
		moduleError.statusCode = INTERNAL_ERROR;
		logger.error(' Error en crudUsuariosGetAllModule ');
		logger.error(' Error module: ', error);
		throw moduleError;
	}
};

// module crudUsuariosAllById
module.exports.crudUsuariosAllByIdModule = async (id) => {
	logger.info('=============================================');
	logger.info('     Iniciando crudUsuariosAllByIdModule     ');
	logger.info('=============================================');
	try {
		const response = await crudUsuariosGetAllByIdServices(id);

		if (response.length === 0) {
			const moduleError = new ModuleError();
			moduleError.statusCode = NOT_FOUND;
			moduleError.err_msg = 'No se encontró el registro';
			throw moduleError;
		}

		const lista = [];
		for (const user of response) {
			let dato = {
				id: user.id,
				rut: user.rut || '',
				nombre: user.nombre || '',
				apellido: user.apellido || '',
				email: user.email || '',
				password: user.password || '',
				rol_id: user.rol_id,
				createdAt: user.createdat || '',
				updatedAt: user.updatedat || '',
			};
			lista.push(dato);
		}

		return lista;
	} catch (error) {
		if (error.statusCode) throw error; // error controlado
		const moduleError = new ModuleError(error);
		moduleError.statusCode = INTERNAL_ERROR;
		logger.error(' Error en crudUsuariosAllByIdModule ');
		logger.error(' Error module: ', error);
		throw moduleError;
	}
};

// modulo crudUsuariosCreate
module.exports.crudUsuariosCreateModule = async (body) => {
	logger.info('=============================================');
	logger.info('     Iniciando crudUsuariosCreateModule      ');
	logger.info('=============================================');

	try {
		if (response) {
			response = {
				message: 'Registro agregado correctamente',
			};
		} else {
			response = {
				message: 'Error al agregar el registro',
			};
		}

		return response;
	} catch (error) {
		if (error.statusCode) throw error; // error controlado
		const moduleError = new ModuleError(error);
		moduleError.statusCode = INTERNAL_ERROR;
		logger.error(' Error en crudUsuariosCreateModule ');
		logger.error(' Error module: ', error);
		throw moduleError;
	}
};
