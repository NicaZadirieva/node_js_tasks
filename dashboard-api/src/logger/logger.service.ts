import { ILogObj, Logger } from "tslog";
import { ILogger } from './logger.interface';

export class LoggerService implements ILogger {
    public logger: Logger<ILogObj>;

    constructor() {
        const loggerTemplate =
      "{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}: ";
        this.logger = new Logger({
            prettyLogTemplate: loggerTemplate
        });
    }

    log(...args: unknown[]) {
        this.logger.info(...args);
    }
    error(...args: unknown[]) {
        this.logger.error(...args);
    }
    warn(...args: unknown[]) {
        this.logger.warn(...args);
    }
}