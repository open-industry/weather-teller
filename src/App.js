import React, { useState, useEffect } from 'react';
import Forecast from './components/Forecast';
import './App.css';
import 'bulma/css/bulma.min.css';

const kelvinToCelsius = (kelvin) => `${(Math.round((kelvin - 273.15) * 10) / 10).toFixed(1)}°C`;

function App() {
  const [forecast, setForecast] = useState(() => null);
  const [location, setLocation] = useState(() => 'London');
  const [fetchError, setFetchError] = useState(() => null);

  useEffect(() => {
    const API = {
      WEATHER: {
        URL: 'https://api.openweathermap.org/data/2.5/weather',
        KEY: '26e9d62c78da14313b785631ae71d7ed',
      },
    };

    const getWeather = async () => {
      const urlToFetch = `${API.WEATHER.URL}?q=${location}&appid=${API.WEATHER.KEY}`;
      try {
        const response = await fetch(urlToFetch, { method: 'GET' });
        if (!response.ok) throw Error(response.statusText);
        const weatherData = await response.json();
        setForecast(() => weatherData);
        setFetchError(() => null);
        console.log(weatherData);
      } catch (err) {
        setFetchError(() => err);
      }
    };

    getWeather();
  }, []);

  return (
    <main className="hero is-fullheight has-background-black-bis">
      <div className="hero-head">
        <h1 className="title has-text-white-ter has-text-centered">{location}</h1>
      </div>
      <div className="hero-body">
        <div className="container">
          { forecast ? (
            <Forecast
              icon={forecast.weather[0].icon}
              weather={forecast.weather[0].description}
              temp={forecast.main.temp}
            />
          ) : <p className="is-size-4 has-text-white-ter">'Loading...'</p> }
        </div>
      </div>
    </main>
  );
}

export default App;
