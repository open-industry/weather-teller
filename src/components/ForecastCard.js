import React from 'react';
import forecastIcon from '../scripts/forecastIcon';

const currentDay = new Date().getDay();
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function ForecastCard({ image, weather = '', temp = '' }) {
  return (
    <div className="card has-background-info">
      <div className="card-image py-3">
        <figure className="image is-96x96 is-flex is-align-items-center mx-auto">
          <img src={image} alt={!weather ? 'error' : weather} />
        </figure>
      </div>
      <div className="card-content">
        <p className="is-size-4 has-text-white-ter">{weekDays[currentDay]}</p>
        <p className={`is-size-4 ${!weather ? 'has-text-danger-dark' : 'has-text-white-ter'}`}>
          {`Weather: ${!weather ? 'n/a' : weather}`}
        </p>
        <p className={`is-size-4 ${!temp ? 'has-text-danger-dark' : 'has-text-white-ter'}`}>
          {`Temp: ${!temp ? 'n/a' : temp}`}
        </p>
      </div>
    </div>
  );
}

export default ForecastCard;
