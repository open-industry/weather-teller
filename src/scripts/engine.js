const helperModule = (() => {
  // helper function to format string to title case
  // expects one argument str as string and returns a string
  const toTitleCase = (str) => (
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    ));

  // helper function converts Kelvin to Celsius
  // expects one argument kelvin as number and returns a string
  const kelvinToCelsius = (kelvin) => `${(Math.round((kelvin - 273.15) * 10) / 10).toFixed(1)} °C`;

  // helper functino converts Kelvin to Fahrenheit
  // expects one argument kelvin as number and returns a string
  const kelvinToFarhenheit = (kelvin) => `${(Math.round(((kelvin - 273.15) * (9 / 5) + 32) * 10) / 10).toFixed(1)} °F`;

  // helper function converts meters per second to km/h
  // expects one argument ms as number and returns a string
  const msToKmh = (ms) => `${(Math.round((ms * 3.6) * 10) / 10).toFixed(1)} km/h`;

  // helper function converts meters per second to mph
  // expects one argument ms as number and returns a string
  const msToMph = (ms) => `${(Math.round((ms * 2.236936) * 10) / 10).toFixed(1)} mph`;

  // helper function to format ip into a unique id string
  // expects one argument ip as string and returns a number
  const ipToId = (ip) => Number(ip.split('.').join(''));

  // generates api url to get coordinates from location provided
  // expects two arguments API object and location string and returns a string
  const coordinatesUrl = (api, location) => `${api.URL}weather?q=${location}&appid=${api.KEY}`;

  // generates api url to get forecast from coordinates provided from first api call
  // expects two arguments API object and coordinates object and returns a string
  const forecastUrl = (api, coords) => (
    `${api.URL}onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly&appid=${api.KEY}`
  );

  // helper function to parse dates from unix timestamp from openweather api response
  // expects one argument propValue as number and returns a string
  const parseTime = (propValue) => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (propValue === -1) return 'awaiting response...';
    const date = new Date(propValue * 1000);
    const currentDay = weekDays[date.getDay()];
    const currentMonth = months[date.getMonth()];
    return `${currentDay}, ${currentMonth} ${date.getDate()} '${date.getFullYear().toString().slice(2)}`;
  };

  // helper function for normalizing weather data from api call
  // expects 9 arguments weather, icon as string
  // and temp, dateTime, feelsLIke, windSpeed, humidity, dewPoint, pop as number and returns an object
  const forecastFactory = (weather, icon, temp, dateTime, feelsLike, windSpeed, humidity, dewPoint, pop) => (
    {
      weather,
      icon,
      temp,
      dateTime,
      feelsLike,
      windSpeed,
      humidity,
      dewPoint,
      pop,
    }
  );

  // helper function to normalize weather data from api call
  // expects one argument weather as object and returns an array of objects
  const parseForecast = (forecastData) => {
    // create condition to prevent current and daily [0] from overlapping
    const { current, daily } = forecastData;

    // removes duplicate forcast from "daily" if "current" forecast is same date (when viewing forecast late at night)
    const filteredDaily = daily.filter(
      (d, i) => parseTime(d.dt + forecastData.timezone_offset) !== parseTime(current.dt + forecastData.timezone_offset)
        || i === 0,
    );

    const parsedData = filteredDaily.map((f, i) => {
      if (i === 0) {
        return forecastFactory(
          current.weather[0].description,
          current.weather[0].icon,
          current.temp,
          current.dt + forecastData.timezone_offset,
          current.feels_like,
          current.wind_speed,
          current.humidity,
          current.dew_point,
          f.pop,
        );
      }
      return forecastFactory(
        f.weather[0].description,
        f.weather[0].icon,
        f.temp.day,
        f.dt + forecastData.timezone_offset,
        f.feels_like.day,
        f.wind_speed,
        f.humidity,
        f.dew_point,
        f.pop,
      );
    });

    return parsedData;
  };

  // // generates api url to get gelocation data from ip provided
  // // expects two arguments API object and ip string and returns a string
  // const geolocationUrl = (api, ip) => `${api.URL}${ip}?access_key=${api.KEY}`;

  return {
    toTitleCase,
    kelvinToCelsius,
    kelvinToFarhenheit,
    msToKmh,
    msToMph,
    ipToId,
    coordinatesUrl,
    forecastUrl,
    parseTime,
    parseForecast,
    // geolocationUrl,
  };
})();

export default helperModule;
