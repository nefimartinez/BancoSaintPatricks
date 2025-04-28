'use strict';

const {
	SUCCESS,
	INTERNAL_ERROR,
	BAD_REQUEST,
	ERROR_INTERNAL,
} = require('../../utils/constantes');

const { getAllModule,getIdModule,createCardModule,updateCardModule,deleteCardModule } = require('./tarjetaModule');
const logger = require('../../utils/LoggerCNS').loggerCNS;

// servicio getAll
const getAllController = async (req, res) => {
	logger.info('============================================');
	logger.info('   Iniciando Controller   getAllController  ');
	logger.info('============================================');

	try {
		const response = await getAllModule();
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

// servicio get id card
const getIdController = async (req, res) => {
	logger.info('============================================');
	logger.info('   Iniciando Controller    getIdController  ');
	logger.info('============================================');

	try {
		const response = await getIdModule(req.params.id);
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

// servicio createCard
const createCardController = async (req, res) => {
	logger.info('============================================');
	logger.info('   Iniciando Controller createCardController');
	logger.info('============================================');

	try {
		const response = await createCardModule(req.body);
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

// servicio updateCard
const updateCardController = async (req, res) => {
	logger.info('============================================');
	logger.info('   Iniciando Controller updateCardController ');
	logger.info('============================================');

	try {
		const response = await updateCardModule( req.body , req.params.id);
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

// servicio deleteCard
const deleteCardController = async (req, res) => {
	logger.info('============================================');
	logger.info('   Iniciando Controller deleteCardController ');
	logger.info('============================================');

	try {
		const response = await deleteCardModule(req.params.id);
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

module.exports = {
	getAllController,getIdController,createCardController,updateCardController,deleteCardController
};
