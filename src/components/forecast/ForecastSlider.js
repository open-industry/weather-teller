import React from 'react';
import helperModule from '../../scripts/engine';

function ForecastSlider({ forecastObj }) {
  const { forecastFactory } = helperModule;

  const forecastArray = forecastObj.daily.map((forecast, i) => {
    if (i === 0) {
      return forecastFactory(
        forecastObj.current.weather[0].description,
        forecastObj.current.weather[0].icon,
        forecastObj.current.temp,
        forecastObj.current.dt + forecastObj.timezone_offset,
        forecastObj.current.feels_like,
        forecastObj.current.wind_speed,
        forecastObj.current.humidity,
        forecastObj.current.dew_point,
        forecastObj.daily[0].pop,
      );
    }
    return forecastFactory(
      forecast.weather[0].description,
      forecast.weather[0].icon,
      forecast.temp.day,
      forecast.dt + forecastObj.timezone_offset,
      forecast.feels_like.day,
      forecast.wind_speed,
      forecast.humidity,
      forecast.dew_point,
      forecast.pop,
    );
  });

  return (
    <div className="row">
      <div className="container" />
    </div>
  );
}

export default ForecastSlider;
