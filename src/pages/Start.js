import { useState } from 'react';
import { useGlobalState } from '../GlobalStateContext';
import { useHistory } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function Start() {
  const { globalArray, setGlobalArray } = useGlobalState();
  const [nameInput, setNameInput] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const history = useHistory();

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

  const handlePlayClick = () => {
    // Redirect the user to the Dares page
    //history.push('/Dares');
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
      <AlertDialog>
  <AlertDialogTrigger>Reset Game</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This will reset the scores for all players.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={resetGame}>Yes</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
<button onClick={handlePlayClick}>Play</button>
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
