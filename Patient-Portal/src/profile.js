import React, { useState, useEffect } from 'react';
import './profile.css';

function ProfilePage() {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        phoneNumber: '',
        email: '',
        password: '',
        dob: ''
    });

    const [editable, setEditable] = useState(false);

    useEffect(() => {
        // Simulate retrieving data from backend
        const fetchDataFromBackend = () => {
            // Replace this with actual API call to retrieve data from backend
            const mockData = {
                name: 'John Doe',
                gender: 'male',
                phoneNumber: '1234567890',
                email: 'johndoe@example.com',
                password: '********',
                dob: '1990-01-01' // Format: YYYY-MM-DD
            };
            setFormData(mockData);
        };

        fetchDataFromBackend();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, e.g., send data to backend
        console.log(formData);
    };

    const handleEditClick = () => {
        setEditable(true);
    };

    return (
        <div className="profile-content">
            <h2 style={{ textDecoration: 'underline', textAlign: 'center' }}>Profile</h2>
            <form onSubmit={handleSubmit}>
                <h3>Basic Info</h3>
                <div className="basic-info">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        readOnly={!editable}
                        required
                    />
                    <input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        value={formData.dob}
                        onChange={handleChange}
                        readOnly={!editable}
                        required
                    />
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        readOnly={!editable}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        readOnly={!editable}
                    />
                </div>
                <h3>Contact Info</h3>
                <div className="contact-info">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly={!editable}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        readOnly={!editable}
                    />
                </div>
                <div className="button-container">
                    <button type="button" onClick={handleEditClick} className="edit-btn">Edit</button>
                    <button type="submit" className="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ProfilePage;
