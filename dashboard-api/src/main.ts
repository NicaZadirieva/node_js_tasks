import { Container, ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { App } from "./app";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { ExceptionFilter } from "./errors/exeption.filter";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UserController } from "./users/users.controller";

//async function bootstrap() {
// const logger: ILogger = new LoggerService();
// const app = new App(
//     logger,
//     new UserController(logger),
//     new ExceptionFilter(logger)
// );

const appModule: ContainerModule = new ContainerModule(
  (appContainer: ContainerModuleLoadOptions) => {
    appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
    appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    appContainer.bind<UserController>(TYPES.UserController).to(UserController);
    appContainer.bind<App>(TYPES.Application).to(App);
  },
);

function bootstrap() {
    const container = new Container();
    container.load(appModule);
    const app = container.get<App>(TYPES.Application);
    app.init();
    return { container, app };
}

export const { container, app } = bootstrap();