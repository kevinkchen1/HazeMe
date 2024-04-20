import { useState } from 'react';
import { useGlobalState } from '../GlobalStateContext';
import { Button } from "@/components/ui/button"


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

  return (
    <div>
      <h1 className='font-extrabold'>Start Page</h1>
      <form onSubmit={addItemToArray}>
        <textarea
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Enter a name and press Enter"
          rows="3"
        ></textarea>
        <Button variant="outline" type="submit">Add Name</Button>
      </form>
      <div>
        <ul>
          {globalArray.map((item, index) => (
            <li key={index}>{item.name} - {item.points} Points</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Start;
