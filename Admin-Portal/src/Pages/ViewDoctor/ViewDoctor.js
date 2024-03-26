
import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import './ViewDoctor.css';
const ViewDoctor = () => {
    const [doctor, setDoctor] = useState({
        name: "",
        gender: "",
        phoneNumber: "",
        status: "",
      });
    
      const { id } = useParams();
    
      useEffect(() => {
        loadUser();
      }, []);
    
      const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/doctor/doctor/${id}`);
        setDoctor(result.data);
      };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Doctor Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Doctor id : {doctor.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {doctor.name}
                </li>
                <li className="list-group-item">
                  <b>Gender:</b>
                  {doctor.gender}
                </li>
                <li className="list-group-item">
                  <b>PhoneNumber:</b>
                  {doctor.phoneNumber}
                </li>
                <li className="list-group-item">
                  <b>Senior Doctor:</b>
                  {doctor.status}
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

export default ViewDoctor