import { useState } from 'react';
import { useGlobalState } from '../GlobalStateContext';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
    navigate('/Camera');
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
  <AlertDialogTrigger className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" >Reset Game</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This will reset the scores for all players.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction 
        onClick={resetGame} 
      >
        Yes
      </AlertDialogAction>
      
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

<div style={{ marginTop: '10px' }}>

<button 
        onClick={handlePlayClick} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Play
</button>
</div>

</div>
  
  );
}

/*<AlertDialogAction onClick={resetGame} className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Yes</AlertDialogAction>*/


/*
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}
*/


export default Start;
