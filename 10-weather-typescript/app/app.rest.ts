import express, { Request, Response } from "express";
import { RestWeatherApiService } from "../services/api/rest.weather.api.service";
import StorageService from "../services/storage/storage.service";
import { IApp } from "./app.interface";

const storageService = new StorageService();
export default class RestApp implements IApp {
  run() {
    const app = express();
    const port = 3000;
    app.use(express.json());

    app.post("/save/city", async (req: Request, res: Response) => {
      const cities = req.body.cities;
      await storageService.saveCity(cities);
      res.send("City saved successfully");
    });

    app.post("/save/token", async (req, res) => {
      const token = req.body.token;
      await storageService.saveToken(token);
      res.send("Token saved successfully");
    });

    app.get("/weather", async (req, res) => {
      const cities = req.query.cities as string[];
      const token = req.query.token as string;
      const lang = req.query.lang as "ru" | "eng";
      const weatherApiService = new RestWeatherApiService(token, lang, cities);
      const weatherInfo = await weatherApiService.getForecast();
      res.send(weatherInfo);
    });

    app.listen(port, () => {
      console.log(`Weather API listening at http://localhost:${port}`);
    });
  }
}
