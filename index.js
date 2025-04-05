const app = require('./app');
const {config} = require('./config/config');
const loggerCNS = require('./src/utils/LoggerCNS').loggerCNS;

// Iniciar servidor
const  port = config.port;
app.listen(port, () => {
	loggerCNS.info(`Servidor ejecutándose en el puerto: ${port}`);
});
