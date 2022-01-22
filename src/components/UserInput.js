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
    const location = toTitleCase(userInput.trim());
    setLocation(() => location);
    setUserInput(() => '');
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <div className="control">
        <input className="input" type="text" placeholder="Search..." value={userInput} onChange={handleChange} />
      </div>
      <div className="control">
        <button className="button is-info" type="submit">Search</button>
      </div>
    </form>
  );
}

export default UserInput;
