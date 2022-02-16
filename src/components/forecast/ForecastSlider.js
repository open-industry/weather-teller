/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useLayoutEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import ForecastCard from './ForecastCard';
import helperModule from '../../scripts/engine';
import forecastIcon from '../../scripts/forecastIcon';
import useWindowSize from './useWindowSize';
import './ForecastSlider.css';

function ForecastSlider({ forecastArray, position, positionModule, isMetric, toggleMetricClick, toggleMetricEnter }) {
  const [cardWidth, setCardWidth] = useState(() => 0);
  const [offset, setOffset] = useState(() => 0);

  // define handlers for useSwipeable hook imported from react-swipeable library
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => positionModule.next(),
    onSwipedRight: () => positionModule.prev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // custom hook used for listening for window resize [width, height]
  const size = useWindowSize();

  // define ref to carousel container for useLayoutEffect hook for calculating card width and offset
  const carouselRef = useRef();

  useLayoutEffect(() => {
    const firstCard = carouselRef.current.children[0];
    // set offset to align active card to center of container
    setOffset(() => (carouselRef.current.offsetWidth / 2) - (firstCard.offsetWidth / 2));
    // set cardWidth to calculate card positions in carousel
    setCardWidth(() => firstCard.offsetWidth);
  }, [size]);

  const { toTitleCase, kelvinToCelsius, kelvinToFarhenheit } = helperModule;

  // onClick handlers for desktop navigation of carousel
  const onLeft = () => {
    positionModule.prev();
  };

  const onRight = () => {
    positionModule.next();
  };

  return (
    <>
      <button className="carousel-nav is-clickable" type="button" onClick={onLeft}>{forecastIcon('left')}</button>
      {/* enable swipe events for carousel */}
      <div {...swipeHandlers} style={{ width: '100%' }}>
        <div ref={carouselRef} className="forecast-carousel">
          {/* map through each forecast in forecastArray and create cards inside carousel */}
          {forecastArray.map((f, i) => (
            // set animation settings of framer-motion library for each card
            <motion.div
              className="forecast-container"
              key={f.dateTime}
              initial={{ scale: 0, rotation: -180 }}
              animate={{
                rotate: 0,
                // positions each card in carousel based on cardWidth and offset
                // each card is progressively further from the left of the carousel container proportionate to its index
                left: `${((i - position) * cardWidth) + offset}px`,
                // scale card size smaller if card is not active
                // scaling down inactive cards creates a sense of depth in the carousel and gaps between cards
                scale: i === position ? 1 : 0.8,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <ForecastCard
                weather={toTitleCase(f.weather)}
                image={f.icon}
                temp={isMetric ? [kelvinToCelsius(f.temp), '|°F'] : [kelvinToFarhenheit(f.temp), '|°C']}
                timestamp={f.dateTime}
                toggleMetricClick={toggleMetricClick}
                toggleMetricEnter={toggleMetricEnter}
                isTabIndexed={i === position ? 0 : -1}
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
