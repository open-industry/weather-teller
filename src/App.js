import React, { useState, useEffect } from 'react';
import { ApiProvider } from './components/apiContext';
import Footer from './components/Footer';
import Forecast from './components/Forecast';
import Fortune from './components/Fortune';
import UserInput from './components/UserInput';
import './App.css';
import 'bulma/css/bulma.min.css';

function App() {
  const [location, setLocation] = useState(() => 'London');
  const [heroHead, setHeroHead] = useState(() => ({
    city: 'London',
    country: 'United Kingdom',
  }));

  const updateHeroHead = (() => {
    // update heroHead state if location fetch is successful
    // expects an object with city and country properties
    const success = ({ country: newCountry, city: newCity }) => {
      setHeroHead((prevHeroHead) => ({
        ...prevHeroHead,
        country: newCountry,
        city: newCity,
      }));
    };

    // reset hero head to null if the user input is invalid
    const fail = () => {
      setHeroHead(() => ({
        city: null,
        country: null,
      }));
    };

    return { success, fail };
  })();

  return (
    <div className="hero is-fullheight has-background-black-bis">
      <header className="hero-head p-5">
        <h1 className="title is-size-1 is-pink has-text-weight-bold has-text-centered">{heroHead.city ? heroHead.city : location}</h1>
        <h2 className="subtitle is-size-5 is-blue has-text-weight-light has-text-centered">{heroHead.country ? heroHead.country : 'unknown'}</h2>
      </header>
      <main className="hero-body is-flex-direction-column is-justify-content-space-evenly">
        <ApiProvider>
          <div
            className="container is-flex is-flex-direction-column is-justify-content-space-around m-0"
            style={{ width: '100%' }}
          >
            <Forecast location={location} updateHeroHead={updateHeroHead} />
          </div>
          <div className="container my-4">
            <Fortune />
          </div>
        </ApiProvider>
        <div className="container">
          <UserInput setLocation={setLocation} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
