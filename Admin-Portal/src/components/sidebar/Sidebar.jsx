import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import { MdAdminPanelSettings } from "react-icons/md";
import { SiAsciidoctor } from "react-icons/si";
import { FaPerson } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";

import { CgProfile } from "react-icons/cg";

import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">Admin</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdAdminPanelSettings  size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link active">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
           
            <li className="menu-item">
              <Link to="/viewAppointment" className="menu-link">
                <span className="menu-link-icon">
                  <SiAsciidoctor size={20} />
                </span>
                <span className="menu-link-text">View Appointment</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/patientdetails" className="menu-link">
                <span className="menu-link-icon">
                  <FaPerson  size={18} />
                </span>
                <span className="menu-link-text">Patients</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/doctordetails" className="menu-link">
                <span className="menu-link-icon">
                  <FaUserDoctor size={20} />
                </span>
                <span className="menu-link-text">Doctors</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <FaUserDoctor size={20} />
                </span>
                <span className="menu-link-text">Senior Doctor</span>
              </Link>
            </li>
          
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <CgProfile size={20} />
                </span>
                <span className="menu-link-text">Profile</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
