'use strict';

const { listadoComunasServices } = require('./listadoComunasServices');
const ModuleError = require('../../utils/moduleError');
const logger = require('../../utils/LoggerCNS').loggerCNS;
const { INTERNAL_ERROR, NOT_FOUND} = require('../../utils/constantes');

module.exports.listadoComunasModule = async () => {
	logger.info('=========================================');
	logger.info('     Iniciando listadoComunasModule      ');
	logger.info('=========================================');
	try {
		const response = await listadoComunasServices();

		if (response.rows.length === 0) {
			const moduleError = new ModuleError('No se encontraron registros');
			moduleError.statusCode = NOT_FOUND;
			throw moduleError;
		}

		const lista = [];
		for (const item of response.rows) {
			let dato = {
				idComuna: String(item.COMUNA),
				idCiudad: String(item.CIUDAD),
				idRegion: String(item.REGION),
				glosaComuna: String(item.DESCRIPCION_COMUNA),
				glosaCiudad: String(item.DESCRIPCION_CIUDAD),
				glosaRegion: String(item.DESCRIPCION_REGION)
			};
			lista.push(dato);
		}

		return lista;
	} catch (error) {
		if (error.statusCode) throw error; // error controlado
		const moduleError = new ModuleError(error);
		moduleError.statusCode = INTERNAL_ERROR;
		logger.error(' Error en listadoComunaModule ');
		logger.error(' Error module: ', error);
		throw moduleError;
	}
};
