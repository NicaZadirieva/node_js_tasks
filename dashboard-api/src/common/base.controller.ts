import { Response, Router } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { ILogger } from '../logger/logger.interface';
import { IMiddleware } from './middleware.interface';
import { ExpressReturnType, IControllerRoute } from './route.interface';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}
	get router(): Router {
		return this._router;
	}

	public created(res: Response): ExpressReturnType {
		return res.status(201).send();
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send(res, 200, message);
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}
	protected bindRoutes(routes: IControllerRoute[]): void {
		routes.forEach((route) => {
			this.logger.log(`[${route.method}] [${route.path}]`);
			const middlewares = route.middlewares?.map((m: IMiddleware) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middlewares ? [...middlewares, handler] : handler;
			this._router[route.method](route.path, pipeline);
		});
	}
}
