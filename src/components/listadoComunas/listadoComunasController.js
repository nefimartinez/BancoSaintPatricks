'use strict';

const { listadoComunasModule } = require('./listadoComunasModule');
const { SUCCESS, INTERNAL_ERROR } = require('../../utils/constantes');
const logger = require('../../utils/LoggerCNS').loggerCNS;

module.exports.listadoComunasController = async (req, res) => {
	logger.info('=====================================');
	logger.info('  Iniciando listadoComunasController ');
	logger.info('=====================================');
	try {
		const response = await listadoComunasModule();
		res.status(SUCCESS).json({
			err_code: 0,
			status: SUCCESS,
			response,
		});
	} catch (error) {
		res.status(error.statusCode || INTERNAL_ERROR).json({
			err_code: 1,
			status: error.statusCode || INTERNAL_ERROR,
			err_msg: error.message || 'Error interno',
		});
	}
};
