import React from 'react';
import './footerstyle.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <hr />
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Health. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
