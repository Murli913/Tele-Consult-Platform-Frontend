import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Doctors from './components/Doctors'
import Blogs from './components/Blogs'
import Footer from './components/Footer'
import HealthCheck from './components/HealthCheck/HealthCheck'
import Yoga from './components/Yoga/Yoga'



const App = () => {
  return (
  <>
  <Navbar/>
  
  <main>
        <div id="home">
          <Home />
        </div>
        <div id="home">
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

        <div id="blog">
          <Blogs />
        </div>
        
       
  </main>
  <div id="healthcheck">
          <HealthCheck />
        </div>
  <Footer />
   
  </>
  )
}

export default App