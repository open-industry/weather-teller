import React, { useState, useEffect, useRef } from 'react';
import publicIp from 'public-ip';
import { useApiContext } from './apiContext';
import helperModule from '../scripts/engine';

const zodiacSigns = ['capricorn', 'aquarius', 'pisces', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius'];

const FETCH_ERROR_MESSAGE = 'Could not get the public IP address';

function Fortune() {
  const [horroscope, setHorroscope] = useState(() => null);
  const [fetchError, setFetchError] = useState(() => null);
  const [isLoading, setIsLoading] = useState(() => true);

  // refers to collapse element
  const collapseRef = useRef();

  const { FORTUNE } = useApiContext();

  const { ipToId } = helperModule;

  // onClick handler for the collapse button
  // sets max-height to 0 to hide the collapse or equal to the content scroll-height to show it
  const toggleCollapse = () => {
    if (collapseRef.current.style.maxHeight) {
      collapseRef.current.style.maxHeight = null;
    } else {
      collapseRef.current.style.maxHeight = `${collapseRef.current.scrollHeight}px`;
    }
  };

  // fetch fortune on mount
  useEffect(() => {
    const getFortune = async () => {
      try {
        // get client public ip
        const ipData = await publicIp.v4();
        // assign a zodiac-sign based on ip and parse it to fortune api url
        const urlToFetch = `${FORTUNE.URL}?sign=${zodiacSigns[ipToId(ipData) % 12]}&day=today`;
        const response = await fetch(urlToFetch, { method: 'POST' });
        if (!response.ok) throw Error(FETCH_ERROR_MESSAGE);
        const horroscopeData = await response.json();
        setHorroscope(() => horroscopeData);
        setFetchError(() => null);
      } catch (err) {
        // request diable adblock if could not fetch public IP
        if (err.message === FETCH_ERROR_MESSAGE) setFetchError(() => 'failed to fetch ip, try disabling adblock as it is known to block psychic powers');
        else setFetchError(() => err.message);
      } finally {
        // display fetched data
        setIsLoading(() => false);
      }
    };

    getFortune();
  }, []);

  // render while fetching data
  if (isLoading) {
    return (
      <div className="box">
        <p className="is-size-5 has-text-white-ter">Loading...</p>
      </div>
    );
  }
  // render after fetching fortune
  return (
    <div className="box">
      <button className="button collapse" type="button" onClick={toggleCollapse}>Daily Fortune</button>
      <div ref={collapseRef} className="is-flex collapse-content">
        <p className="is-size-5 has-text-white-ter">
          {fetchError && `Error: ${fetchError}`}
          {!fetchError && horroscope.description}
        </p>
      </div>
    </div>
  );
}

export default Fortune;
