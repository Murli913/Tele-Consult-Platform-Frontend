
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const EditDoctor = () => {
    let navigate = useNavigate();

    const { id } = useParams();
  
    const [doctor, setDoctor] = useState({
      name: "",
      gender: "",
      phoneNumber: "",
      status: "",
    });

  
    const { name, gender, phoneNumber, status } = doctor;
  
    const onInputChange = (e) => {
      setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };
  
    useEffect(() => {
      loadUser();
    }, []);
  
    const onSubmit = async (e) => {
      e.preventDefault();
      await axios.put(`http://localhost:8080/doctor/doctors/${id}`, doctor);
      navigate("/dashboard");
    };
  
    const loadUser = async () => {
      const result = await axios.get(`http://localhost:8080/doctor/doctor/${id}`);
      setDoctor(result.data);
    };













  return (
    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Edit Doctor details </h2>

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
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Status
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Status of senior doctor"
              name="status"
              value={status}
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
  )
}

export default EditDoctor