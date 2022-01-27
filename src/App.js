import React, { useState } from 'react';
import { ApiProvider } from './components/apiContext';
import Footer from './components/Footer';
import Forecast from './components/Forecast';
import Fortune from './components/Fortune';
import UserInput from './components/UserInput';
import './App.css';
import 'bulma/css/bulma.min.css';

/*
TODO:
- add a search bar (setLocation)
*/

function App() {
  const [location, setLocation] = useState(() => 'London');

  return (
    <div className="hero is-fullheight has-background-black-bis">
      <header className="hero-head p-5">
        <h1 className="title is-size-1 is-pink has-text-weight-bold has-text-centered">{location}</h1>
      </header>
      <main className="hero-body is-flex-direction-column is-justify-content-space-evenly">
        <ApiProvider>
          <div className="container is-flex is-justify-content-space-between is-full-width">
            <Forecast location={location} />
          </div>
          <div className="container">
            <Fortune />
          </div>
        </ApiProvider>
        <div className="hero-foot">
          <div className="container">
            <UserInput setLocation={setLocation} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
