import { useGlobalState } from '../GlobalStateContext.js'; // Import the useGlobalState

function Leaderboard() {
    const { globalArray } = useGlobalState(); // Access the global state
  
    return (
      <div>
        <h1>Leaderboard</h1>
        <ul>
          {globalArray.map((player, index) => (
            <li key={index}>{player.name}: {player.points} Points</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Leaderboard;
  