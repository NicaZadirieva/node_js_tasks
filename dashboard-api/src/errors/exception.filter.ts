import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}
	catch(error: Error | HTTPError, request: Request, response: Response, next: NextFunction) {
		if (error instanceof HTTPError) {
			this.logger.error(`[${error.context}] ${error.statusCode} : Ошибка ${error.message}`);
			response.status(error.statusCode || 500).send({ err: error.message });
		} else {
			this.logger.error(`${error.message}`);
			response.status(500).send({ err: error.message });
		}
	}
}
