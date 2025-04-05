'use strict';

const logger = require('../../utils/LoggerCNS').loggerCNS;
const { executeQuery } = require('../../utils/handleDBPostgres');
const { INTERNAL_ERROR, SUCCESS, BAD_REQUEST } = require('../../utils/constantes');

const getAll = async () => {
	logger.info('=========================================');
	logger.info('  Iniciando getAll -> tarjetaService     ');
	logger.info('=========================================');

    let query = null;
	try {
		query = `SELECT * FROM bancoDB.cards ORDER BY balance`; 

		return await executeQuery(query, []);

	} catch (error) {
		logger.error(' Error en getAll() -> tarjetaService: ', error);
		throw error;
	}
};

module.exports = {
    getAll
}
