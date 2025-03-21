import { Response, Router } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IControllerRoute } from './route.interface';
export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: LoggerService) {
        this._router = Router();
    }
    get router(): Router {
        return this._router;
    }

    public created(res: Response) {
        return res.status(201).send();
    }

    public ok<T>(res: Response, message: T) {
        return this.send(res, 200, message);
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type("application/json");
        return res.status(code).json(message);
    }
    protected bindRoutes(routes: IControllerRoute[]) {
        routes.forEach((route) => {
            this.logger.log(`[${route.method}] [${route.path}]`);
            const handler = route.func.bind(this);
            this._router[route.method](route.path, handler);
        });
    }
}