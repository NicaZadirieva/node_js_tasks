import express, { Express } from 'express';
import { Server } from 'http';
import { ExceptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { UserController } from './users/users.controller';
export class App {
    app: Express;
    port: number;
    server?: Server;
    logger?: ILogger;
    userController?: UserController;
    exceptionFilter: ExceptionFilter;

    constructor(logger: ILogger,
        userController: UserController,
        exceptionFilter: ExceptionFilter
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
    }

    useRoutes() {
        if (this.userController) {
            this.app.use('/users', this.userController.router);
        }
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = await this.app.listen(this.port);
        this.logger?.log(`Server is running on port ${this.port}`);
    } 
    
}