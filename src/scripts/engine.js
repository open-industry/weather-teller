const helperModule = (() => {
  // helper function to format string to title case
  const toTitleCase = (str) => (
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    ));

  // helper function converts Kelvin to Celsius
  // takes in a number returns a string
  const kelvinToCelsius = (kelvin) => `${(Math.round((kelvin - 273.15) * 10) / 10).toFixed(1)}°C`;

  // helper function to format ip into a unique id string
  // takes in a string returns returns a number
  const ipToId = (ip) => Number(ip.split('.').join(''));

  return {
    toTitleCase,
    kelvinToCelsius,
    ipToId,
  };
})();

export default helperModule;
