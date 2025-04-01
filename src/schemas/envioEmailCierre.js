'use strict';


const Joi = require('joi').extend(require('@joi/date'));

const destinatarios = Joi.array().items(Joi.object({
    nombre: Joi.string().required().messages({
        'string.base': 'nombre debe ser un texto',
        'any.required': 'nombre es requerido',
    }),
    apellidoPaterno: Joi.string().required().messages({
        'string.base': 'apellido paterno debe ser un texto',
        'any.required': 'apellido paterno es requerido',
    }),
    apellidoMaterno: Joi.string().required().messages({
        'string.base': 'apellido materno debe ser un texto',
        'any.required': 'apellido materno es requerido',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'email debe ser un texto',
        'any.required': 'email es requerido',
        'string.email': 'email no es válido',
    }),
})).required().messages({
    'array.base': 'destinatarios debe ser un arreglo',
    'any.required': 'destinatarios es requerido',
});

const subject = Joi.string().required().messages({
    'string.base': 'subject debe ser un texto',
    'any.required': 'subject es requerido',
});

const idTemplate = Joi.number().required().messages({
    'number.base': 'idTemplate debe ser un número',
    'any.required': 'idTemplate es requerido',
});

const template = Joi.object({
    tipoRequerimiento: Joi.string().required().messages({
        'string.base': 'tipoRequerimiento debe ser un texto',
        'any.required': 'tipoRequerimiento es requerido',
    }),
    numeroRequerimiento: Joi.number().required().messages({
        'number.base': 'numeroRequerimiento debe ser un número',
        'any.required': 'numeroRequerimiento es requerido',
    }),
    poliza: Joi.number().required().messages({
        'number.base': 'poliza debe ser un número',
        'any.required': 'poliza es requerido',
    }),
    fechaRecepcion: Joi.date().format('DD/MM/YYYY').required().messages({
        'date.base': 'fechaRecepcion debe ser una fecha',
        'any.required': 'fechaRecepcion es requerido',
    }),
    nombreArchivo: Joi.string().required().messages({
        'string.base': 'nombreArchivo debe ser un texto',
        'any.required': 'nombreArchivo es requerido',
    }),
    archivo: Joi.string().base64().required().messages({
        'string.base': 'archivo debe ser un texto',
        'any.required': 'archivo es requerido',
    }),
}).required().messages({
    'object.base': 'template debe ser un objeto',
    'any.required': 'template es requerido',
});


// functions
const envioEmailCierreValidacion = Joi.object({
    destinatarios,
    subject,
    idTemplate,
    template,
}).messages({ 'object.unknown': '{#label} no está permitido' });

module.exports = {
	envioEmailCierreValidacion,
};


