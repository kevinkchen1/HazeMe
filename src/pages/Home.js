import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-500 flex flex-col items-center justify-between text-white hover:bg-blue-500">  
      <img src="wouldja.png" alt="Centered Image" className="self-center"/>
      <img src="mobile.png" alt="Centered Image" className="self-center"/>
      <button 
        className="bg-white text-xl text-blue-500 font-bold py-2 px-8 rounded-xl mb-4"
        style={{}}
        onClick={() => navigate('/start')}
      >
        LETS GO
      </button>
    </div>
  );
}

export default Home;
