import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiDayRain,
  WiNightRain,
  WiThunderstorm,
  WiSnowflakeCold,
  WiDust,
  WiNa,
  WiThermometer,
  WiHumidity,
  WiRaindrops,
  WiSprinkle,
  WiStrongWind,
} from 'react-icons/wi';

const forecastIcon = (code) => {
  switch (code) {
    case '01d':
      return <WiDaySunny color="#20AFBB" size="10em" />;
    case '01n':
      return <WiNightClear color="#20AFBB" size="10em" />;
    case '02d':
      return <WiDayCloudy color="#20AFBB" size="10em" />;
    case '02n':
      return <WiNightCloudy color="#20AFBB" size="10em" />;
    case '03d':
    case '03n':
      return <WiCloud color="#20AFBB" size="10em" />;
    case '04d':
    case '04n':
      return <WiCloudy color="#20AFBB" size="10em" />;
    case '09d':
    case '09n':
      return <WiShowers color="#20AFBB" size="10em" />;
    case '10d':
      return <WiDayRain color="#20AFBB" size="10em" />;
    case '10n':
      return <WiNightRain color="#20AFBB" size="10em" />;
    case '11d':
    case '11n':
      return <WiThunderstorm color="#20AFBB" size="10em" />;
    case '13d':
    case '13n':
      return <WiSnowflakeCold color="#20AFBB" size="10em" />;
    case '50d':
    case '50n':
      return <WiDust color="#20AFBB" size="10em" />;
    case 'loading':
      return <FaSpinner className="spinner m-6" color="#20AFBB" size="4em" />;
    case 'feels_like':
      return <WiThermometer color="#20AFBB" size="3em" />;
    case 'humidity':
      return <WiHumidity color="#20AFBB" size="3em" />;
    case 'pop':
      return <WiRaindrops color="#20AFBB" size="3em" />;
    case 'dew_point':
      return <WiSprinkle color="#20AFBB" size="3em" />;
    case 'wind_speed':
      return <WiStrongWind color="#20AFBB" size="3em" />;
    default:
      return <WiNa color="#20AFBB" size="10em" />;
  }
};

export default forecastIcon;
