'use strict';

const Joi = require('joi').extend(require('@joi/date'));

const id = Joi.number().integer().min(1).max(99999999).required().messages({
    'number.base': 'id debe ser un número entero',
    'number.integer': 'id debe ser un número entero',
    'number.min': 'id debe ser mayor que 0 ',
    'number.max': 'id debe ser menor que 99999999 ',
    'number.empty': 'id no puede estar vacío',
    'any.required': 'id es requerido',
});


const idCrudUsuarioSchema = Joi.object({
    // id: Joi.number().integer().required(),
	id
}).messages({ 'object.unknown': '{#label} no está permitido' });


module.exports =  idCrudUsuarioSchema ;