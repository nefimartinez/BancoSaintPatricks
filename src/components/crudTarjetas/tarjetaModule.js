'use strict';

const {  
	getAllService,
	getIdService,
	createCardService,
	updateCardService,
	deleteCardService 
} = require('./tarjetaService');
const ModuleError = require('../../utils/moduleError');
const idCrudUsuarioSchema = require('../../schemas/crudUsuarioSchema');
const logger = require('../../utils/LoggerCNS').loggerCNS;
const { INTERNAL_ERROR,NOT_FOUND } = require('../../utils/constantes');



//module getAllModule
const getAllModule = async () => {

	showBanner('     Iniciando tarjetaModule -> getAll()     ');

	try {
		const response = await getAllService();
		if (response.length === 0) {
			return {
				err_code: -1,
				statusCode: NOT_FOUND,
				err_msg: 'No se encontraron registros de tarjetas',
			};
		}
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

//module getIdModule
const getIdModule = async (id) => {

	showBanner('      Iniciando tarjetaModule -> getId()     ');

	try {
			// validacion de entrada con JOI
		const { error } = await idCrudUsuarioSchema.validate(
			{ id },
			{ abortEarly: false }, // abortEarly: false para que devuelva todos los errores
		);

		if (error) {
			return {
				err_code: -1,
				statusCode: NOT_FOUND,
				err_msg: error.details[0].message,
			};
		}
		//end JOI

		//getIdService
		const response = await getIdService(id);
		
		if (response.length === 0) {
			return {
				err_code: -1,
				statusCode: NOT_FOUND,
				err_msg: 'No se encontro registro de tarjeta por id',
			};
		}
		
		return  response;

	} catch (error) {
		if (error.statusCode) throw error; // error controlado
		const moduleError = new ModuleError(error);
		moduleError.statusCode = INTERNAL_ERROR;
		logger.error(' Error en tarjetaModule -> getId():');
		logger.error(' Error module: ', error);
		throw moduleError;
	}
};

//module createCardModule
const createCardModule = async (body) => {

	showBanner('   Iniciando tarjetaModule -> createCard()   ');

	try {
			//falta ver si existe la tarjeta

		const response = await createCardService(body);
		if (response.length === 0) {
			return {
				err_code: -1,
				statusCode: NOT_FOUND,
				err_msg: 'No se pudo crear tarjeta',
			};
		}
		return response;

	} catch (error) {
		if (error.statusCode) throw error; // error controlado
		const moduleError = new ModuleError(error);
		moduleError.statusCode = INTERNAL_ERROR;
		logger.error(' Error en tarjetaModule -> createCard():');
		logger.error(' Error module: ', error);
		throw moduleError;
	}
};

//module updateCardModule
const updateCardModule = async (body, id) => {

	showBanner('   Iniciando tarjetaModule -> updateCard()   ');

	try {
		// validacion de entrada con JOI
		const { error } = await idCrudUsuarioSchema.validate(
			{ id },
			{ abortEarly: false }, // abortEarly: false para que devuelva todos los errores
		);

		if (error) {
			return {
				err_code: -1,
				statusCode: NOT_FOUND,
				err_msg: error.details[0].message,
			};
		}
		//end JOI

		const response = await updateCardService(body,id);
		if (response.length === 0) {
			return {
				err_code: -1,
				statusCode: NOT_FOUND,
				err_msg: 'No se encontro registro de tarjeta, para actualizar',
			};
		}
		return response;
	} catch (error) {
		if (error.statusCode) throw error; // error controlado
		const moduleError = new ModuleError(error);
		moduleError.statusCode = INTERNAL_ERROR;
		logger.error(' Error en tarjetaModule -> updateCard():');
		logger.error(' Error module: ', error);
		throw moduleError;
	}
};

//module deleteCardModule
const deleteCardModule = async (id) => {

	showBanner('   Iniciando tarjetaModule -> deleteCard()   ');

	try {
		// validacion de entrada con JOI
		const { error } = await idCrudUsuarioSchema.validate(
			{ id },
			{ abortEarly: false }, // abortEarly: false para que devuelva todos los errores
		);

		if (error) {
			return {
				err_code: -1,
				statusCode: NOT_FOUND,
				err_msg: error.details[0].message,
			};
		}
		//end JOI

		//deleteCardService
		const response = await deleteCardService(id);
		
		if (response.length === 0) {
			return {
				err_code: -1,
				statusCode: NOT_FOUND,
				err_msg: 'No se encontró registro de tarjeta, así que no se elimino nada',
			};
		}
		return response;
	} catch (error) {
		if (error.statusCode) throw error; // error controlado
		const moduleError = new ModuleError(error);
		moduleError.statusCode = INTERNAL_ERROR;
		logger.error(' Error en tarjetaModule -> deleteCard():');
		logger.error(' Error module: ', error);
		throw moduleError;
	}
};

//sowBanner
function showBanner(messageBanner) {
	
	logger.info('=============================================');
	logger.info(messageBanner);
	logger.info('=============================================');
}


module.exports = {
	getAllModule,getIdModule,createCardModule,updateCardModule,deleteCardModule
};





