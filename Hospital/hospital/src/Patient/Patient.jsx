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


function Patient() {
  return (
 
      <div className="App">
        <AppContent />
      </div>
   
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/patient" && <PNavbar /> }
      <div style={{ display: 'flex' }}>
      {location.pathname !== "/patient" && <PSidebar />}
      <Routes>
        <Route path="/" element={<PLoginPage />} />
        <Route path="/home" element={<PHomePage />} />
        <Route path="/history" element={<PHistory />} />
        <Route path="/book" element={<PBookNow />} />
        {/* <Route path='/client' element={<Client />} /> */}
        <Route path='/profile' element={<PProfilePage />} />
      </Routes>
      </div>
    </>
  );
}

export default Patient;
