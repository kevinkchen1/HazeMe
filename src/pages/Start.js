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
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
    <div className="bg-black min-h-screen text-white ">
      <div className="mb-4">
          <img src="people.jpg" alt="Start Game Image" className="w-full h-auto mb-4 rounded-b-3xl" />
        <div className="flex flex-col grid grid-cols-2 gap-4 mr-4 ml-4">
          <Button onClick={handlePlayClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-10 px-4 rounded-xl">Play</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="rounded-xl  py-10 px-4 ">Reset Game</Button>
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

      <form onSubmit={addItemToArray} className="flex m-4">
        <Input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Enter a name and click Add Name"
          className="flex-grow w-4/5 mr-2" // Use the remaining space but reserve 1/5 for the button
        />
        <Button
          className="w-1/3 bg-slate-600 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded"
        >
          Add Name
        </Button>
      </form>

      <div className="flex flex-wrap grid grid-cols-2 gap-4 m-4">
        {globalArray.map((item, index) => (
          <Card key={index} className="min-w-[120px] max-w-full bg-slate-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{item.points} Points</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white text-lg font-bold">{item.name}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Start;
