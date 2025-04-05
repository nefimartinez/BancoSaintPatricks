'use strict';

const {
	SUCCESS,
	INTERNAL_ERROR,
	NOT_FOUND,
	BAD_REQUEST,
	ERROR_INTERNAL,
} = require('../../utils/constantes');
const {
	crudUsuariosGetAllModule,
	crudUsuariosAllByIdModule,
} = require('./crudUsuariosModule');
const logger = require('../../utils/LoggerCNS').loggerCNS;

// servicio getAll
module.exports.crudUsuariosGetAllController = async (req, res) => {
	logger.info('============================================');
	logger.info('  Iniciando crudUsuariosGetAllController    ');
	logger.info('============================================');
	try {
		const response = await crudUsuariosGetAllModule();
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

// servicio getAllById
module.exports.crudUsuariosGetAllByIdController = async (req, res) => {
	logger.info('=============================================');
	logger.info('  Iniciando crudUsuariosGetAllByIdController ');
	logger.info('=============================================');
	try {
		const response = await crudUsuariosAllByIdModule(req.params.id);
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
