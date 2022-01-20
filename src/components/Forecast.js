import React, { useEffect, useState } from 'react';
import { useApiContext } from './apiContext';
import ForecastCard from './ForecastCard';

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

function Forecast({ location }) {
  const [forecast, setForecast] = useState(() => null);
  const [fetchError, setFetchError] = useState(() => null);
  const [isLoading, setIsLoading] = useState(() => true);
  const API = useApiContext();

  useEffect(() => {
    const getForecast = async () => {
      const urlToFetch = `${API.WEATHER.URL}?q=${location}&appid=${API.WEATHER.KEY}`;
      try {
        const response = await fetch(urlToFetch, { method: 'GET' });
        if (!response.ok) throw Error('failed to fetch data');
        const weatherData = await response.json();
        setForecast(() => weatherData);
        setFetchError(() => null);
      } catch (err) {
        setFetchError(() => err.message);
      } finally {
        setIsLoading(() => false);
      }
    };

    getForecast();
  }, [location]);

  if (isLoading) {
    return (
      <div className="card has-background-info">
        <div className="card-content">
          <p className="is-size-4 has-text-white-ter">
            Weather: Loading...
          </p>
          <p className="is-size-4 has-text-white-ter">
            Temp: Loading...
          </p>
        </div>
      </div>
    );
  }
  return (
    <ForecastCard
      image={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
      weather={toTitleCase(forecast.weather[0].description)}
      temp={kelvinToCelsius(forecast.main.temp)}
    />
  );
}

export default Forecast;
