import React from 'react';
import { WiThermometer } from 'react-icons/wi';
import forecastIcon from '../scripts/forecastIcon';

function ForecastDetail({ icon, label, data }) {
  return (
    <div className="level mb-4">
      <div className="level-item">
        {forecastIcon(icon)}
      </div>
      <div className="level-item is-flex is-flex-direction-column is-align-items-flex-start">
        <h3 className="title is-6 is-pink has-text-weight-normal">{label}</h3>
        <h2 className="subtitle is-4 mt-0 has-text-white-ter">{data}</h2>
      </div>
    </div>
  );
}

export default ForecastDetail;
