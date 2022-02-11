import React, { useEffect, useState } from 'react';
import countries from 'i18n-iso-countries';
import { useApiContext } from './apiContext';
import ForecastSlider from './forecast/ForecastSlider';
import ForecastCard from './forecast/ForecastCard';
import ForecastDetail from './ForecastDetail';
import helperModule from '../scripts/engine';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function Forecast({ location, updateHeroHead }) {
  const [forecastArray, setForecastArray] = useState(() => []);
  const [position, setPosition] = useState(() => 0);
  const [fetchError, setFetchError] = useState(() => null);
  const [isLoading, setIsLoading] = useState(() => true);
  const [isMetric, setIsMetric] = useState(() => true);
  const { WEATHER } = useApiContext();

  const {
    kelvinToCelsius,
    kelvinToFarhenheit,
    coordinatesUrl,
    forecastUrl,
    msToKmh,
    msToMph,
    parseForecast,
  } = helperModule;

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
        setForecastArray(() => parseForecast(weatherData));
        setPosition(() => 0);
        setFetchError(() => null);
      } catch (err) {
        setFetchError(() => err.message);
      } finally {
        setIsLoading(() => false);
      }
    };

    getForecast();
  }, [location]);

  const toggleMetricClick = () => {
    setIsMetric((prevState) => !prevState);
  };

  const toggleMetricEnter = (e) => {
    if (e.key === 'Enter') {
      setIsMetric((prevState) => !prevState);
    }
  };

  const poistionModule = (() => {
    const next = () => {
      if (position < forecastArray.length - 1) {
        setPosition((prevPosition) => prevPosition + 1);
      }
    };

    const prev = () => {
      if (position > 0) {
        setPosition((prevPosition) => prevPosition - 1);
      }
    };

    return { next, prev };
  })();

  if (isLoading) {
    return (
      <ForecastCard
        image="loading"
        timestamp={-1}
        weather="loading..."
        temp="loading..."
        toggleMetricClick={toggleMetricClick}
        toggleMetricEnter={toggleMetricEnter}
      />
    );
  }
  return (
    <>
      {!fetchError
        ? (
          <div className="is-flex is-flex-direction-row">
            <ForecastSlider
              forecastArray={forecastArray}
              position={position}
              positionModule={poistionModule}
              isMetric={isMetric}
              toggleMetricClick={toggleMetricClick}
              toggleMetricEnter={toggleMetricEnter}
            />
          </div>
        ) : <ForecastCard />}
      {!fetchError
      && (
        <div className="is-flex-tablet is-grid-mobile mt-3">
          <ForecastDetail
            icon="feels_like"
            label="Feels Like"
            data={
              isMetric
                ? kelvinToCelsius(forecastArray[position].feelsLike)
                : kelvinToFarhenheit(forecastArray[position].feelsLike)
            }
          />
          <ForecastDetail
            icon="wind_speed"
            label="Wind Speed"
            data={isMetric ? msToKmh(forecastArray[position].windSpeed) : msToMph(forecastArray[position].windSpeed)}
          />
          <ForecastDetail
            icon="humidity"
            label="Humidity"
            data={`${forecastArray[position].humidity} %`}
          />
          <ForecastDetail
            icon="dew_point"
            label="Dew Point"
            data={
              isMetric
                ? kelvinToCelsius(forecastArray[position].dewPoint)
                : kelvinToFarhenheit(forecastArray[position].dewPoint)
            }
          />
          <ForecastDetail
            icon="pop"
            label="PoP"
            // forecast.daily[0].rain (precipitation volume in mm)
            data={`${Math.round(forecastArray[position].pop * 100)}%`}
          />
        </div>
      )}
    </>
  );
}

export default Forecast;
