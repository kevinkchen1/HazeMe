import React from 'react';
import { useGlobalState } from '../GlobalStateContext'; // Ensure this is correctly imported
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

function Leaderboard() {
    const { globalArray, setGlobalArray } = useGlobalState();
    const navigate = useNavigate();

    const handleNextTurn = () => {
        // Find the current player's index
        const currentIndex = globalArray.findIndex(player => player.isCurrent);
        // Calculate the next index
        const nextIndex = (currentIndex + 1) % globalArray.length;

        // Update the global array to set the next player as the current one
        const updatedArray = globalArray.map((player, index) => ({
            ...player,
            isCurrent: index === nextIndex
        }));
        setGlobalArray(updatedArray);
        
        // Navigate back to the Camera
        navigate("/camera");
    };

    const handleReset = () => {
        // Reset the global array
        setGlobalArray([]);
        // Navigate back to the Camera or stay on the leaderboard
        navigate("/");
    };

    return (
        <div>
            <h1>Leaderboard</h1>
            <ul>
                {globalArray.map((player, index) => (
                    <li key={index}>{player.name}: {player.points} Points</li>
                ))}
            </ul>
            <Button onClick={handleNextTurn} className="mr-2 bg-green-500">Next Turn</Button>
            <Button onClick={handleReset} className="bg-red-500">Reset Game</Button>
        </div>
    );
}

export default Leaderboard;
