import { useState } from 'react';
import { useGlobalState } from '../GlobalStateContext';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

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
import { Button } from "@/components/ui/button"

function Start() {
  const { globalArray, setGlobalArray } = useGlobalState();
  const [nameInput, setNameInput] = useState('');
  const navigate = useNavigate();

  const addItemToArray = (e) => {
    e.preventDefault();
    if (nameInput.trim() !== '') {
      const newItem = { name: nameInput.trim(), points: 0 };
      setGlobalArray([...globalArray, newItem]);
      setNameInput('');
    }
  };

  const resetGame = () => {
    localStorage.removeItem('globalArray');
    setGlobalArray([]);
  };

  const handlePlayClick = () => {
    navigate('/Camera');
  };

  return (
    <div className="bg-black min-h-screen p-8 text-white"> {/* Added border-white class */}
    
      <div className="grid grid-cols-3 gap-4 mb-20">
        <div className="col-span-2 bg-black text-white p-10 border border-white rounded-xl">
          <h1 className="text-3xl font-extrabold mb-4">Start Page</h1>
          <p className="text-xl font-bold mb-4">Add Players Or Start A Game</p>
        </div>
        <div className="flex flex-col space-y-4 col-span-1">
          <Button onClick={handlePlayClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl flex-grow">Play</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex-grow rounded-xl">Reset Game</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>This will reset the scores and remove all players.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel as={Button} variant="outline">Cancel</AlertDialogCancel>
                <AlertDialogAction as={Button} onClick={resetGame} variant="destructive">Yes</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <form onSubmit={addItemToArray} className="flex">
        <Input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Enter a name and click Add Name"
          className="flex-grow w-4/5 mr-2" // Use the remaining space but reserve 1/5 for the button
        />
        <Button
          className="w-1/3 bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
          Add Name
        </Button>
      </form>

      <div className="flex flex-wrap gap-4 mt-4">
        {globalArray.map((item, index) => (
          <Card key={index} className="min-w-[120px] max-w-full bg-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-xl">{item.points} Points</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white">{item.name}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

}

export default Start;
