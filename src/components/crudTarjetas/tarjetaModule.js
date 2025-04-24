'use strict';

const {  
	getAllService,
	getIdService,
	createCardService,
	updateCardService,
	deleteCardService 
} = require('./tarjetaService');
const ModuleError = require('../../utils/moduleError');
const logger = require('../../utils/LoggerCNS').loggerCNS;
const { INTERNAL_ERROR } = require('../../utils/constantes');



//module getAllModule
const getAllModule = async () => {

	showBanner('     Iniciando tarjetaModule -> getAll()     ');

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

//module getIdModule
const getIdModule = async () => {

	showBanner('      Iniciando tarjetaModule -> getId()     ');

	try {
		const response = await getIdService();
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
const createCardModule = async () => {

	showBanner('   Iniciando tarjetaModule -> createCard()   ');

	try {
		const response = await createCardService();
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
const updateCardModule = async () => {

	showBanner('   Iniciando tarjetaModule -> updateCard()   ');

	try {
		const response = await updateCardService();
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
const deleteCardModule = async () => {

	showBanner('   Iniciando tarjetaModule -> deleteCard()   ');

	try {
		const response = await deleteCardService();
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





