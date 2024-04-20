import { useState } from 'react';
import { useGlobalState } from '../GlobalStateContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

function Start() {
  const { globalArray, setGlobalArray } = useGlobalState();
  const [nameInput, setNameInput] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

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
          placeholder="Enter a name and click Add Name"
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
      <AlertDialog isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Game</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset the game? This will clear points for all players.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={resetGame}>Reset Game</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <button onClick={() => setIsAlertOpen(true)}>Reset Game</button>
    </div>
      
  );
}




/*
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}
*/


export default Start;
