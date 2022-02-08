import React, { useState, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swipeable } from 'react-swipeable';
import ForecastCard from './ForecastCard';
import helperModule from '../../scripts/engine';
import useWindowSize from './useWindowSize';
import './ForecastSlider.css';

/*
  -fix swipe bug using swiepable component
*/

function ForecastSlider({ forecastObj, toggleMetricClick, toggleMetricEnter }) {
  // move up position to parent component and pass down as prop
  const [position, setPosition] = useState(() => 0);
  const [cardWidth, setCardWidth] = useState(() => 0);
  const [offset, setOffset] = useState(() => 0);

  const size = useWindowSize();

  const carouselRef = useRef();

  useLayoutEffect(() => {
    const firstCard = carouselRef.current.children[0];
    setOffset(() => (carouselRef.current.offsetWidth / 2) - (firstCard.offsetWidth / 2));
    setCardWidth(() => firstCard.offsetWidth);
  }, [size]);

  const { forecastFactory, toTitleCase, kelvinToCelsius } = helperModule;

  const { current, daily } = forecastObj;

  const forecastArray = daily.map((f, i) => {
    if (i === 0) {
      return forecastFactory(
        current.weather[0].description,
        current.weather[0].icon,
        current.temp,
        current.dt + forecastObj.timezone_offset,
        current.feels_like,
        current.wind_speed,
        current.humidity,
        current.dew_point,
        f.pop,
      );
    }
    return forecastFactory(
      f.weather[0].description,
      f.weather[0].icon,
      f.temp.day,
      f.dt + forecastObj.timezone_offset,
      f.feels_like.day,
      f.wind_speed,
      f.humidity,
      f.dew_point,
      f.pop,
    );
  });

  const onLeft = () => {
    if (position < forecastArray.length - 1) {
      setPosition((prevPosition) => prevPosition + 1);
    }
  };

  const onRight = () => {
    if (position > 0) {
      setPosition((prevPosition) => prevPosition - 1);
    }
  };

  return (
    <>
      <button className="carousel-nav" type="button" onClick={onRight}>Left</button>
      <div ref={carouselRef} className="forecast-carousel">
        {forecastArray.map((f, i) => (
          <motion.div
            className="forecast-container"
            key={f.dateTime}
            initial={{ scale: 0, rotation: -180 }}
            animate={{ rotate: 0, left: `${((i - position) * cardWidth) + offset}px`, scale: i === position ? 1 : 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <ForecastCard
              weather={toTitleCase(f.weather)}
              image={f.icon}
              temp={kelvinToCelsius(f.temp)}
              timestamp={f.dateTime}
              toggleMetricClick={toggleMetricClick}
              toggleMetricEnter={toggleMetricEnter}
            />
          </motion.div>
        ))}
      </div>
      <button className="carousel-nav" type="button" onClick={onLeft}>Right</button>
    </>
  );
}

export default ForecastSlider;
