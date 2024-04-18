import React from 'react'


import MainRoute from './components/Main/MainRoute'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SeniorDoctor from './Senior-Doctor/SeniorDoctor'
import Patient from './Patient/Patient'

import Login from './components/Login/Login'

import DoctorLogin from './Doctor/component/Doctorlogin/Doctorlogin'
import LoginSD from './Senior-Doctor/components/LoginSD/LoginSD'
import PLoginPage from './Patient/components/login/PloginPage'



const App = () => {
  return (
  <BrowserRouter>
    <Routes>
  
      <Route path="/" element={<MainRoute/>}/>
      <Route path="/seniordoctor" element={<SeniorDoctor/>}/>
      <Route path="/patient" element={<PLoginPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logind" element={<DoctorLogin/>}/>
      <Route path="/loginsd" element={<LoginSD/>}/>
      
     
    </Routes>
  </BrowserRouter>
  )
}

export default App