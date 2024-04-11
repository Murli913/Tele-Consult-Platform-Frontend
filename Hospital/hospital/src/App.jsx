import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'

const App = () => {
  return (
  <>
  <Navbar/>
  
  <main>
        <div id="home">
          <Home />
        </div>
        
  </main>
  </>
  )
}

export default App