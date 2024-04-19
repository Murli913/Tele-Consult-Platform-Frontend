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
import DoctorUnderSenior from '../Pages/DoctorUnderSenior/DoctorUnderSenior';
import UpdateAppointment from '../Pages/UpdateAppointment/UpdateAppointment';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/maindash" element={<MainDash />} />
      <Route path="/sappointments" element={<Appointments />} />
      <Route path="/doctorundersenior" element={<DoctorUnderSenior />} />
      <Route path="/spatienthistory" element={<PatientHistorys />} />
      <Route path="/updateappointment" element={<UpdateAppointment />} />
      <Route path="/editappointment" element={<EditAppointment />} />
      <Route path="/sappointments/:id" element={<ViewAppointment />} />
     
      <Route path="/saddappointment" element={<AddAppointment />} />
      <Route path="/viewpatienthistory/:id"   element={<ViewPatientHistory />} />

    </Routes>
  );
};

export default AppRoutes;
