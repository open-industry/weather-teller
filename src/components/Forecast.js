import React, { useEffect, useState } from 'react';
import { useApiContext } from './apiContext';
import ForecastCard from './ForecastCard';
import helperModule from '../scripts/engine';
import errorImage from '../img/error.svg';
import loading from '../img/loading_bars.gif';

function Forecast({ location }) {
  const [forecast, setForecast] = useState(() => null);
  const [fetchError, setFetchError] = useState(() => null);
  const [isLoading, setIsLoading] = useState(() => true);
  const { WEATHER } = useApiContext();

  const { toTitleCase, kelvinToCelsius } = helperModule;

  useEffect(() => {
    const getForecast = async () => {
      const urlToFetch = `${WEATHER.URL}?q=${location}&appid=${WEATHER.KEY}`;
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
      <ForecastCard
        image={loading}
        weather="loading..."
        temp="loading..."
      />
    );
  }
  return (
    <div className="box">
      {/* render if error */}
      {fetchError && (
        <ForecastCard
          image={errorImage}
        />
      )}
      {/* render if response ok */}
      {!fetchError && (
        <ForecastCard
          image={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
          weather={toTitleCase(forecast.weather[0].description)}
          temp={kelvinToCelsius(forecast.main.temp)}
        />
      )}
    </div>
  );
}

export default Forecast;
