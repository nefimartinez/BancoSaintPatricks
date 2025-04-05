'use strict';

const { getAll } = require('./tarjetaService');
const ModuleError = require('../../utils/moduleError');
const logger = require('../../utils/LoggerCNS').loggerCNS;
const { INTERNAL_ERROR, NOT_FOUND } = require('../../utils/constantes');


const getAll = async () => {
	logger.info('=============================================');
	logger.info('     Iniciando tarjetaModule -> getAll()     ');
	logger.info('=============================================');
	try {
		const response = await getAll();
		return response;
	} catch (error) {
		if (error.statusCode) throw error; // error controlado
		const moduleError = new ModuleError(error);
		moduleError.statusCode = INTERNAL_ERROR;
		logger.error(' Error en tarjetaModule -> getAll():');
		logger.error(' Error module: ', error);
		throw moduleError;
	}
};

module.exports = {
	getAll
}
