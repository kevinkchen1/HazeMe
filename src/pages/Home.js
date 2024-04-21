import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-700 h-screen flex flex-col items-center justify-between p-4">
      
      <img src="wouldja.png" alt="Centered Image" className="self-center"/>
      <img src="dead.png" alt="Centered Image" className="self-center"/>
      <button 
        className="bg-white text-3xl text-blue-700 font-extrabold py-20 px-40 rounded-3xl mb-4"
        onClick={() => navigate('/start')}
      >
        LETS GO
      </button>
    </div>
  );
}

export default Home;
