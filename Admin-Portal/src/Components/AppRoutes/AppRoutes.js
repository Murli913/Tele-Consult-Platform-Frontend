import React from 'react'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import DashBaord from '../../Pages/Dashbaord/DashBaord';



import Appointment from '../../Pages/Appointment/Appointment';
import Patients from '../../Pages/Patients/Patients';
import Doctors from '../../Pages/Doctors/Doctors';
import SeniorDoctors from '../../Pages/SeniorDoctors/SeniorDoctors';
import AddDoctor from '../../Pages/AddDoctor/AddDoctor';

import Login from '../../Pages/Login/Login';
import EditDoctor from '../../Pages/EditDoctor/EditDoctor';
import ViewDoctor from '../../Pages/ViewDoctor/ViewDoctor';
import AddPatient from '../../Pages/Patient/AddPatient/AddPatient';
import ViewPatient from '../../Pages/Patient/ViewPatient/ViewPatient';
import EditPatient from '../../Pages/Patient/EditPatient/EditPatient';
import EditAppointment from '../../Pages/Appointment/EditAppointment/EditAppointment';
import ViewAppointment from '../../Pages/Appointment/ViewAppointment/ViewAppointment';

const AppRoutes = () => {
  return (
    
    <Routes>
      <Route path="/dashBoard" element={<DashBaord />}></Route>
      <Route path="/seniordoctors" element={<SeniorDoctors />}></Route>
      <Route path="/doctors" element={<Doctors />}></Route>
      <Route path="/patients" element={<Patients />}></Route>
      <Route path="/appoint" element={<Appointment />}></Route>
      <Route path="/adddoctor" element={<AddDoctor />}></Route>
      <Route path="/addpatient" element={<AddPatient />}></Route>
      <Route path="/viewpatient/:id" element={<ViewPatient />}></Route>
      <Route path="/editpatient/:id" element={<EditPatient />}></Route>
      <Route path="/editdoctor/:id" element={<EditDoctor />}></Route>
      <Route path="/editappointment/:id" element={<EditAppointment />}></Route>
      <Route path="/viewappointment/:id" element={<ViewAppointment />}></Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/viewdoctor/:id" element={<ViewDoctor />}></Route>
    </Routes>
   
  )
}

export default AppRoutes
