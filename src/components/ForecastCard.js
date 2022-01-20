import React from 'react';

const currentDay = new Date().getDay();
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function ForecastCard({ image, weather = '', temp = '' }) {
  return (
    <div className="card has-background-info">
      <div className="card-image has-text-centered">
        <img src={image} alt={!weather ? 'error' : weather} />
      </div>
      <div className="card-content">
        <p className="is-size-4 has-text-white-ter">{weekDays[currentDay]}</p>
        <p className={`is-size-4 ${!weather ? 'has-text-danger' : 'has-text-white-ter'}`}>
          {`Weather: ${!weather ? 'n/a' : weather}`}
        </p>
        <p className={`is-size-4 ${!temp ? 'has-text-danger' : 'has-text-white-ter'}`}>
          {`Temp: ${!temp ? 'n/a' : temp}`}
        </p>
      </div>
    </div>
  );
}

export default ForecastCard;
