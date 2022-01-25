import React from 'react';
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
} from 'react-icons/wi';

const forecastIcon = (code) => {
  switch (code) {
    case '01d':
      return <WiDaySunny />;
    case '01n':
      return <WiNightClear />;
    case '02d':
      return <WiDayCloudy />;
    case '02n':
      return <WiNightCloudy />;
    case '03d' || '03n':
      return <WiCloud />;
    case '04d' || '04n':
      return <WiCloudy />;
    case '09d' || '09n':
      return <WiShowers />;
    case '10d':
      return <WiDayRain />;
    case '10n':
      return <WiNightRain />;
    case '11d' || '11n':
      return <WiThunderstorm />;
    case '13d' || '13n':
      return <WiSnowflakeCold />;
    case '50d' || '50n':
      return <WiDust />;
    default:
      return <WiNa />;
  }
};

export default forecastIcon;
