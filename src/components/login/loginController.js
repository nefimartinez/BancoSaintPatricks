'use strict';

const { INTERNAL_ERROR, ERROR_INTERNAL, BAD_REQUEST, SUCCESS } = require('../../utils/constantes');
const logger = require('../../utils/LoggerCNS').loggerCNS;
const { validateDataOfUser } = require('./loginModule');

const login = async (req, res) => {
    logger.info('============================================');
    logger.info('     Iniciando loginController -> login     ');
    logger.info('============================================');
    try {
        const response = await validateDataOfUser(req.body);

        if(response.err_code === -1){
            res.status(response.statusCode || BAD_REQUEST).json({
                err_code: -1,
                status: response.statusCode,
                err_msg: response.err_msg,
            });
        }else{
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
}

module.exports = {
    login,
}