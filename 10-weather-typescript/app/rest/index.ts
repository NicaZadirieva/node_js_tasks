import express from "express";
import { restGetForecast } from '../../services/api';
import { saveCity, saveToken } from '../../services/storage';


function main() {
  const app = express();
  const port = 3000;
  app.use(express.json());

  app.post("/save/city", async (req, res) => {
    const cities = req.body.cities;
    await saveCity(cities);
    res.send("City saved successfully");
  });

  app.post("/save/token", async (req, res) => {
    const token = req.body.token;
    await saveToken(token);
    res.send("Token saved successfully");
  });

  app.get("/weather", async (req, res) => {
    const cities = req.query.cities as string[];
    const token = req.query.token as string;
    const lang = req.query.lang as 'ru' | 'eng';
    const weatherInfo = await restGetForecast({
      fromQuery: {
        cities,
        token,
        lang,
      },
    });
    res.send(weatherInfo);
  });

  app.listen(port, () => {
    console.log(`Weather API listening at http://localhost:${port}`);
  });
}

main();
