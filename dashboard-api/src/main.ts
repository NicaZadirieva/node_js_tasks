import { App } from './app';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
    // App зависит от LoggerService - это простейший DI
    const app = new App(new LoggerService());
    await app.init();
}

bootstrap();