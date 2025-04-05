'use strict';

const logger = require('../../utils/LoggerCNS').loggerCNS;
const { executeQuery } = require('../../utils/handleDBPostgres');
const ModuleError = require('../../utils/moduleError');
const { INTERNAL_ERROR, SUCCESS, BAD_REQUEST } = require('../../utils/constantes');

module.exports.crudUsuariosGetAllServices = async () => {
	logger.info('=========================================');
	logger.info('  Iniciando crudUsuariosGetAllServices   ');
	logger.info('=========================================');
	try {
		let query = null;

		logger.info(' crudUsuariosGetAllServices ');
		query = `SELECT * FROM dbo.Comunas ORDER BY NombreComuna`; // ejemplo de consulta

		return await executeQuery(query, []);
	} catch (error) {
		logger.error(' Error en crudUsuariosGetAllServices: ', error);
		throw error;
	}
};
