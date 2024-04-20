import React, { useEffect } from "react";
import CustomerReview from "../CustomerReview/CustomerReview";
import Updates from "../Updates/Updates";
import "./RightSide.css";
import { useNavigate } from "react-router-dom";

const RightSide = () => {
  const navigate=useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } 
},[]);
  return (
    <div className="RightSide">
      <div>
      <h3 class=" font-bold text-left">Top Doctors</h3>

        <Updates />
      </div>
      <div>
      
        <CustomerReview />
      </div>
    </div>
  );
};

export default RightSide;
