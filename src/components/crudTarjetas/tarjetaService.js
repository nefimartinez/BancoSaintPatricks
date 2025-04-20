'use strict';

const logger = require('../../utils/LoggerCNS').loggerCNS;
const { executeQuery } = require('../../utils/handleDBPostgres');

const getAllService = async () => {
	showLogsBannerGetAll();

	try {
		const query = `SELECT * FROM "bancoDB".cards ORDER BY balance`; 

		return await executeQuery(query, []);

	} catch (error) {
		logger.error(' Error en tarjetaService -> getAll(): ', error);
		throw error;
	}

};



function showLogsBannerGetAll() {
	logger.info('=========================================');
	logger.info('  Iniciando tarjetaService -> getAll()   ');
	logger.info('=========================================');
}


module.exports = {
    getAllService
}
