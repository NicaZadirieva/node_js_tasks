type WeatherDescription = {
  description: string;
};

type Weather = {
  name: string;
  main: { temp: string };
  weather: WeatherDescription[];
};