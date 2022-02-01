import React from 'react';
import forecastIcon from '../scripts/forecastIcon';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ForecastCard({ image, timestamp, weather = '', temp = '' }) {
  const date = new Date(timestamp * 1000);
  const currentDay = weekDays[date.getDay()];
  const currentMonth = months[date.getMonth()];

  return (
    <div className="is-flex is-flex-direction-column is-align-items-center">
      <p className={`is-size-3 has-text-weight-semibold ${!weather ? 'has-text-danger-dark' : 'has-text-white-ter'}`}>
        {!weather ? 'n/a' : weather}
      </p>
      <figure className="image is-smaller-mobile">
        {forecastIcon(image)}
      </figure>
      <p className={`is-size-1 has-text-weight-semibold ${!temp ? 'has-text-danger-dark' : 'has-text-white-ter'}`}>
        {!temp ? 'N/A' : temp}
      </p>
      <p className="is-size-5 has-text-weight-light has-text-white-ter">{`${currentDay}, ${currentMonth} ${date.getDate()} '${date.getFullYear().toString().slice(2)}`}</p>
    </div>
  );
}

export default ForecastCard;
