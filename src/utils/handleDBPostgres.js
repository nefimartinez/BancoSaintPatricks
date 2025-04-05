'use strict';

const pg = require('pg');
const logger = require('../utils/LoggerCNS').loggerCNS;
const { configPostgresDB } = require('../../config/databases');

let pool = null;

async function handleDBPostgres() {
	const { Pool } = pg;

	pool = new Pool({
		// Configuración de la conexión a PostgreSQL
		host: configPostgresDB.host, // Host de PostgreSQL
		user: configPostgresDB.user, // Usuario de PostgreSQL
		database: configPostgresDB.database, // Nombre de la base de datos
		password: configPostgresDB.password, // Contraseña de PostgreSQL
		schema: configPostgresDB.schema, // Esquema de PostgreSQL
		port: configPostgresDB.port, // Puerto de PostgreSQL
		max: 20, // Conexiones máximas
		min: 5, // Conexiones mínimas inactivas
		idleTimeoutMillis: 30000, // 30 segundos
		connectionTimeoutMillis: 5000, // 5 segundos para conectar
		allowExitOnIdle: false, // Permitir salida cuando no hay conexiones activas
	});

	try {
		await pool.connect();
		logger.info('Conexión a PostgreSQL exitosa');
	} catch (error) {
		logger.error('Error al conectar a PostgreSQL:', error);
		throw error;
	}
}

async function executeQuery(query, params = []) {
	if (!pool) {
		logger.error('Pool de conexiones no inicializado');
		throw new Error('Pool de conexiones no inicializado');
	}

	try {
		const client = await pool.connect();
		const result = await client.query(query, params);
		return result;
	} catch (error) {
		logger.error('Error al ejecutar la consulta:', error);
		throw error;
	} finally {
		if (client) {
			client.release();
		}
	}
}

 function closePool() {
	if (pool) {
		 pool.end();
		logger.info('Pool de conexiones cerrado');
	} else {
		logger.warn('No hay pool de conexiones para cerrar');
	}
}

module.exports = {
	handleDBPostgres,
	executeQuery,
	closePool,
};
