import React from 'react';
import forecastIcon from '../scripts/forecastIcon';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ForecastCard({ image, timestamp, weather, temp, toggleMetricClick, toggleMetricEnter }) {
  const date = new Date(timestamp * 1000);
  const currentDay = weekDays[date.getDay()];
  const currentMonth = months[date.getMonth()];

  return (
    <div className="is-flex is-flex-direction-column is-align-items-center">
      <p className={`is-size-3 has-text-weight-semibold has-text-centered ${!weather ? 'has-text-danger-dark' : 'has-text-white-ter'}`}>
        {!weather ? 'n/a' : weather}
      </p>
      <figure className="image is-flex is-justify-content-center is-align-items-center is-smaller-mobile">
        {forecastIcon(image)}
      </figure>
      {/* uses timstamp prop to determine if fetch error */}
      <p className={`is-size-1 has-text-weight-semibold ${!timestamp ? 'has-text-danger-dark' : 'has-text-white-ter'}`}>
        <span className="is-clickable" onClick={toggleMetricClick} onKeyPress={toggleMetricEnter} role="button" tabIndex={0}>{!timestamp ? 'N/A' : temp}</span>
      </p>
      <p className={`is-size-5 has-text-weight-light ${!timestamp ? 'has-text-danger-dark' : 'has-text-white-ter'}`}>{timestamp ? `${currentDay}, ${currentMonth} ${date.getDate()} '${date.getFullYear().toString().slice(2)}` : 'error'}</p>
    </div>
  );
}

export default ForecastCard;
