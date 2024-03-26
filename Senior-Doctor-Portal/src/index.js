import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter here

const rootElement = document.getElementById('root');

// Use createRoot to render your application
const root = ReactDOM.createRoot(rootElement);

// Wrap your App component with a Router
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Use BrowserRouter here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
