'use strict';

const { BAD_REQUEST } = require('../utils/constantes');
const logger = require('../utils/LoggerCNS').loggerCNS;
const ModuleError = require('../utils/moduleError');
const validateSchema = (schema, property) => {
	return async (req, res, next) => {
		try {
			const { error } = await schema.validateAsync(req[property], {
				abortEarly: false,
			});
			if (error) {
				logger.info(`Error en validacion de schema: ${error}`);
				const moduleError = new ModuleError('Error en validacion de schema');
				moduleError.message = error.details[0].message;
				throw moduleError;
			}
			next();
		} catch (error) {
			logger.error(`Error en validacion de schema: ${error}`);
			const formattedError = error.message.split('. ') || 'Error interno';
			res.status(BAD_REQUEST).send({
				err_code: 1,
				status: BAD_REQUEST,
				err_msg: formattedError,
			});
		}
	};
};

module.exports = validateSchema;
