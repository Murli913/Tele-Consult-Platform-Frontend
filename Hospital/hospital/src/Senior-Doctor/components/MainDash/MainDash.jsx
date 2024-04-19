import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
  
    <div className="MainDash" style={{ marginTop: '40px' }}>
      
      <h1>Dashboard</h1>
     
      <br/>
      <br/>
      <Cards />
      <br/>
      <br/>
      <br/>
      
      
      <Table />
    </div>
  );
};

export default MainDash;
