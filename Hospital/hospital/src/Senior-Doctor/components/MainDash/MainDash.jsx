import React, { useEffect } from "react";

import Table from "../Table/Table";
import "./MainDash.css";
import SAreaCards from "../Cards/SAreaCards";
import { useNavigate } from "react-router-dom";
import OngoingCall from "../Ongoingcall/Ongoingcall";
const MainDash = () => {
  const navigate=useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } 
},[]);
  return (
  
    <div className="MainDash" style={{ marginTop: '40px' }}>
     <br/>
      <h1 class="big-bold-heading">Dashboard</h1>

      <SAreaCards />
     
      
      <div className="table-container">
        <Table />
        <OngoingCall />
      </div>
    </div>
  );
};

export default MainDash;
