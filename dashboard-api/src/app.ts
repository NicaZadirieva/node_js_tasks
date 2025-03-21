import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
export class App {
    app: Express;
    port: number;
    server?: Server;
    logger?: LoggerService;
    userController?: UserController;

    constructor(logger: LoggerService) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
    }

    useRoutes() {
        //this.app.use(express.json());
        //this.app.use('/api/v1/users', require('./routes/users.route'));
        if (this.logger) {
            this.userController = new UserController(this.logger);
        }

    }

    public async init() {
        this.useRoutes();
        this.server = await this.app.listen(this.port);
        this.logger?.log(`Server is running on port ${this.port}`);
    } 
}