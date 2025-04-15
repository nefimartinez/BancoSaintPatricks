'use-strict';

const { findUserByEmail } = require('./loginService');
const logger = require('../../utils/LoggerCNS').loggerCNS;
const ModuleError = require('../../utils/moduleError');
const { INTERNAL_ERROR, NOT_FOUND, BAD_REQUEST } = require('../../utils/constantes');
const { config } = require('../../../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validateDataOfUser = async (body) => {
    logger.info('=============================================');
    logger.info('   Iniciando loginModule -> getfindUserByEmail   ');
    logger.info('=============================================');
    try {
        const { email, password } = body;

        if(!email || !password){
            return {
                err_code: -1,
                status: BAD_REQUEST,
                err_msg: 'ERROR! se requieren los siguientes campos: email, password',
            };
        }

        const user = await findUserByEmail(email);

        if(user.length === 0){
            return {
                err_code: -1,
                status: NOT_FOUND,
                err_msg: 'ERROR! el email no se encuentra registrado',
            };
        }

        let admin = false;
        if(user[0].rol_id === 1){
            admin = true;
        }else{
            admin = false;
        }

        const match = await bcrypt.compare(password, user[0].password);

        if(!match){
            return {
                err_code: -1,
                status: NOT_FOUND,
                err_msg: 'ERROR! credenciales invalidas',
            }
        }

        const token = jwt.sign({ email, admin }, config.JWT_SECRET_KEY, { expiresIn: '1h' });

        return token;
    } catch (error) {
        if(error.statusCode) throw error;
        const moduleError = new ModuleError(error);
        moduleError.statusCode = INTERNAL_ERROR;
        logger.error(' Error en loginModule -> getfindUserByEmail');
        logger.error(' Error module: ', error);
        throw moduleError;
    }
}

module.exports = {
    validateDataOfUser,
}