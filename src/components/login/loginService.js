'use strict';

const logger = require('../../utils/LoggerCNS').loggerCNS;
const { executeQuery } = require('../../utils/handleDBPostgres');

const findUserByEmail = async (email) => {
    logger.info('=========================================');
    logger.info('       Iniciando findUserByEmail         ');
    logger.info('=========================================');

    let query = null;
    try {
        query = `
        SELECT id, email, password, rol_id
          FROM "bancoDB".user
          WHERE email = $1
        `;

        return await executeQuery(query, [email]);
    } catch (error) {
        logger.error('Error en findUserByEmail ', error);
        throw error;
    }
}

module.exports = {
    findUserByEmail,
}