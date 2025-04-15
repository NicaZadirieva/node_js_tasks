import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { IMiddleware } from './middleware.interface';

export default class AuthGuard implements IMiddleware {
	execute({ user }: Request, res: Response, next: NextFunction): void {
		if (user) {
			next();
		} else {
			throw new HTTPError(401, 'Пользователь не авторизован');
		}
	}
}
