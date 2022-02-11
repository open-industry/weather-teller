import React from 'react';
import helperModule from '../../scripts/engine';
import forecastIcon from '../../scripts/forecastIcon';

function ForecastCard({ weather, image, temp, timestamp, toggleMetricClick, toggleMetricEnter }) {
  const { parseTime } = helperModule;

  return (
    <div className="is-flex is-flex-direction-column is-align-items-center p-2">
      <p className={`is-size-dynamic-4 has-text-weight-semibold has-text-centered ${!weather ? 'has-text-danger-dark' : 'has-text-white-ter'}`}>
        {!weather ? 'n/a' : weather}
      </p>
      <figure className="image is-flex is-justify-content-center is-align-items-center is-smaller-mobile">
        {forecastIcon(image)}
      </figure>
      {/* uses timstamp prop to determine if fetch error */}
      <span className="is-clickable is-flex is-align-items-center" id="temp" onClick={toggleMetricClick} onKeyPress={toggleMetricEnter} role="button" tabIndex={0}>
        <p className={`is-size-dynamic-3 has-text-weight-semibold ${!timestamp ? 'has-text-danger-dark' : 'has-text-white-ter'}`}>
          {!timestamp ? 'N/A' : temp[0]}
        </p>
        {timestamp && <p className="is-size-dynamic-4 has-text-weight-light has-color-inactive">{!timestamp ? null : temp[1]}</p>}
      </span>
      <p className={`is-size-5 has-text-weight-light ${!timestamp ? 'has-text-danger-dark' : 'has-text-white-ter'}`}>
        {timestamp ? parseTime(timestamp) : 'error'}
      </p>
    </div>
  );
}

export default ForecastCard;
