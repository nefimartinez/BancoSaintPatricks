'use strict';

const express = require('express');
require('express-async-errors');
const helmet = require('helmet');
const router = require('./routes');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const loggerCNS = require('./src/utils/LoggerCNS').loggerCNS;

const app = express();

async function serverStart() {
	try {
		app.use(bodyParser.json());
		app.use(helmet());

		// cors config
		const corsConfig = {
			origin: ['https://*'],
		};
		app.use(cors(corsConfig));

		// Incorporar rutas
		router(app);

		//conecta a DB
		await connectDB();
	} catch (error) {
		loggerCNS.error(error);
		await cleanup();
	}
}

async function connectDB() {
	// Create coneccion a db
}

async function disconnectDB() {
	// cierre de la coneccion a DB
}

async function cleanup() {
	try {
		loggerCNS.info('Desconectando...');
		await disconnectDB();
		process.exit(1);
	} catch (error) {
		loggerCNS.error(error);
		process.exit(1);
	}
}

// Captura de señales de S.O. en las que ejecutaremos el cierre de conexiones
process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);
process.on('SIGHUP', cleanup);

serverStart();

module.exports = app;
