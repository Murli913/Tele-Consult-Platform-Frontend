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
import ViewPatientUnderDoctor from './Senior-Doctor/components/ViewPatientUnderDoctor/ViewPatientUnderDoctor'
import PHomePage from './Patient/components/home/PHome'
import PHistory from './Patient/components/history/Phistory'
import PBookNow from './Patient/components/book/Pbook'
import PProfilePage from './Patient/components/profile/Pprofile'
import PNavbar from './Patient/components/navbar/Pnavbar'
import PSidebar from './Patient/components/sidebar/Psidebar'
import LobbyScreen from './Doctor/component/Lobby/Lobby'
import Home from './Doctor/component/Home/Home'
import Appointment from './Doctor/component/Appointment/Appointment'
import Prescription from './Doctor/component/Prescription/Prescription'
import RoomPage from './Doctor/component/Room/Room'
import PRoomPage from './Doctor/component/Proom/Proom'
import Patientscreen from './Doctor/component/Patient/Patient'
import IncomingCall from './Doctor/component/IncomingCall/Incomincall'






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
      <Route path="/viewpatientunderdoctor" element={<ViewPatientUnderDoctor />} />
      <Route path="/editappointment" element={<EditAppointment />} />
      <Route path="/sappointments/:id" element={<ViewAppointment />} />
     
      <Route path="/saddappointment" element={<AddAppointment />} />
      <Route path="/viewpatienthistory/:id"   element={<ViewPatientHistory />} />
       </Route>


//patient


        <Route path="/ploginpage" element={<PLoginPage />} />
        <Route path="/home" element={<PHomePage />} />
        <Route path="/history" element={<PHistory />} />
        <Route path="/book" element={<PBookNow />} />
        {/* <Route path='/client' element={<Client />} /> */}
        <Route path='/profile' element={<PProfilePage />} />
      

//Doctor

           <Route path="/dhome" element={<Home/>}/>
          <Route path="/call" element={<LobbyScreen />} />
          <Route path="/appointments" element={<Appointment/>} />
          <Route path="/prescription" element={<Prescription/>} />
          <Route path="/d/room/:roomId" element={<RoomPage />} />
          <Route path="/p/room/:roomId" element={<PRoomPage />} />
          <Route path="/patient" element={<Patientscreen/>} />
          <Route path="/incomingcall" element={<IncomingCall/>}></Route>
          <Route path="/dlogin" element={<DoctorLogin />} /> 


    </Routes>
  </BrowserRouter>
  )
}

export default App