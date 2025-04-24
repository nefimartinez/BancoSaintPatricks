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

const rut = Joi.string().pattern(/^[0-9]{8}-[0-9]{1}$/).required().messages({
	'string.base': 'rut debe ser un string',
	'any.required': 'rut es requerido',
	'string.pattern.base': 'rut debe consistir en 8 dígitos numéricos, seguido por un guion (-) y un dígito numérico final. Ejemplo válido: "12345678-9"'
})

const nombre = Joi.string().min(3).max(15).pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/).trim().required().messages({
	'string.base': 'nombre debe ser un string',
	'string.empty': 'nombre no puede estar vacio',
	'string.min': 'nombre debe tener al menos 3 caracteres.',
	'string.max': 'nombre no puede tener más de 15 caracteres.',
	'string.pattern.base': 'nombre solo puede contener letras, espacios y apóstrofes.',
	'any.required': 'nombre es requerido'
});

const apellido = Joi.string().min(4).max(13).pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/).trim().required().messages({
	'string.base': 'apellido debe ser un string',
	'string.empty': 'apellido no puede estar vacio',
	'string.min': 'apellido debe tener al menos 4 caracteres.',
	'string.max': 'apellido no puede tener más de 13 caracteres.',
	'string.pattern.base': 'apellido solo puede contener letras y apóstrofes.',
	'any.required': 'apellido es requerido'
})

// Por el momento se dejó tlds en false para facilitar las pruebas
const email = Joi.string().email({ tlds: false }).required().messages({
	'string.base': 'email debe ser un string',
	'string.empty': 'email no puede estar vacio',
	'any.required': 'email es requerido',
	'string.email': 'el email ingresado no es válido'
})

// Por el momento la contraseña no tiene características específicas de validación para facilitar las pruebas
const password = Joi.string().required().messages({
	'string.base': 'password debe ser un string',
	'string.empty': 'password no puede estar vacio',
	'any.required': 'password es requerido',
})


const idCrudUsuarioSchema = Joi.object({
	id,
}).messages({ 'object.unknown': '{#label} no está permitido' });

const crudUsuarioSchema = Joi.object({
	rut,
	nombre,
	apellido,
	email,
	password
}).messages({ 'object.unknown': '{#label} no está permitido' })

module.exports = {
	idCrudUsuarioSchema,
	crudUsuarioSchema
};
