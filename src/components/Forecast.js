import React, { useEffect, useState } from 'react';
import { WiThermometer } from 'react-icons/wi';
import { useApiContext } from './apiContext';
import ForecastCard from './ForecastCard';
import ForecastDetail from './ForecastDetail';
import helperModule from '../scripts/engine';

function Forecast({ location }) {
  const [forecast, setForecast] = useState(() => null);
  const [fetchError, setFetchError] = useState(() => null);
  const [isLoading, setIsLoading] = useState(() => true);
  const { WEATHER } = useApiContext();

  const { toTitleCase, kelvinToCelsius, coordinatesUrl, forecastUrl, msToKmh } = helperModule;

  useEffect(() => {
    const getForecast = async () => {
      const coordsUrl = coordinatesUrl(WEATHER, location);
      try {
        const response = await fetch(coordsUrl, { method: 'GET' });
        if (!response.ok) throw Error('failed to fetch coordinates');
        const { coord } = await response.json();
        const response2 = await fetch(forecastUrl(WEATHER, coord), { method: 'GET' });
        if (!response2.ok) throw Error('failed to fetch forecast');
        const weatherData = await response2.json();
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
        image={!fetchError ? forecast.current.weather[0].icon : ''}
        weather={!fetchError ? toTitleCase(forecast.current.weather[0].description) : fetchError}
        temp={!fetchError ? kelvinToCelsius(forecast.current.temp) : ''}
      />
      <div className="is-flex is-flex-direction-column">
        <ForecastDetail
          icon="feels_like"
          label="Feels Like"
          data={kelvinToCelsius(forecast.current.feels_like)}
        />
        <ForecastDetail
          icon="humidity"
          label="Humidity"
          data={`${forecast.current.humidity} %`}
        />
        <ForecastDetail
          icon="pop"
          label="Chance of Rain"
          data={`${forecast.daily[0].pop * 100} %`}
        />
        <ForecastDetail
          icon="dew_point"
          label="Dew Point"
          data={kelvinToCelsius(forecast.current.dew_point)}
        />
        <ForecastDetail
          icon="wind_speed"
          label="Wind Speed"
          data={msToKmh(forecast.current.wind_speed)}
        />
      </div>
    </>
  );
}

export default Forecast;
