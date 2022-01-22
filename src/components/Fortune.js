import React, { useState, useEffect } from 'react';
import { useApiContext } from './apiContext';
import helperModule from '../scripts/engine';

const zodiacSigns = ['capricorn', 'aquarius', 'pisces', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius'];

function Fortune() {
  const [horroscope, setHorroscope] = useState(() => null);
  const [fetchError, setFetchError] = useState(() => null);
  const [isLoading, setIsLoading] = useState(() => true);
  const [zodiac, setZodiac] = useState(() => 'libra');
  const [ipFetchError, setIpFetchError] = useState(() => null);

  const { FORTUNE, IPIFY } = useApiContext();

  const { ipToId } = helperModule;

  // useEffect(() => {
  //   const getFortune = async () => {
  //     const urlToFetch = `${FORTUNE.URL}?sign=${zodiac}&day=today`;
  //     try {
  //       let response = await fetch(IPIFY.URL, { method: 'GET' });
  //       if (!response.ok) throw Error('failed to fetch ip');
  //       const ipData = await response.json();
  //       setZodiac(() => zodiacSigns[ipToId(ipData.ip) % 12]);
  //       response = await fetch(urlToFetch, { method: 'GET' });
  //       if (!response.ok) throw Error('failed to fetch fortune');
  //       const horroscopeData = await response.json();
  //       setHorroscope(() => horroscopeData);
  //       setFetchError(() => null);
  //     } catch (err) {
  //       setFetchError(() => err.message);
  //     } finally {
  //       setIsLoading(() => false);
  //     }
  //   };

  //   getFortune();
  // }, []);

  useEffect(() => {
    const getFortune = async () => {
      const urlToFetch = `${FORTUNE.URL}?sign=${zodiac}&day=today`;
      try {
        const response = await fetch(urlToFetch, { method: 'POST' });
        if (!response.ok) throw Error('failed to fetch fortune');
        const horroscopeData = await response.json();
        setHorroscope(() => horroscopeData);
        setFetchError(() => null);
      } catch (err) {
        setFetchError(() => err.message);
      } finally {
        setIsLoading(() => false);
      }
    };

    getFortune();
  }, []);

  useEffect(() => {
    const getIP = async () => {
      try {
        const response = await fetch(IPIFY.URL, { method: 'GET' });
        if (!response.ok) throw Error('failed to fetch data');
        const ipData = await response.json();
        console.log(zodiacSigns[ipToId(ipData.ip) % 12]);
        setIpFetchError(() => null);
      } catch (err) {
        setIpFetchError(() => err.message);
      }
    };

    getIP();
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
        {`Fortune: ${horroscope.description}`}
      </p>
    </div>
  );
}

export default Fortune;
