import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "./AddPatient.css";
const AddPatient = () => {
    let navigate = useNavigate();

    const [patient, setPatient] = useState({
      name: "",
      gender: "",
      phoneNumber: "",
    });
  
    const { name, gender, phoneNumber } = patient;
  
    const onInputChange = (e) => {
      setPatient({ ...patient, [e.target.name]: e.target.value });
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8080/patient/add", patient);
      toast.success("New Doctor add sucessfully");
      navigate("/dashBoard");
      toast.success("New Doctor add sucessfully");
    };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Patient</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                  Gender
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your gender"
                name="gender"
                value={gender}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
               phoneNumber
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your PHone Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/dashBoard">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPatient