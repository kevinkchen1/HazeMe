/*
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
//<h1 className="text-3xl font-bold text-center mb-4">Leaderboard</h1>
    const renderLeaderboard = () => {
 
        const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

    return (
        <div className="container mx-auto mt-8">
            
            <h1 style={{ fontFamily: 'cursive', fontSize: '48px', fontWeight: 'normal', color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', letterSpacing: '2px', textDecoration: 'underline' }}>Leaderboard</h1>
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
}

export default Leaderboard;
*/
/*
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
        // Sort players in descending order of points
        const sortedPlayers = [...globalArray].sort((a, b) => b.points - a.points);

        return (
            <div className="container mx-auto mt-8">
                <h1 style={{ fontFamily: 'cursive', fontSize: '48px', fontWeight: 'normal', color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', letterSpacing: '2px', textDecoration: 'underline' }}>Leaderboard</h1>
                <ul className="list-decimal list-inside bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                    {sortedPlayers.map((player, index) => (
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
    };

    return renderLeaderboard();
}

export default Leaderboard;
*/
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
        // Sort players in descending order of points
        const sortedPlayers = [...globalArray].sort((a, b) => b.points - a.points);

        return (
            <div className="bg-black h-screen flex flex-col items-center justify-between p-4">
            <div className="container mx-auto mt-8">
                <h1 style={{ fontFamily: 'cursive', fontSize: '48px', fontWeight: 'normal', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', letterSpacing: '2px', textDecoration: 'underline' }}>Leaderboard</h1>
                <div className="bg-gray-300 rounded-lg p-4 max-w-md mx-auto">
                    <ul className="list-decimal list-inside gray-800 shadow-md rounded-lg p-4">
                        {sortedPlayers.map((player, index) => (
                            <li key={index} className="font-medium text-2xl">
                                {player.name}: <span className="font-bold text-2xl">{player.points} Points</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <Button onClick={handleNextTurn} className="bg-green-500 hover:bg-green-700 text-white py-10 px-16 rounded-lg text-xl">Next Turn</Button>
                    <Button onClick={handleReset} className="bg-red-500 hover:bg-red-700 text-white py-10 px-16 rounded-lg text-xl">Reset Game</Button>
                </div>
            </div>
            </div>
        );
    };

    return renderLeaderboard();
}

export default Leaderboard;
