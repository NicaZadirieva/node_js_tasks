import { IApp } from './app/app.interface';
import RestApp from './app/app.rest';

const app : IApp = new RestApp();
app.run();