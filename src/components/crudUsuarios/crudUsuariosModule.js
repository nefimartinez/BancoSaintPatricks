'use strict';

const { crudUsuariosGetAllServices } = require('./crudUsuariosServices');
const ModuleError = require('../../utils/moduleError');
const logger = require('../../utils/LoggerCNS').loggerCNS;
const { INTERNAL_ERROR, NOT_FOUND} = require('../../utils/constantes');

module.exports.crudUsuariosGetAllModule = async () => {
	logger.info('=============================================');
	logger.info('     Iniciando crudUsuariosGetAllModule      ');
	logger.info('=============================================');
	try {
		const response = await crudUsuariosGetAllServices();
		return response;
	} catch (error) {
		if (error.statusCode) throw error; // error controlado
		const moduleError = new ModuleError(error);
		moduleError.statusCode = INTERNAL_ERROR;
		logger.error(' Error en crudUsuariosGetAllModule ');
		logger.error(' Error module: ', error);
		throw moduleError;
	}
};
