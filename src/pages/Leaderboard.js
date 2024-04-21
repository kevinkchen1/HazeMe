import React from 'react';
import { useGlobalState } from '../GlobalStateContext';
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

    const renderLeaderboard = () => {
        const sortedPlayers = [...globalArray].sort((a, b) => b.points - a.points);

        const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // Gold, Silver, Bronze

        return (
            <div className="bg-[#F5F5F7] h-screen flex flex-col items-center p-4">
                <img src="wouldja.png" alt="Wouldja Logo" className="w-60 h-24 mt-4" />              
                 <h1 className="font-normal text-3xl text-gray-800 mt-4">Leaderboard</h1>
                <div className="w-full flex flex-col items-center mt-4">
                    {sortedPlayers.map((player, index) => (
                        <div key={index} className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4 flex justify-between items-center mb-4" style={{ borderColor: medalColors[index] || '#ffffff', borderWidth: index < 3 ? '4px' : '0px' }}>
                            <span className="text-xl font-medium">{player.name}</span>
                            <span className="text-2xl font-bold">{player.points} Points</span>
                        </div>
                    ))}
                </div>
                <div className="flex space-x-4 mt-4">
                    <Button onClick={handleNextTurn} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Next Turn</Button>
                    <Button onClick={handleReset} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded">Reset Game</Button>
                </div>
            </div>
        );
    };

    return renderLeaderboard();
}

export default Leaderboard;
