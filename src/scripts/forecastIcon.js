import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import {
  // WiDaySunny,
  // WiNightClear,
  // WiDayCloudy,
  // WiNightCloudy,
  // WiCloud,
  // WiCloudy,
  // WiShowers,
  // WiDayRain,
  // WiNightRain,
  // WiThunderstorm,
  // WiSnowflakeCold,
  // WiDust,
  WiNa,
  WiThermometer,
  WiHumidity,
  WiRaindrops,
  WiSprinkle,
  WiStrongWind,
} from 'react-icons/wi';
import icon01d from '../icons/01d.svg';
import icon01n from '../icons/01n.svg';
import icon02d from '../icons/02d.svg';
import icon02n from '../icons/02n.svg';
import icon03d from '../icons/03d.svg';
import icon03n from '../icons/03n.svg';
import icon04d from '../icons/04d.svg';
import icon04n from '../icons/04n.svg';
import icon09d from '../icons/09d.svg';
import icon09n from '../icons/09n.svg';
import icon10d from '../icons/10d.svg';
import icon10n from '../icons/10n.svg';
import icon11d from '../icons/11d.svg';
import icon11n from '../icons/11n.svg';
import icon13dn from '../icons/13d_n.svg';
import icon50dn from '../icons/50d_n.svg';

const forecastIcon = (code) => {
  switch (code) {
    case '01d':
      // return <WiDaySunny color="#20AFBB" size="10em" />;
      return <img src={icon01d} alt="clear day" />;
    case '01n':
      // return <WiNightClear color="#20AFBB" size="10em" />;
      return <img src={icon01n} alt="clear night" />;
    case '02d':
      // return <WiDayCloudy color="#20AFBB" size="10em" />;
      return <img src={icon02d} alt="few clouds day" />;
    case '02n':
      // return <WiNightCloudy color="#20AFBB" size="10em" />;
      return <img src={icon02n} alt="few clouds night" />;
    case '03d':
      return <img src={icon03d} alt="scattered clouds" />;
    case '03n':
      // return <WiCloud color="#20AFBB" size="10em" />;
      return <img src={icon03n} alt="scattered clouds" />;
    case '04d':
      return <img src={icon04d} alt="broken clouds day" />;
    case '04n':
      // return <WiCloudy color="#20AFBB" size="10em" />;
      return <img src={icon04n} alt="broken clouds night" />;
    case '09d':
      return <img src={icon09d} alt="shower rain day" />;
    case '09n':
      // return <WiShowers color="#20AFBB" size="10em" />;
      return <img src={icon09n} alt="shower rain night" />;
    case '10d':
      // return <WiDayRain color="#20AFBB" size="10em" />;
      return <img src={icon10d} alt="rain day" />;
    case '10n':
      // return <WiNightRain color="#20AFBB" size="10em" />;
      return <img src={icon10n} alt="rain night" />;
    case '11d':
      return <img src={icon11d} alt="thunderstorm day" />;
    case '11n':
      // return <WiThunderstorm color="#20AFBB" size="10em" />;
      return <img src={icon11n} alt="thunderstorm night" />;
    case '13d':
    case '13n':
      // return <WiSnowflakeCold color="#20AFBB" size="10em" />;
      return <img src={icon13dn} alt="snow" />;
    case '50d':
    case '50n':
      // return <WiDust color="#20AFBB" size="10em" />;
      return <img src={icon50dn} alt="mist" />;
    case 'loading':
      return <FaSpinner className="spinner m-6" color="#20AFBB" size="4em" />;
    case 'feels_like':
      return <WiThermometer color="#20AFBB" size="2.5em" />;
    case 'humidity':
      return <WiHumidity color="#20AFBB" size="2.5em" />;
    case 'pop':
      return <WiRaindrops color="#20AFBB" size="2.5em" />;
    case 'dew_point':
      return <WiSprinkle color="#20AFBB" size="2.5em" />;
    case 'wind_speed':
      return <WiStrongWind color="#20AFBB" size="2.5em" />;
    default:
      return <WiNa color="#20AFBB" size="10em" />;
  }
};

export default forecastIcon;
