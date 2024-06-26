import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import Login from "./components/Login/Login";

import PatientDetails from "./components/PatientDetails/PatientDetails";
import DoctorDetails from "./components/DoctorDetails/DoctorDetails";
import AddDoctor from "./components/AddDoctor/AddDoctor";
import SeniorDoctorDetails from "./components/SeniorDoctorDetails/SeniorDoctorDetails";
import ViewDoctorUnderSenior from "./components/ViewDoctorUnderSeniorDoctor/ViewDoctorUnderSeniorDoctor";
import AddDoctorInSeniorDoctor from "./components/AddDoctorInSeniorDoctor/AddDoctorInSeniorDoctor";
import Profile from "./components/Profile/Profile";
import ViewPatientHistory from "./components/ViewPatientHistory/ViewPatientHistory";
import ViewDoctorHistory from "./components/ViewDoctorHistory/ViewDoctorHistory";
import UpdateDoctorDetails from "./components/UpdateDoctorDetails/UpdateDoctorDetails";
import ViewAppointments from "./components/ViewAppointment/ViewAppointment";
import Authentication from "./components/Authentication/Authentication";
import DoctorPhone from "./components/DoctorPhone/DoctorPhone";
import Message from "./components/Message/Message";
import { ContactUs } from "./components/email/email";


function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
    
        <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/doctorphone" element={<DoctorPhone/>} />
        <Route path="/message" element={<Message />} />
        <Route path="/email" element={<ContactUs />} />
          <Route element={<BaseLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/viewAppointments" element={<ViewAppointments />} />
            <Route path="/patientdetails" element={<PatientDetails />} />
            <Route path="/doctordetails" element={<DoctorDetails />} />
            <Route path="/adddoctor" element={<AddDoctor />} />
            <Route path="/seniordoctordetails" element={<SeniorDoctorDetails />} />
            <Route path="/viewdoctorundersenior/:id" element={<ViewDoctorUnderSenior />} />
            <Route path="/viewpatienthistory" element={<ViewPatientHistory />} />
            <Route path="/adddoctorinseniordoctor" element={<AddDoctorInSeniorDoctor />} />
            <Route path="/viewdoctorhistory" element={<ViewDoctorHistory />} />
            <Route path="/updatedoctordetails" element={<UpdateDoctorDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/authentication" element={<Authentication />} />
          
            <Route path="*" element={<PageNotFound />} />
            
          </Route>
          
                </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router>
    </>
  );
}

export default App;
