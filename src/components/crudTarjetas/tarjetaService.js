'use strict';

const logger = require('../../utils/LoggerCNS').loggerCNS;
const { executeQuery } = require('../../utils/handleDBPostgres');

//service GetAll
const getAllService = async () => {
	showLogsBanner('  Iniciando tarjetaService -> getAll()   ');

	try {
		const query = `SELECT * FROM "bancoDB".cards ORDER BY balance`; 

		return await executeQuery(query, []);

	} catch (error) {
		logger.error(' Error en tarjetaService -> getAll(): ', error);
		throw error;
	}

};
//service getIdService
const getIdService = async (id) => {
	showLogsBanner('   Iniciando tarjetaService -> getId()   ');

	try {
		const query = `SELECT * FROM "bancoDB".cards WHERE id = $1;`; 

		return await executeQuery(query, [id]);

	} catch (error) {
		logger.error(' Error en tarjetaService -> getId(): ', error);
		throw error;
	}

};
//service crateCardService
const createCardService = async (body) => {
	showLogsBanner('Iniciando tarjetaService ->  createCard()');

	try {
		const query = `INSERT INTO "bancoDB"."cards" (card_number,pin,balance,user_id, createdat) 
		         VALUES ($1, $2, $3, $4, now()) RETURNING *;`; 

		return await executeQuery(query, [
			body.card_number,
			body.pin,
			body.balance,
			body.user_id

		]);

	} catch (error) {
		logger.error(' Error en tarjetaService -> createCard(): ', error);
		throw error;
	}

};
//service updateCardService
const updateCardService = async (body,id) => {
	showLogsBanner('Iniciando tarjetaService ->  updateCard()');

	try {
		const query = `UPDATE "bancoDB"."cards" 
		         SET card_number=$1,pin=$2,balance=$3,user_id=$4, updatedat = now() 
		         WHERE id = $5 RETURNING *;`;

		return await executeQuery(query, [
			body.card_number,
			body.pin,
			body.balance,
			body.user_id,
			id
		]);

	} catch (error) {
		logger.error(' Error en tarjetaService -> updateCard(): ', error);
		throw error;
	}

};
//service updateCardService
const deleteCardService = async (id) => {
	showLogsBanner('Iniciando tarjetaService ->  deleteCard()');

	try {
		const query = `DELETE FROM "bancoDB".cards WHERE id = $1 RETURNING *;`;  

		return await executeQuery(query, [id]);

	} catch (error) {
		logger.error(' Error en tarjetaService -> deleteCard(): ', error);
		throw error;
	}

};



function showLogsBanner(messageBannerLog) {
	logger.info('=========================================');
	logger.info(messageBannerLog);
	logger.info('=========================================');
}


module.exports = {
    getAllService,getIdService,createCardService,updateCardService,deleteCardService
}
