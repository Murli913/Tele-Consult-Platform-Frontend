// import React, { useState } from 'react';
// import './PatientDetails.scss'; // Import the SCSS file for styling

// const PatientDetails = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [patients, setPatients] = useState([
//     // Sample patient data, replace it with your actual data
//     { name: 'John Doe', email: 'john@example.com', gender: 'Male', phoneNumber: '123-456-7890' },
//     // Add more patient objects as needed
//   ]);

//   // Function to handle search query change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Function to filter patients based on search query
//   const filteredPatients = patients.filter((patient) => {
//     return (
//       patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       patient.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       patient.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
//       // Add more fields to search as needed
//     );
//   });

//   return (
//     <div className="patient-details">
//       <h1>Patient Details</h1>
//       <div className="search-container">
//         <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search patients..." />
//         {/* Add a search icon button here if needed */}
//       </div>
//       <table className="patient-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Gender</th>
//             <th>Phone Number</th>
//             {/* Add more table headers as needed */}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredPatients.map((patient, index) => (
//             <tr key={index}>
//               <td>{patient.name}</td>
//               <td>{patient.email}</td>
//               <td>{patient.gender}</td>
//               <td>{patient.phoneNumber}</td>
//               {/* Add more table data as needed */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* Add more elements/components as needed */}
//     </div>
//   );
// };

// export default PatientDetails;
