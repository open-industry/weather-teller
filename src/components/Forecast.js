import React, { useEffect, useState } from 'react';
import countries from 'i18n-iso-countries';
import { useApiContext } from './apiContext';
import ForecastCard from './ForecastCard';
import ForecastDetail from './ForecastDetail';
import helperModule from '../scripts/engine';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function Forecast({ location, updateHeroHead }) {
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
        if (!response.ok) {
          updateHeroHead.fail();
          throw Error('failed to fetch coordinates');
        }
        const tempCoord = await response.json();
        const { coord } = tempCoord;
        const response2 = await fetch(forecastUrl(WEATHER, coord), { method: 'GET' });
        if (!response2.ok) throw Error('failed to fetch forecast');
        const weatherData = await response2.json();
        weatherData.country = countries.getName(tempCoord.sys.country, 'en', { select: 'official' });
        weatherData.city = tempCoord.name;
        updateHeroHead.success(weatherData);
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
        // image="13d"
        timestamp={!fetchError ? forecast.current.dt + forecast.timezone_offset : ''}
        weather={!fetchError ? toTitleCase(forecast.current.weather[0].description) : fetchError}
        temp={!fetchError ? kelvinToCelsius(forecast.current.temp) : ''}
      />
      <div className="is-flex is-justify-content-space-between is-flex-wrap-wrap is-grid-mobile has-gap">
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
          label="PoP"
          // data={`${forecast.daily[0].pop * 100} %`}
          data={`${forecast.daily[0].pop} mm`}
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
