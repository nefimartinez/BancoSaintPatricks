'use strict';

const { config } = require('./config');

const configPostgresDB = {
	host: config.POSTGRES_HOST,
	user: config.POSTGRES_USER,
	database: config.POSTGRES_DATABASE,
	password: config.POSTGRES_PASSWORD,
    schema: config.POSTGRES_SCHEMA,
	port: config.POSTGRES_PORT,
};

module.exports = { configPostgresDB };
