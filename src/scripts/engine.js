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

  // helper function converts meters per second to km/h
  // expects one argument ms as number and returns a string
  const msToKmh = (ms) => `${(Math.round((ms * 3.6) * 10) / 10).toFixed(1)} km/h`;

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

  // // generates api url to get gelocation data from ip provided
  // // expects two arguments API object and ip string and returns a string
  // const geolocationUrl = (api, ip) => `${api.URL}${ip}?access_key=${api.KEY}`;

  return {
    toTitleCase,
    kelvinToCelsius,
    msToKmh,
    ipToId,
    coordinatesUrl,
    forecastUrl,
    // geolocationUrl,
  };
})();

export default helperModule;
