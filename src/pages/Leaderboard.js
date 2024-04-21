import React from 'react';
import { useGlobalState } from '../GlobalStateContext'; // Correctly imported
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

function Leaderboard() {
    const { globalArray, setGlobalArray } = useGlobalState();
    const navigate = useNavigate();

    const handleNextTurn = () => {
        const currentIndex = globalArray.findIndex(player => player.isCurrent);
        const nextIndex = (currentIndex + 1) % globalArray.length;
        const updatedArray = globalArray.map((player, index) => ({
            ...player,
            isCurrent: index === nextIndex
        }));
        setGlobalArray(updatedArray);
        navigate("/camera");
    };

    const handleReset = () => {
        setGlobalArray([]);
        navigate("/");
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center mb-4">Leaderboard</h1>
            <ul className="list-decimal list-inside bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                {globalArray.map((player, index) => (
                    <li key={index} className="font-medium">
                        {player.name}: <span className="font-bold">{player.points} Points</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center space-x-4 mt-4">
                <Button onClick={handleNextTurn} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">Next Turn</Button>
                <Button onClick={handleReset} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Reset Game</Button>
            </div>
        </div>
    );
}

export default Leaderboard;
