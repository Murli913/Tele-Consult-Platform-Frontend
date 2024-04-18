import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AreaTableAction from './AreaTableAction';
import './AreaTable.scss';
import { useNavigate } from 'react-router-dom';

const AreaTable = () => {
    const navigate = useNavigate();
    const [callHistory, setCallHistory] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        fetchCallHistoryForToday();
    }, []);

    const fetchCallHistoryForToday = async () => {
      try {
          const response = await axios.get('http://localhost:8080/callhistory/today', {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
              }
          });
          setCallHistory(response.data);
      } catch (error) {
          console.error('Error fetching call history:', error);
      }
  };
  

    return (
        <section className="content-area-table">
            <div className="data-table-info">
                <h4 className="data-table-title">Today's Appointments</h4>
            </div>
            <div className="data-table-diagram">
                <table>
                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>Call_Time</th>
                            <th>Call_Date</th>
                            <th>End_Time</th>
                            <th>Prescription</th>
                            <th>Doctor-ID</th>
                            <th>Patient-ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {callHistory.map(history => (
                            <tr key={history.id}>
                                <td>{history.id}</td>
                                <td>{history.callTime}</td>
                                <td>{history.callDate}</td>
                                <td>{history.endTime}</td>
                                <td>{history.prescription}</td>
                                <td>{history.doctor.id}</td>
                                <td>{history.patient.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AreaTable;
