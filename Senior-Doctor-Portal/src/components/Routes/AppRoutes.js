import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Appointments from '../Pages/Appointments/Appointments';
import Doctors from '../Pages/Doctors/Doctors';
import MainDash from '../MainDash/MainDash';
import PatientHistorys from '../Pages/PatientsHistorys/PatientHistorys';
import ViewAppointment from '../Pages/ViewAppointment/ViewAppointment';
import Client from '../Webrtc/Client';
import EditAppointment from '../Pages/EditAppointment/EditAppointment';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDash />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/patienthistory" element={<PatientHistorys />} />
      <Route path="/webrtc" element={<Client />} />
      <Route path="/editappointment" element={<EditAppointment />} />
      <Route path="/appointments/:id" element={<ViewAppointment />} />

    </Routes>
  );
};

export default AppRoutes;
