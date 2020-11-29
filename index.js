const winston = require('winston');
const { combine, printf } = winston.format;

const DEF_TO_CONSOLE = true;

const DEF_CONFIGS = {
  toConsole: DEF_TO_CONSOLE,
}

const DEF_MODULE_NAME = 'unknown';
const DEF_LEVEL = 'info';

const tlnFormat = printf(({ level, message }) => `${level}: ${message}`);

function logger(configs=DEF_CONFIGS) {
  const toConsole = configs.toConsole | DEF_TO_CONSOLE;

  let logger = null;
  if (toConsole) {
    logger = winston.createLogger({
      format: combine(
        winston.format.colorize(),
        tlnFormat,
      ),
      transports: [
        new winston.transports.Console(),
      ]
    });
  }

  this.log = (moduleName=DEF_MODULE_NAME, level=DEF_LEVEL, msg) => {
    if (!logger)  return;
    logger.log({
      level,
      message: `[${moduleName}] ${msg}`
    })
  }

}

module.exports = logger;
