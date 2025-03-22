import { App } from './app';
import { ExceptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';

async function bootstrap() {
    const logger: ILogger = new LoggerService();
    // TODO: убрать дерево зависимостей
    const app = new App(
        logger, 
        new UserController(logger), 
        new ExceptionFilter(logger)
    );
    
    await app.init();
}

bootstrap();