import express, { Express } from 'express';
import { Server } from 'http';
export class App {
    app: Express;
    port: number;
    server?: Server;

    constructor() {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        //this.app.use(express.json());
        //this.app.use('/api/v1/users', require('./routes/users.route'));
    }

    public async init() {
        this.useRoutes();
        this.server = await this.app.listen(this.port);
        //TODO: логгер
        console.log(`Server is running on port ${this.port}`);
    } 
}