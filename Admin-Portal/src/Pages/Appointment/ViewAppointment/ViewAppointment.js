import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const ViewAppointment = () => {
  const [appointment, setAppointment] = useState({
    patientname: "",
    doctorname: "",
    apttime: "",
    dptdate: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/appointment/appointment/${id}`);
    setAppointment(result.data);
  };
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Doctor Details</h2>

        <div className="card">
          <div className="card-header">
            Details of Appointment id : {appointment.id}
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>PatientName:</b>
                {appointment. patientname}
              </li>
              <li className="list-group-item">
                <b>Doctor-name:</b>
                {appointment.doctorname}
              </li>
              <li className="list-group-item">
                <b>Time:</b>
                {appointment.apttime}
              </li>
              <li className="list-group-item">
                <b>Date:</b>
                {appointment.dptdate}
              </li>
            </ul>
          </div>
        </div>
        <Link className="btn btn-primary my-2" to={"/dashboard"}>
          Back to Home
        </Link>
      </div>
    </div>
  </div>
  )
}

export default ViewAppointment
