import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './components/login/loginPage';
import Navbar from './components/navbar/navbar';
import HomePage from './components/home/Home';
import History from './components/history/history';
import BookNow from './components/book/book';
import Sidebar from './components/sidebar/sidebar';
// import Client from './client';
import ProfilePage from './components/profile/profile';

function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar /> }
      <div style={{ display: 'flex' }}>
      {location.pathname !== "/" && <Sidebar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/history" element={<History />} />
        <Route path="/book" element={<BookNow />} />
        {/* <Route path='/client' element={<Client />} /> */}
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
