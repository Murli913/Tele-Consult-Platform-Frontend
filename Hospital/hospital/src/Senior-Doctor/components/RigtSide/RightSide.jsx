import React from "react";
import CustomerReview from "../CustomerReview/CustomerReview";
import Updates from "../Updates/Updates";
import "./RightSide.css";

const RightSide = () => {
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
