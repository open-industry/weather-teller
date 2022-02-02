import React, { useState, useEffect } from 'react';
import publicIp from 'public-ip';
import { useApiContext } from './apiContext';
import helperModule from '../scripts/engine';

const zodiacSigns = ['capricorn', 'aquarius', 'pisces', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius'];

const FETCH_ERROR_MESSAGE = 'failed to fetch fortune';

function Fortune() {
  const [horroscope, setHorroscope] = useState(() => null);
  const [fetchError, setFetchError] = useState(() => null);
  const [isLoading, setIsLoading] = useState(() => true);

  const { FORTUNE } = useApiContext();

  const { ipToId } = helperModule;

  useEffect(() => {
    const getFortune = async () => {
      try {
        const ipData = await publicIp.v4();
        const urlToFetch = `${FORTUNE.URL}?sign=${zodiacSigns[ipToId(ipData) % 12]}&day=today`;
        const response = await fetch(urlToFetch, { method: 'POST' });
        if (!response.ok) throw Error(FETCH_ERROR_MESSAGE);
        const horroscopeData = await response.json();
        setHorroscope(() => horroscopeData);
        setFetchError(() => null);
      } catch (err) {
        if (!err.message === FETCH_ERROR_MESSAGE) setFetchError(() => 'failed to fetch ip, try disabling adblock as it is known to block psychic powers');
        else setFetchError(() => err.message);
      } finally {
        setIsLoading(() => false);
      }
    };

    getFortune();
  }, []);

  if (isLoading) {
    return (
      <div className="box">
        <p className="is-size-5 has-text-white-ter">Loading...</p>
      </div>
    );
  }
  return (
    <div className="box">
      <p className="is-size-5 has-text-white-ter">
        {fetchError && `Error: ${fetchError}`}
        {!fetchError && horroscope.description}
      </p>
    </div>
  );
}

export default Fortune;
