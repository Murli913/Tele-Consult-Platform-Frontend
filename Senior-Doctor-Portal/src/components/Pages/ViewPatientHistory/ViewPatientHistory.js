import React from 'react';
import { Link } from 'react-router-dom';
import './ViewPatientHistory.css'; // Import your CSS file for styling

const ViewPatientHistory = ({ patient }) => {
  // Check if patient data is available
  if (!patient) {
    return <div>Loading...</div>; // You can add loading indicator or message
  }

  return (
    <div className="view-patient-history-container">
      <h2>View Patient History</h2>

      {/* Patient details form */}
      <form className="patient-details-form">
        <div className="form-group">
          <label htmlFor="patientId">Patient ID:</label>
          <input type="text" id="patientId" value={patient?.patient?.id || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="doctorId">Doctor ID:</label>
          <input type="text" id="doctorId" value={patient?.doctor?.id || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="callDate">Consultant Date:</label>
          <input type="text" id="callDate" value={patient?.callDate || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="callTime">Consultant Time:</label>
          <input type="text" id="callTime" value={patient?.callTime || ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="prescription">Prescription:</label>
          <textarea id="prescription" value={patient?.prescription || ''} readOnly />
        </div>

        {/* Button to navigate back to patient history */}
        <Link to="/patient-history" className="back-button">Back to Patient History</Link>
      </form>
    </div>
  );
};

export default ViewPatientHistory;
