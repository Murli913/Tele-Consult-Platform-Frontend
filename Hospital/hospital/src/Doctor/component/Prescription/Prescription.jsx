import React from 'react';
import { useLocation} from 'react-router-dom';
import "./Prescriptionstyle.css";


const Prescription = () => {
    const location = useLocation();
    const { patientId, patientName, prescription } = location.state;
  
    return (
      <div className='cont'>
        <h3>Prescription:</h3><hr/>
        <div className="prescontainer">
          <p><strong>Patient ID:</strong> {patientId}</p>
          <p><strong>Patient Name:</strong> {patientName}</p>
          <p><strong>Prescription:</strong> {prescription}</p>
          <button> Edit </button>
        </div>
      </div>
    );
  };

export default Prescription;
