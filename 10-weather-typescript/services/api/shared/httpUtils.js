class HttpUtils {
  // Формируем строку `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`;
  static formHttpParams({ city, token, lang }) {
    const params = {
      q: city,
      appid: token,
      lang: lang,
      units: "metric",
    };

    return { params };
  }
}

export { HttpUtils };
