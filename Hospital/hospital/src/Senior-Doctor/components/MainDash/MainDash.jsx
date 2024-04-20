import React, { useEffect } from "react";

import Table from "../Table/Table";
import "./MainDash.css";
import SAreaCards from "../Cards/SAreaCards";
import { useNavigate } from "react-router-dom";
const MainDash = () => {
  const navigate=useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } 
},[]);
  return (
  
    <div className="MainDash" style={{ marginTop: '40px' }}>
      
      <h1>Dashboard</h1>
     
      <br/>
      <br/>
      <SAreaCards />
      <br/>
      <br/>
      <br/>
      
      
      <Table />
    </div>
  );
};

export default MainDash;
