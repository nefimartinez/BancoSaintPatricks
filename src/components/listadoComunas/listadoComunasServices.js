'use strict';

const logger = require('../../utils/LoggerCNS').loggerCNS;

module.exports.listadoComunasServices = async () => {
	logger.info('===================================');
	logger.info('  Iniciando listadoComunasServices ');
	logger.info('===================================');
	try {
		let query = null;

		logger.info('listado de Comunas para schema CNS');
		query = `SELECT r.REGION
		, r.DESCRIPCION DESCRIPCION_REGION
		, ci.CIUDAD
		, ci.DESCRIPCION DESCRIPCION_CIUDAD
		, co.COMUNA
		, co.DESCRIPCION DESCRIPCION_COMUNA  
		FROM SISRVOWCNS.COMUNAS co, SISRVOWCNS.CIUDADES ci, SISRVOWCNS.REGIONES r 
		WHERE R.REGION = co.REGION 
		AND ci.CIUDAD = co.CIUDAD 
		AND co.REGION = r.REGION 
		ORDER BY REGION , ci.CIUDAD, co.COMUNA `;

		return await executeSP(query, []);
	} catch (error) {
		logger.error(' Error en listadoComunasServices: ', error);
		throw error;
	}
};
