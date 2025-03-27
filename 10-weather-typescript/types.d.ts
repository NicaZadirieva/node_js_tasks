type WeatherDescription = {
  description: string;
  icon: string;
};

type Weather = {
  name: string;
  main: { temp: string };
  weather: WeatherDescription[];
};

type Forecast = string;

type Lang = 'ru' | 'eng';