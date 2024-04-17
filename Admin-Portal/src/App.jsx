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
import ViewAppointment from "./components/ViewAppointment/ViewAppointment";
import PatientDetails from "./components/PatientDetails/PatientDetails";
import DoctorDetails from "./components/DoctorDetails/DoctorDetails";
import AddDoctor from "./components/AddDoctor/AddDoctor";

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
        <Route path="/login" element={<Login />} />
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/viewAppointment" element={<ViewAppointment />} />
            <Route path="/patientdetails" element={<PatientDetails />} />
            <Route path="/doctordetails" element={<DoctorDetails />} />
            <Route path="/adddoctor" element={<AddDoctor />} />
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
