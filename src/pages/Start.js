import { useState } from 'react';
import { useGlobalState } from '../GlobalStateContext';

function Start() {
  const { globalArray, setGlobalArray } = useGlobalState();
  const [nameInput, setNameInput] = useState('');

  const addItemToArray = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (nameInput.trim() !== '') {
      const newItem = {
        name: nameInput.trim(),
        points: 0
      };
      setGlobalArray([...globalArray, newItem]);
      setNameInput(''); // Clear the input after adding
    }
  };

  const resetGame = () => {
    // Clear local storage
    localStorage.removeItem('globalArray');
    // Reset the global array state
    setGlobalArray([]);
  };

  return (
    <div>
      <h1>Start Page</h1>
      <form onSubmit={addItemToArray}>
        <textarea
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Enter a name and press Enter"
          rows="3"
        ></textarea>
        <button type="submit">Add Name</button>
      </form>
      <div>
        <ul>
          {globalArray.map((item, index) => (
            <li key={index}>{item.name} - {item.points} Points</li>
          ))}
        </ul>
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default Start;
