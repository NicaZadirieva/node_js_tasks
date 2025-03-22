import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';

export class ExceptionFilter implements IExceptionFilter{
    constructor(private logger: LoggerService) {}
    catch (error: Error | HTTPError, request: Request, response: Response, next: NextFunction) {
        if (error instanceof HTTPError) {
            this.logger.error(`[${error.context}] ${error.statusCode} : Ошибка ${error.message}`);
            response.status(error.statusCode || 500).send();
        } else {
            this.logger.error(`${error.message}`);
            response.status(500).send({ err: error.message });
        }
    }
}