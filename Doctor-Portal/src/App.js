// App.js
import './App.css';
import Navbar from './component/Navbardoctor/Navbardoctor';
import Home from './component/Home/Home';
// import Footer from './Footer';
import SideNav from './component/SideNav/SideNav';
import { Route, Routes, useLocation } from 'react-router-dom';
import RoomPage from './component/Room/Room';
import LobbyScreen from './component/Lobby/Lobby';
import Patientscreen from './component/Patient/Patient';
import DoctorLogin from './component/Doctorlogin/Doctorlogin'; // Import DoctorLogin component
import Prescription from './component/Prescription/Prescription';
import IncomingCall from './component/IncomingCall/Incomincall';
import PRoomPage from './component/Proom/Proom';
import Appointment from './component/Appointment/Appointment';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      
      {location.pathname !== "/patient" && location.pathname !== "/" && !location.pathname.startsWith("/p/room/") && <Navbar /> }
      <div style={{ display: 'flex' }}>
        {location.pathname !== "/patient" && location.pathname !== "/" && !location.pathname.startsWith("/p/room/") && <SideNav />}
        
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/call" element={<LobbyScreen />} />
          <Route path="/appointments" element={<Appointment/>} />
          <Route path="/prescription" element={<Prescription/>} />
          <Route path="/d/room/:roomId" element={<RoomPage />} />
          <Route path="/p/room/:roomId" element={<PRoomPage />} />
          <Route path="/patient" element={<Patientscreen/>} />
          <Route path="/incomingcall" element={<IncomingCall/>}></Route>
          <Route path="/" element={<DoctorLogin />} /> {/* Render DoctorLogin component inside a route */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
