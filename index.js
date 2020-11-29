const winston = require('winston');
const { combine, printf } = winston.format;

const MODULE_NAME = 'logger';

const DEF_TO_CONSOLE = true;

const DEF_CONFIGS = {
  toConsole: DEF_TO_CONSOLE,
};

const DEF_MODULE_NAME = 'unknown';
const DEF_LEVEL = 'info';

const tlnFormat = printf(({ level, message }) => `${level}: ${message}`);

class Logger {
  constructor(configs=DEF_CONFIGS) {
    this.toConsole = configs.toConsole | DEF_TO_CONSOLE;
    this.logger = this.toConsole ?
      winston.createLogger({
        format: combine(
          winston.format.colorize(),
          tlnFormat,
        ),
        transports: [
          new winston.transports.Console(),
        ],
      })
      : null;
  }

  log = (moduleName=DEF_MODULE_NAME, level=DEF_LEVEL, msg=null) => {
    if (this.logger) {
      this.logger.log({
        level,
        message: `[${moduleName}] ${msg}`
      })
    }
  }

  toString = () => `[${MODULE_NAME}]\n\
    \ttoConsole: ${this.toConsole}\n\
    `;
}

module.exports = Logger;
