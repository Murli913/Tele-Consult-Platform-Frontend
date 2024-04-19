import React from 'react'


import MainRoute from './components/Main/MainRoute'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SeniorDoctor from './Senior-Doctor/SeniorDoctor'
import Patient from './Patient/Patient'

import Login from './components/Login/Login'

import DoctorLogin from './Doctor/component/Doctorlogin/Doctorlogin'
import LoginSD from './Senior-Doctor/components/LoginSD/LoginSD'
import PLoginPage from './Patient/components/login/PloginPage'
import MainDash from './Senior-Doctor/components/MainDash/MainDash'
import Appointments from './Senior-Doctor/components/Pages/Appointments/Appointments'

import PatientHistorys from './Senior-Doctor/components/Pages/PatientsHistorys/PatientHistorys'
import EditAppointment from './Senior-Doctor/components/Pages/EditAppointment/EditAppointment'
import ViewAppointment from './Senior-Doctor/components/Pages/ViewAppointment/ViewAppointment'
import AddAppointment from './Senior-Doctor/components/Pages/AddAppointment/AddAppointment'
import ViewPatientHistory from './Senior-Doctor/components/Pages/ViewPatientHistory/ViewPatientHistory'
import DoctorUnderSenior from './Senior-Doctor/components/Pages/DoctorUnderSenior/DoctorUnderSenior'
import UpdateAppointment from './Senior-Doctor/components/Pages/UpdateAppointment/UpdateAppointment'






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

      <Route element={<SeniorDoctor />}>
      <Route path="/updateappointment" element={<UpdateAppointment />} />
      <Route path="/maindash" element={<MainDash />} />
      <Route path="/sappointments" element={<Appointments />} />
      <Route path="/doctorundersenior" element={< DoctorUnderSenior/>} />
      <Route path="/spatienthistory" element={<PatientHistorys />} />
   
      <Route path="/editappointment" element={<EditAppointment />} />
      <Route path="/sappointments/:id" element={<ViewAppointment />} />
     
      <Route path="/saddappointment" element={<AddAppointment />} />
      <Route path="/viewpatienthistory/:id"   element={<ViewPatientHistory />} />
       </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App