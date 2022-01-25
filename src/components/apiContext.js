import React, { createContext, useContext, useMemo } from 'react';

const ApiContext = createContext();

export function useApiContext() {
  return useContext(ApiContext);
}

export function ApiProvider({ children }) {
  const API = useMemo(() => ({
    WEATHER: {
      URL: 'https://api.openweathermap.org/data/2.5/weather',
      KEY: '26e9d62c78da14313b785631ae71d7ed',
    },
    FORTUNE: {
      URL: 'https://aztro.sameerkumar.website',
      KEY: '',
    },
  }), []);

  return (
    <ApiContext.Provider value={API}>
      {children}
    </ApiContext.Provider>
  );
}
