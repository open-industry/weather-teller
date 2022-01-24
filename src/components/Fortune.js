import React, { useState, useEffect } from 'react';
import { useApiContext } from './apiContext';
import helperModule from '../scripts/engine';

const zodiacSigns = ['capricorn', 'aquarius', 'pisces', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius'];

function Fortune() {
  const [horroscope, setHorroscope] = useState(() => null);
  const [fetchError, setFetchError] = useState(() => null);
  const [isLoading, setIsLoading] = useState(() => true);
  // const [ipFetchError, setIpFetchError] = useState(() => null);

  const { FORTUNE, IPIFY } = useApiContext();

  const { ipToId } = helperModule;

  useEffect(() => {
    const getFortune = async () => {
      try {
        const response = await fetch(IPIFY.URL, { method: 'GET' });
        if (!response.status) throw Error('failed to fetch ip, try disabling adblock as it is known to block psychic powers');
        const ipData = await response.json();
        const urlToFetch = `${FORTUNE.URL}?sign=${zodiacSigns[ipToId(ipData.ip) % 12]}&day=today`;
        const response2 = await fetch(urlToFetch, { method: 'POST' });
        if (!response2.ok) throw Error('failed to fetch fortune');
        const horroscopeData = await response2.json();
        setHorroscope(() => horroscopeData);
        setFetchError(() => null);
      } catch (err) {
        // console.log(err);
        setFetchError(() => err.message);
      } finally {
        setIsLoading(() => false);
      }
    };

    getFortune();
  }, []);

  if (isLoading) {
    return (
      <div className="box">
        <p className="is-size-4">Loading...</p>
      </div>
    );
  }
  return (
    <div className="box">
      <p className="is-size-4">
        {fetchError && `Error: ${fetchError}`}
        {!fetchError && `Fortune: ${horroscope.description}`}
      </p>
    </div>
  );
}

export default Fortune;
