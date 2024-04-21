import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStateProvider } from './GlobalStateContext'; // Import the provider

// Pages
import Start from './pages/Start';
import Camera from './pages/Camera';
import Dares from './pages/Dares';
import Leaderboard from './pages/Leaderboard';
import Home from 'pages/Home';

function App() {
  return (
    <GlobalStateProvider>  {/* Wrap the router in the GlobalStateProvider */}
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Start />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/dares" element={<Dares />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GlobalStateProvider>
  );
}

export default App;
