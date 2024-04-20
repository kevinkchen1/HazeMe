import { useGlobalState } from '../GlobalStateContext';

function Camera() {
  const { globalArray, setGlobalArray } = useGlobalState();

  return (
    <div>
      <h1>Camera Page</h1>
      <div>
        <ul>
          {globalArray.map((item, index) => (
            <li key={index}>{item.name} - {item.points} Points</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Camera;
