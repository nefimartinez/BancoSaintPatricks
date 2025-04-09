'use strict';

const pg = require('pg');
const logger = require('../utils/LoggerCNS').loggerCNS;
const { configPostgresDB } = require('../../config/databases');

const ModuleError = require('../utils/moduleError');
const {
	INTERNAL_ERROR,
	NOT_FOUND,
	BAD_REQUEST,
} = require('../utils/constantes');

const fs = require('fs');
const path = require('path');

// singletone pool de conexiones a PostgreSQL
let pool = null; // Pool de conexiones a PostgreSQL

async function handleDBPostgres() {
	// logg de configuración de la base de datos
	logger.info('Configuración de la base de datos PostgreSQL:', {
		host: configPostgresDB.host,
		user: configPostgresDB.user,
		database: configPostgresDB.database,
		port: configPostgresDB.port,
		schema: configPostgresDB.schema,
	});

	// Verifica si el pool ya está inicializado
	if (pool) {
		logger.warn('Pool de conexiones ya inicializado');
		return;
	}
	pool = new pg.Pool({
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
		logger.info('Conectando a PostgreSQL...');

		// healCheck para verificar la conexión
		const healCheck = await healcheck();
		if (healCheck.status === 'DOWN') {
			logger.error(
				'Chequeo de salud de la conexión postgresql: ',
				healCheck.status,
			);
		}

		if (healCheck.status === 'OK') {
			logger.info(
				'Chequeo de salud de la conexión postgresql: ',
				healCheck.status,
			);
			logger.info('Fecha y hora actual en PostgreSQL:', healCheck.timestamp);
		}

		await pool.connect();
		logger.info('Conexión a PostgreSQL exitosa');
	} catch (error) {
		logger.error('Error al conectar a PostgreSQL:', error);
		throw error;
	}

	createSchema()
}

async function createSchema() {
	const schemaPAth = path.join(__dirname, '../../scripts/scriptBancoDB.sql');
	const schema = fs.readFileSync(schemaPAth, 'utf8');

	let client = await pool.connect();

	client.query(schema, function (err, results) {
		if (err) {
			console.error('Error ejecutando el esquema:', err);
		} else {
			console.log('Esquema cargado correctamente');
		}
		client.release()
	})
}

async function executeQuery(query, params = []) {
	if (!pool) {
		logger.error('Pool de conexiones no inicializado');
		throw new Error('Pool de conexiones no inicializado');
	}
	let client;
	try {
		client = await pool.connect(); // Obtiene un cliente del pool
		const result = await client.query(query, params);
		return result.rows; // Devuelve las filas del resultado
	} catch (error) {
		logger.error('Error al ejecutar la consulta:', error);
		throw error;
	} finally {
		if (client) {
			client.release(); // Libera el cliente de vuelta al pool
			logger.info('Conexión liberada al pool');
		}
	}
}

async function healcheck() {
	// Realiza un chequeo de salud en la conexión
	try {
		const { rows } = await pool.query('SELECT NOW() as current_time');
		return {
			status: 'OK',
			timestamp: rows[0].current_time,
		};
	} catch (error) {
		return {
			status: 'DOWN',
			error: error.message,
		};
	}
}

function closePool() {
	if (pool) {
		pool.end();
		pool = null; // Limpiar la referencia al pool
		logger.info('Pool de conexiones cerrado...');
	} else {
		logger.warn('No hay pool de conexiones para cerrar');
	}
}

module.exports = {
	handleDBPostgres,
	executeQuery,
	closePool,
};
