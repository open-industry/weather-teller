import React, { useEffect, useState } from 'react';
import { WiThermometer } from 'react-icons/wi';
import { useApiContext } from './apiContext';
import ForecastCard from './ForecastCard';
import helperModule from '../scripts/engine';

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
        image="loading"
        weather="loading..."
        temp="loading..."
      />
    );
  }
  return (
    <>
      <ForecastCard
        image={!fetchError ? forecast.weather[0].icon : ''}
        weather={!fetchError ? toTitleCase(forecast.weather[0].description) : fetchError}
        temp={!fetchError ? kelvinToCelsius(forecast.main.temp) : ''}
      />
      <div className="is-flex is-flex-direction-column">
        <div className="level">
          <div className="level-item">
            <WiThermometer color="#20AFBB" size="3em" />
          </div>
          <div className="level-item is-flex is-flex-direction-column is-align-items-flex-start">
            <h3 className="title is-6 is-pink has-text-weight-normal">Feels like</h3>
            <h2 className="subtitle is-4 mt-0 has-text-white-ter">69 degrees</h2>
          </div>
        </div>
        <p>humidity</p>
        <p>chance of rain</p>
        <p>wind speed</p>
      </div>
    </>
  );
}

export default Forecast;
