import React, { useState } from 'react';
import helperModule from '../scripts/engine';

function UserInput({ setLocation }) {
  const [userInput, setUserInput] = useState(() => '');

  const { toTitleCase } = helperModule;

  const handleChange = (e) => {
    setUserInput(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // normalize user input
    const location = toTitleCase(userInput.trim());
    setLocation(() => location);
    // reset user input state after submit
    setUserInput(() => '');
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <div className="control">
        <input className="input" type="text" placeholder="Location..." value={userInput} onChange={handleChange} />
      </div>
      <div className="control">
        <button className="button" type="submit">Search</button>
      </div>
    </form>
  );
}

export default UserInput;
