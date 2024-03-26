import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditAppointment.css';
import { Button } from 'antd';

const EditAppointment = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [appointment, setAppointment] = useState({
    patientname: "",
    doctorname: "",
    apttime: "",
    dptdate: "",
  });

  const { patientname, doctorname, apttime, dptdate } = appointment;

  const onInputChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/appointment/appointment/${id}`, appointment);
    navigate("/dashboard");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/appointment/appointment/${id}`);
    setAppointment(result.data);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Edit Appointment details</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Patient Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter patient name"
              name="patientname"
              value={patientname}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorname" className="form-label">Doctor Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter doctor name"
              name="doctorname"
              value={doctorname}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="apttime" className="form-label">Time</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter time"
              name="apttime"
              value={apttime}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dptdate" className="form-label">Date</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter date"
              name="dptdate"
              value={dptdate}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="btn-container">
            <Button type="submit" className="btn btn-primary">Submit</Button>
            <Link className="btn btn-danger" to="/dashboard">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAppointment;
