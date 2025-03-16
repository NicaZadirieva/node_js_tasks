import express from "express";
import { getForecast } from "../cli/services/api.service.js";
import { saveCity, saveToken } from "../cli/services/storage.service.js";
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
  const cities = req.query.cities;
  const token = req.query.token;
  const lang = req.query.lang;
  const weatherInfo = await getForecast({
    citiesFromQuery: cities,
    tokenFromQuery: token,
    langFromQuery: lang,
  });
  res.send(weatherInfo);
});

app.listen(port, () => {
  console.log(`Weather API listening at http://localhost:${port}`);
});
