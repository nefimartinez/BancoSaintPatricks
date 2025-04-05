'use strict';

const {
	SUCCESS,
	INTERNAL_ERROR,
	NOT_FOUND,
	BAD_REQUEST,
	ERROR_INTERNAL,
} = require('../../utils/constantes');

const {	getAll } = require('./tarjetaModule');
const logger = require('../../utils/LoggerCNS').loggerCNS;

// servicio getAll
const getAll = async (req, res) => {
	logger.info('============================================');
	logger.info('   Iniciando tarjetaController -> getAll()  ');
	logger.info('============================================');
	try {
		const response = await getAll();
		if (response.err_code === -1) {
			// NO-OK
			res.status(response.statuscode || BAD_REQUEST).json({
				err_code: -1,
				status: response.statuscode,
				err_msg: response.err_msg,
			});
		} else {
			// OK
			res.status(response.statuscode || SUCCESS).json({
				err_code: 0,
				status: SUCCESS,
				response,
			});
		}
	} catch (error) {
		res.status(error.statusCode || INTERNAL_ERROR).json({
			err_code: 1,
			status: error.statusCode || INTERNAL_ERROR,
			err_msg: error.message || ERROR_INTERNAL,
		});
	}
};
module.exports = {
    getAll
}