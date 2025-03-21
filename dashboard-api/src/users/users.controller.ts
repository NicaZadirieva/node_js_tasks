import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/route.interface';
import { LoggerService } from '../logger/logger.service';

export class UserController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes();
    }

    protected bindRoutes(): void {
        const routes: IControllerRoute[] = [];
        routes.push({
            path: '/login',
            func: function (req: Request, res: Response, next: NextFunction): void {
                res.send('login');
            },
            method: 'get'
        });

        routes.push({
            path: '/register',
            func: function (req: Request, res: Response, next: NextFunction): void {
                res.send('register');
            },
            method: 'get'
        });
        super.bindRoutes(routes);
    }


}