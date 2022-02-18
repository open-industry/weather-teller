import React, { useEffect, useState } from 'react';
import countries from 'i18n-iso-countries';
import { useApiContext } from '../apiContext';
import ForecastSlider from './ForecastSlider';
import ForecastCard from './ForecastCard';
import ForecastDetail from './ForecastDetail';
import helperModule from '../../scripts/engine';

// initialize countries from i18n-iso-countries library
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function Forecast({ location, updateHeroHead }) {
  const [forecastArray, setForecastArray] = useState(() => []);
  const [position, setPosition] = useState(() => 0);
  const [fetchError, setFetchError] = useState(() => null);
  const [isLoading, setIsLoading] = useState(() => true);
  const [isMetric, setIsMetric] = useState(() => true);
  const [isFirstLoad, setIsFirstLoad] = useState(() => true);
  const { WEATHER, GEOLOCATION } = useApiContext();

  const {
    kelvinToCelsius,
    kelvinToFarhenheit,
    coordinatesUrl,
    forecastUrl,
    reverseGeocodeUrl,
    msToKmh,
    msToMph,
    parseForecast,
  } = helperModule;

  // fetch forecast on mount
  useEffect(() => {
    const getForecast = async () => {
      const coordsUrl = coordinatesUrl(WEATHER, location);
      try {
        // fetch coordinates
        const response = await fetch(coordsUrl, { method: 'GET' });
        if (!response.ok) {
          // if fail display user input as hero head using module provided as props by App.js
          updateHeroHead.fail();
          throw Error('failed to fetch coordinates');
        }
        const tempCoord = await response.json();
        // destructure coordinates from response and parse to forecast url using helper function
        const { coord } = tempCoord;
        const response2 = await fetch(forecastUrl(WEATHER, coord), { method: 'GET' });
        if (!response2.ok) throw Error('failed to fetch forecast');
        const weatherData = await response2.json();
        // assign official name of country to response if it exists
        weatherData.country = countries.getName(tempCoord.sys.country, 'en', { select: 'official' });
        // assign city name to response from first result from coordinates
        weatherData.city = tempCoord.name;
        // update hero head with official city and country name using module provided as props by App.js
        updateHeroHead.success(weatherData);
        // parse forecast data to be used by ForecastCard and ForecastDetail and ForecastSlider
        setForecastArray(() => parseForecast(weatherData));
        // initialize slider position to 0 after each fetch
        setPosition(() => 0);
        setFetchError(() => null);
      } catch (err) {
        setFetchError(() => err.message);
      } finally {
        // disable loading indicator after fetch and display fetched data
        setIsLoading(() => false);
      }
    };

    const getUserPositionForecast = async (coord) => {
      // url of api calls to fetch
      const urlArray = [reverseGeocodeUrl(GEOLOCATION, coord), forecastUrl(WEATHER, coord)];
      try {
        // aggregate results of multiple api calls
        const responses = await Promise.all(urlArray.map((url) => fetch(url, { method: 'GET' }).catch((err) => err)));
        if (responses.some((res) => !res.ok)) throw Error('failed to fetch forecast and reversegeocode from coordinates');
        // destructure results from api calls and parse to json
        const [geoData, weatherData] = await Promise.all(responses.map((res) => res.json()));
        // assign official name of country and city from reverse geocode api call to response of weather api call
        weatherData.country = countries.getName(geoData[0].country, 'en', { select: 'official' });
        weatherData.city = geoData[0].name;
        // update hero head with official city and country name using module provided as props by App.js
        updateHeroHead.success(weatherData);
        // parse forecast data to be used by ForecastCard and ForecastDetail and ForecastSlider
        setForecastArray(() => parseForecast(weatherData));
        // initialize slider position to 0 after each fetch
        setPosition(() => 0);
        setFetchError(() => null);
      } catch (err) {
        setFetchError(() => err.message);
      } finally {
        // disable loading indicator after fetch and display fetched data
        setIsLoading(() => false);
        // prevent function from being called again after first load
        setIsFirstLoad(() => false);
      }
    };

    // requestion permission to access user location
    const geo = navigator.geolocation;
    if (geo && isFirstLoad) {
      // if permission is granted and is first load of component, get user position
      geo.getCurrentPosition((pos) => {
        // assign coordinates to variable
        const { latitude: lat, longitude: lon } = pos.coords;
        // create coordinate object for api call
        const coord = { lat, lon };
        getUserPositionForecast(coord);
      }, (err) => {
        // if permission is denied call standard getForecast function
        if (err.code === err.PERMISSION_DENIED) getForecast();
      });
    } else {
      // call if geolocation service are not availbe or is not first load of component
      getForecast();
    }
  }, [location]);

  // toggle metric and imperial units on click used by ForecastCard
  const toggleMetricClick = () => {
    setIsMetric((prevState) => !prevState);
  };

  // toggle metric and imperial units on enter used by ForfecastCard for screen readers
  const toggleMetricEnter = (e) => {
    if (e.key === 'Enter') {
      setIsMetric((prevState) => !prevState);
    }
  };

  // update slider position for navigation between forecast cards in ForecastSlider
  // prevents position from going out of bounds of forecastArray
  const poistionModule = (() => {
    // move position to next forecast card if current position is less than forecastArray length
    const next = () => {
      if (position < forecastArray.length - 1) {
        setPosition((prevPosition) => prevPosition + 1);
      }
    };

    // move position to previous forecast card if current position is greater than 0
    const prev = () => {
      if (position > 0) {
        setPosition((prevPosition) => prevPosition - 1);
      }
    };

    return { next, prev };
  })();

  // render spinning loading indicator while fetching data
  if (isLoading) {
    return (
      <ForecastCard
        image="loading"
        timestamp={-1}
        weather="loading..."
        temp={['loading', '...']}
        toggleMetricClick={toggleMetricClick}
        toggleMetricEnter={toggleMetricEnter}
        isTabIndexed={-1}
      />
    );
  }
  // render after fetching data
  return (
    <>
      {/* render ForecastSlider if no fetchError otherwise render error ForecastCard */}
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
      {/* do not render if fetchError */}
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
