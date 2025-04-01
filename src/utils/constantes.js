'use strict';


// constantes http
const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_ERROR = 500;


//constantes de negocio
const ERROR = 'Error';
const ERROR_MESSAGE = 'Ha ocurrido un error';
const ERROR_NOT_FOUND = 'No se ha encontrado el recurso';
const ERROR_CONFLICT = 'Ya existe el recurso';
const ERROR_BAD_REQUEST = 'Petición mal formada';
const ERROR_INTERNAL = 'Error interno';




module.exports = {
	SUCCESS,
	CREATED,
	NO_CONTENT,
	BAD_REQUEST,
	NOT_FOUND,
	CONFLICT,
	INTERNAL_ERROR,
	ERROR,
	ERROR_MESSAGE,
	ERROR_NOT_FOUND,
	ERROR_CONFLICT,
	ERROR_BAD_REQUEST,
	ERROR_INTERNAL	
};
