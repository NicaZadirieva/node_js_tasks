import { Container, ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { App } from './app';
import { BaseController } from './common/base.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { IUserController } from './users/users.controller.interface';

//async function bootstrap() {
// const logger: ILogger = new LoggerService();
// const app = new App(
//     logger,
//     new UserController(logger),
//     new ExceptionFilter(logger)
// );
export interface IBootstrapReturn {
	container: Container;
	app: App;
}

const appModule: ContainerModule = new ContainerModule(
	(appContainer: ContainerModuleLoadOptions) => {
		appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
		appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
		appContainer.bind<IUserController & BaseController>(TYPES.UserController).to(UserController);
		appContainer.bind<App>(TYPES.Application).to(App);
	},
);

function bootstrap(): IBootstrapReturn {
	const container = new Container();
	container.load(appModule);
	const app = container.get<App>(TYPES.Application);
	app.init();
	return { container, app };
}

export const { container, app } = bootstrap();
