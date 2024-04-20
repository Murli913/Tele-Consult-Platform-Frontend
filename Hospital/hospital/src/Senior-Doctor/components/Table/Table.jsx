import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdCall } from "react-icons/md";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BasicTable = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    const loadDoctorId = async () => {
      try {
        const email = localStorage.getItem("email");
        const result = await axios.get(`http://localhost:8080/doctor/by-email/${email}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        setDoctorId(result.data);
      } catch (error) {
        console.error('Error fetching doctor ID:', error);
      }
    };
    loadDoctorId();
  }, []);

  useEffect(() => {
    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId]);



  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}/today`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log("response", response);
     
        setAppointments(response.data);
       
      
    } catch (error) {
      console.error("Error fetching appointments: ", error);
    }
  };


  const makeStyle = (status) => {
    if (status === "Approved") {
      return {
        background: "rgb(145 254 159 / 47%)",
        color: "green",
      };
    } else if (status === "Pending") {
      return {
        background: "#ffadad8f",
        color: "red",
      };
    } else {
      return {
        background: "#59bfff",
        color: "white",
      };
    }
  };

  return (
    <div className="Table">
      <h3>Today's Appointments</h3>
      <br />
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Doctor Name</TableCell>
              <TableCell align="left">Patient Name</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {appointments.map((appointment) => (
              <TableRow
                key={appointment.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {appointment.doctor.name} {/* Assuming 'name' is the doctor's name */}
                </TableCell>
                <TableCell align="left">
                  {appointment.patient.name} {/* Assuming 'name' is the patient's name */}
                </TableCell>
                <TableCell align="left">
                  {appointment.callDate} {/* Assuming 'callDate' is the date of the appointment */}
                </TableCell>
                <TableCell align="left">
                  <span
                    className="status"
                    style={makeStyle(appointment.status)}
                  >
                    {appointment.status}
                  </span>
                </TableCell>
                <Button
               
                  align="left"
                  className="Details"
                >
                  <MdCall /> Call
                </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BasicTable;
