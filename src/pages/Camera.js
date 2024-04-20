import { useGlobalState } from '../GlobalStateContext';

function Camera() {
  const { globalArray, setGlobalArray } = useGlobalState();

  const addItemToArray = (item) => {
    setGlobalArray([...globalArray, item]);
  };

  return (
    <div>
      <h1>Camera Page</h1>
      <button onClick={() => addItemToArray('New Item')}>Add Item</button>
      <div>
        {globalArray}
      </div>
    </div>
  );
}

export default Camera;
