/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useLayoutEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import ForecastCard from './ForecastCard';
import helperModule from '../../scripts/engine';
import forecastIcon from '../../scripts/forecastIcon';
import useWindowSize from './useWindowSize';
import './ForecastSlider.css';

/*
  -fix swipe bug using swiepable component
*/

function ForecastSlider({ forecastArray, position, positionModule, isMetric, toggleMetricClick, toggleMetricEnter }) {
  const [cardWidth, setCardWidth] = useState(() => 0);
  const [offset, setOffset] = useState(() => 0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => positionModule.next(),
    onSwipedRight: () => positionModule.prev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const size = useWindowSize();

  const carouselRef = useRef();

  useLayoutEffect(() => {
    const firstCard = carouselRef.current.children[0];
    setOffset(() => (carouselRef.current.offsetWidth / 2) - (firstCard.offsetWidth / 2));
    setCardWidth(() => firstCard.offsetWidth);
  }, [size]);

  const { toTitleCase, kelvinToCelsius, kelvinToFarhenheit } = helperModule;

  const onLeft = () => {
    positionModule.prev();
  };

  const onRight = () => {
    positionModule.next();
  };

  return (
    <>
      <button className="carousel-nav is-clickable" type="button" onClick={onLeft}>{forecastIcon('left')}</button>
      <div {...swipeHandlers} style={{ width: '100%' }}>
        <div ref={carouselRef} className="forecast-carousel">
          {forecastArray.map((f, i) => (
            <motion.div
              className="forecast-container"
              key={f.dateTime}
              initial={{ scale: 0, rotation: -180 }}
              animate={{
                rotate: 0,
                left: `${((i - position) * cardWidth) + offset}px`,
                scale: i === position ? 1 : 0.8,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <ForecastCard
                weather={toTitleCase(f.weather)}
                image={f.icon}
                temp={isMetric ? kelvinToCelsius(f.temp) : kelvinToFarhenheit(f.temp)}
                timestamp={f.dateTime}
                toggleMetricClick={toggleMetricClick}
                toggleMetricEnter={toggleMetricEnter}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <button className="carousel-nav is-clickable" type="button" onClick={onRight}>{forecastIcon('right')}</button>
    </>
  );
}

export default ForecastSlider;
