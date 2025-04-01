'use strict';

const log4js = require("log4js");
const loggerLevel = process.env.LOGGERLEVEL || "info";
const appender = process.env.LOGGERAPPENDER || "stdout";
const nodeEnv = process.env.NODE_ENV || "default";
/* Patrones de formato de logs */
const defaultPattern = "%[[%d %p %f{1}] %X{trackid} %X{codigosesion}%] %m";
const prodPattern = "[%d %p %f{1}] %X{trackid} %X{codigosesion} %m";
const accessPattern = "%[[%d %p]%] %m";

/**
 * Función de configuración global
 */
function loggerConfigure() {
  let logPattern = defaultPattern;

  // En el caso de ambientes productivos
  if (
    nodeEnv === "produccion" ||
    nodeEnv === "production" ||
    nodeEnv === "prod"
  )
    logPattern = prodPattern;

  log4js.configure({
    appenders: {
      out: {
        type: appender,
        layout: {
          type: "pattern",
          pattern: logPattern
        }
      },
      expressOut: {
        type: appender,
        layout: {
          type: "pattern",
          pattern: accessPattern
        }
      }
    },
    categories: {
      default: {
        appenders: ["out"],
        level: loggerLevel,
        enableCallStack: true
      },
      access: { appenders: ["expressOut"], level: loggerLevel }
    }
  });
}

/**
 * Función para obtener un logger con trackId y codigosesion en su contexto
 * @param trackId
 * @param codigosesion
 * @returns {Logger}
 */
function getLogger(trackId = "", codigosesion = "") {
  const logger = log4js.getLogger("default");
  logger.addContext("trackid", trackId);
  logger.addContext("codigosesion", codigosesion);
  return logger;
}



/* Ejecutamos la configuración de log4js cada vez que se instancia esta librería */
loggerConfigure();

const loggerCNS = getLogger();


module.exports = { loggerCNS };
