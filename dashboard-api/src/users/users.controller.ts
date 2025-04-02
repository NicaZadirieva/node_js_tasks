import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { inject, injectable } from 'inversify';
import { resolve } from 'path';
import 'reflect-metadata';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUserController } from './users.controller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) logger: ILogger) {
		super(logger);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'login');
	}

	register(req: Request, res: Response, next: NextFunction): void {
		fs.readFileSync(resolve(__dirname, '../../Урок_1 [ 01.02.2025 ].mp4'));
		next(new HTTPError(401, 'Ошибка авторизации'));
	}
}
