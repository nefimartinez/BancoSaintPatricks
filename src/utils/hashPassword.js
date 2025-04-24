'use-strict'

const bcrypt = require('bcrypt');
const PASSWORD_HASH_SALT_ROUNDS = require('../utils/saltRounds')
const ModuleError = require('../utils/moduleError');
const logger = require('../utils/LoggerCNS').loggerCNS;
const { INTERNAL_ERROR } = require('../utils/constantes');

const hashPassword = async (plaintextPassword) => {
    try {
        return bcrypt.hash(plaintextPassword, PASSWORD_HASH_SALT_ROUNDS);
    } catch (error) {
        const moduleError = new ModuleError(error);
        moduleError.statusCode = INTERNAL_ERROR;
        logger.error(' Error en crudUsuariosCreateModule ');
        logger.error(' Error module: ', error);
        throw moduleError;
    }
}

module.exports = hashPassword;