import React from 'react';
import Navbar from '../Navbar';
import Home from '../Home';
import Yoga from '../Yoga/Yoga';
import About from '../About';
import Services from '../Services';
import Doctors from '../Doctors';
import Blogs from '../Blogs';
import HealthCheck from '../HealthCheck/HealthCheck';
import GoMap from '../GoMap/GoMap';
import Footer from '../Footer';

const MainRoute = () => {
  return (
    <>
      <Navbar />
      <main>
        <div id="home">
          <Home />
        </div>
        <div id="yoga">
          <Yoga />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="doctors">
          <Doctors />
        </div>
        <div id="blogs">
          <Blogs />
        </div>
      </main>
      <div id="healthcheck">
        <HealthCheck />
      </div>
      <div id="gomap">
        <GoMap />
      </div>
      <Footer />
    </>
  );
}

export default MainRoute;
