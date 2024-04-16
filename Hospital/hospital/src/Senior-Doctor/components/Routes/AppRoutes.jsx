import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Doctors from '../../../components/Doctors';
import MainDash from '../MainDash/MainDash';
import Appointments from '../Pages/Appointments/Appointments';
import PatientHistorys from '../Pages/PatientsHistorys/PatientHistorys';
import EditAppointment from '../Pages/EditAppointment/EditAppointment';
import ViewPatientHistory from '../Pages/ViewPatientHistory/ViewPatientHistory';
import AddAppointment from '../Pages/AddAppointment/AddAppointment';
import ViewAppointment from '../Pages/ViewAppointment/ViewAppointment';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDash />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/patienthistory" element={<PatientHistorys />} />
   
      <Route path="/editappointment" element={<EditAppointment />} />
      <Route path="/appointments/:id" element={<ViewAppointment />} />
     
      <Route path="/addappointment" element={<AddAppointment />} />
      <Route path="/viewpatienthistory/:id"   element={<ViewPatientHistory />} />

    </Routes>
  );
};

export default AppRoutes;
