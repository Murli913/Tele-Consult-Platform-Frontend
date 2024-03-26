import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './loginPage';
import Navbar from './navbar';
import HomePage from './Home';
import History from './history';
import BookNow from './book';

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
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/history" element={<History />} />
        <Route path="/book" element={<BookNow />} />
      </Routes>
    </>
  );
}

export default App;
