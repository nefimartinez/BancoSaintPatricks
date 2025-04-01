'use strict';

let parameter = null;
function addEnvParam(paramName, required = false) {
	// Evaluación del parámetro
	parameter = process.env[paramName];

	if (!parameter) {
		if (required)
			throw new Error('No se definió la variable de entorno ' + paramName);
		else return null;
	}

	return parameter;
}

/* Constantes de variables de entorno */

const config = {
	version: addEnvParam('VERSION', true),
	port: addEnvParam('PORT', true),
	env: addEnvParam('ENV', true),	
	REGION: addEnvParam('REGION', true),	
};

module.exports = config;
