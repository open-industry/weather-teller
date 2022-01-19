import React from 'react';

// helper function converts Kelvin to Celsius
// takes in a number returns a string
const kelvinToCelsius = (kelvin) => `${(Math.round((kelvin - 273.15) * 10) / 10).toFixed(1)}°C`;

// helper function to format string to title case
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

function Forecast({ icon, weather, temp }) {
  return (
    <div className="card has-background-info">
      <div className="card-image has-text-centered">
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      </div>
      <div className="card-content">
        <p className="is-size-4 has-text-white-ter">
          {`Weather: ${toTitleCase(weather)}`}
        </p>
        <p className="is-size-4 has-text-white-ter">
          {`Temp: ${kelvinToCelsius(temp)}`}
        </p>
      </div>
    </div>
  );
}

export default Forecast;
