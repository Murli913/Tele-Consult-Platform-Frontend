import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditPatient = () => {
    let navigate = useNavigate();

    const { id } = useParams();
  
    const [patient, setPatient] = useState({
      name: "",
      gender: "",
      phoneNumber: "",
     
    });

  
    const { name, gender, phoneNumber } = patient;
  
    const onInputChange = (e) => {
      setPatient({ ...patient, [e.target.name]: e.target.value });
    };
  
    useEffect(() => {
      loadUser();
    }, []);
  
    const onSubmit = async (e) => {
      e.preventDefault();
      await axios.put(`http://localhost:8080/patient/patient/${id}`, patient);
      navigate("/dashboard");
    };
  
    const loadUser = async () => {
      const result = await axios.get(`http://localhost:8080/patient/patient/${id}`);
      setPatient(result.data);
    };

  return (
    <div>
      <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Edit Patient details </h2>

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
          <Link className="btn btn-outline-danger mx-2" to="/dashboard">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  </div>
    </div>
  )
}

export default EditPatient
