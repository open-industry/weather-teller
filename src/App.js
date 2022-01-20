import React, { useState } from 'react';
import { ApiProvider } from './components/apiContext';
import Forecast from './components/Forecast';
import './App.css';
import 'bulma/css/bulma.min.css';
/*
TODO:
- add a search bar (setLocation)
*/
function App() {
  const [location, setLocation] = useState(() => 'London');

  return (
    <main className="hero is-fullheight has-background-black-bis">
      <div className="hero-head">
        <h1 className="title has-text-white-ter has-text-centered">{location}</h1>
      </div>
      <div className="hero-body">
        <div className="container">
          <ApiProvider>
            <Forecast location={location} />
          </ApiProvider>
        </div>
      </div>
    </main>
  );
}

export default App;
