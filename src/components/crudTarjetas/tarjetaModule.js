'use strict';

const { getAllService } = require('./tarjetaService');
const ModuleError = require('../../utils/moduleError');
const logger = require('../../utils/LoggerCNS').loggerCNS;
const { INTERNAL_ERROR } = require('../../utils/constantes');

const getAllModule = async () => {
	showLogsBanner();

	try {
		const response = await getAllService();
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
	getAllModule,
};

function showLogsBanner() {
	logger.info('=============================================');
	logger.info('     Iniciando tarjetaModule -> getAll()     ');
	logger.info('=============================================');
}
