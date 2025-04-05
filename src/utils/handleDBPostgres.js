'use strict';

const pg = require('pg');
const logger = require('../utils/LoggerCNS').loggerCNS;

const pool = null;

async function handleDBPostgres(configPostgresDB) {
	const { Pool } = pg;

	pool = new Pool({
		// Configuración de la conexión a PostgreSQL
		host: configPostgresDB.POSTGRES_HOST, // Host de PostgreSQL
		user: configPostgresDB.POSTGRES_USER, // Usuario de PostgreSQL
		database: configPostgresDB.POSTGRES_DATABASE, // Nombre de la base de datos
		password: configPostgresDB.POSTGRES_PASSWORD, // Contraseña de PostgreSQL
		schema: configPostgresDB.POSTGRES_SCHEMA, // Esquema de PostgreSQL
		port: configPostgresDB.POSTGRES_PORT, // Puerto de PostgreSQL
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

async function closePool() {
	if (pool) {
		await pool.end();
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
