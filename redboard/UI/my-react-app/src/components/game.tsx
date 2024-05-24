import React, { useState } from 'react';

const SimpleGame = () => {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1);

  const handleChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userGuess = Number(guess);
    if (userGuess === secretNumber) {
      setMessage('Congratulations! You guessed the rebalance % ');
    } else if (userGuess < secretNumber) {
      setMessage('Too low! Its file based rebalance try again.');
    } else {
      setMessage('Too high! Try again.');
    }
  };

  const handleReset = () => {
    setGuess('');
    setMessage('');
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      <h2>Guess the Rebalance % </h2>
      <form onSubmit={handleSubmit}>
        <input type="number" value={guess} onChange={handleChange} />
        <button  style={{ color: 'white', textAlign: 'center' ,marginLeft: '20px' }} type="submit">Guess</button>
      </form>
      <button  style={{ color: 'white', textAlign: 'center' ,marginTop: '20px' }} onClick={handleReset}>Reset</button>
      <p>{message}</p>
    </div>
  );
};

export default SimpleGame;
