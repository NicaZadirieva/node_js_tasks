import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { BaseController } from './common/base.controller';
import { ExceptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IUserController } from './users/users.controller.interface';

@injectable()
export class App {
    app: Express;
    port: number;
    server?: Server;
    

    constructor(@inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: IUserController & BaseController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter
    ) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
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