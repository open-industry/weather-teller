import { useLayoutEffect, useState } from 'react';

// custom hook listens for window resize [width, height] used by ForecastSlider.js
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize(() => [window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    // clean up event listener on unmount
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

export default useWindowSize;
