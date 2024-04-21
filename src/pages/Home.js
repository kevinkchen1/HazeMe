import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-700 h-screen flex flex-col items-center justify-between p-4">
      <div className="self-start mt-4">
        <h1 className="text-white text-4xl font-extrabold mb-10">WOULDYA!</h1>
        <p className="text-white text-xl font-semibold">Welcome to the app! Where if you dont do the dare you must take a drink of a completely non-alchoholic beverage</p>
      </div>
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
