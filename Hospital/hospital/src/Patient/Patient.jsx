import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './Patient.css';
import PNavbar from './components/navbar/Pnavbar';
import PSidebar from './components/sidebar/Psidebar';
import PLoginPage from './components/login/PloginPage';
import PHomePage from './components/home/PHome';
import PHistory from './components/history/Phistory';
import PBookNow from './components/book/Pbook';
import PProfilePage from './components/profile/Pprofile';
import PClient from './components/client/client';
import PLobbyScreen from './components/Lobby/Lobby';
import PRoomPage from './components/Room/Room';
import { connectWithWebSocket } from './components/utils/wssConnection/wssConnection';


function Patient() {
  
  useEffect(() => {
    connectWithWebSocket();
  }, []);
  const location = useLocation();


  return (
    <div className="App">
      {location.pathname !== "/" && <PNavbar /> }
      <div style={{ display: 'flex' }}>
      {location.pathname !== "/" && <PSidebar />}
        <Routes>
          <Route path="/" element={<PLoginPage />} />
          <Route path="/home" element={<PHomePage />} />
          <Route path="/history" element={<PHistory />} />
          <Route path="/book" element={<PBookNow />} />
          <Route path="/client" element={<PClient />} />
          <Route path="/profile" element={<PProfilePage />} />
          <Route path='/pcall' element={<PLobbyScreen/>}/>
          <Route path="/bp/room/:roomId" element={<PRoomPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default Patient;