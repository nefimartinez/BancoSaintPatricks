'use strict';

const {
	SUCCESS,
	INTERNAL_ERROR,
	BAD_REQUEST,
	ERROR_INTERNAL,
	CREATED,
} = require('../../utils/constantes');
const {
	crudUsuariosGetAllModule,
	crudUsuariosAllByIdModule,
	crudUsuariosCreateModule,
	crudUsuariosUpdateModule,
	crudUsuariosDeleteModule,
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
			res.status(response.statusCode || BAD_REQUEST).json({
				err_code: -1,
				status: response.statusCode,
				err_msg: response.err_msg,
			});
		} else {
			// OK
			res.status(response.statusCode || SUCCESS).json({
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

// servicio crudUsuariosPost
module.exports.crudUsuariosCreateController = async (req, res) => {
	logger.info('=========================================');
	logger.info('  Iniciando crudUsuariosCreateController ');
	logger.info('=========================================');
	try {
		const response = await crudUsuariosCreateModule(req.body);
		if (response.err_code === -1) {
			// NO-OK
			res.status(response.statusCode || BAD_REQUEST).json({
				err_code: -1,
				status: response.statusCode,
				err_msg: response.err_msg,
			});
		} else {
			// OK
			res.status(response.statusCode || CREATED).json({
				err_code: 0,
				status: CREATED,
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

// servicio crudUsuariosUpdate
module.exports.crudUsuariosUpdateController = async (req, res) => {
	logger.info('=========================================');
	logger.info('  Iniciando crudUsuariosUpdateController ');
	logger.info('=========================================');
	try {
		const response = await crudUsuariosUpdateModule(req.params.id, req.body);
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

// servicio crudUsuariosDelete
module.exports.crudUsuariosDeleteController = async (req, res) => {
	logger.info('=========================================');
	logger.info('  Iniciando crudUsuariosDeleteController ');
	logger.info('=========================================');
	try {
		const response = await crudUsuariosDeleteModule(req.params.id);
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
