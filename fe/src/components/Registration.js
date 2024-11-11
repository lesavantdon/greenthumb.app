import React, { useState } from 'react';
import '../assets/styles/Registration.css';

import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState(null);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistrationSuccess = (response) => {
    if (response.status === 201) {
      // Show success message or redirect
      alert('Registration successful! Please log in.');
      window.location.href = '/login';  // Redirect to login page
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);

      if (res.data.token) {
        // Store JWT token in localStorage
        localStorage.setItem('token', res.data.token);

        // Handle successful registration
        handleRegistrationSuccess(res);  // Call success handler directly
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="registration-form-container">
      <form style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px' }} onSubmit={handleSubmit} className="registration-form">
        <h2>Register</h2>

        {/* Name Field */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          required
          autoComplete='Name'
        />

        {/* Username Field */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Choose a username"
          required
          autoComplete='username'
        />

        {/* Email Field */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
          autoComplete='Email'
        />

        {/* Phone Number Field */}
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          required
          autoComplete='Phone Number'
        />

        {/* Password Field */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Choose a password"
          required
          autoComplete="current-password"
        />

        {/* Error Message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
