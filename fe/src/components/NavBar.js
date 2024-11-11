import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/Navbar.css';
import SignOutButton from '../components/SignOutButton';  // Import SignOut button component

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated when the component mounts and on token change
  useEffect(() => {
    const token = localStorage.getItem('token');  // Look for token in local storage
    setIsAuthenticated(!!token);  // Set authentication state based on token presence
  }, []); // Empty dependency array so this only runs once

  // Function to handle login (update the state)
  const handleLogin = () => {
    localStorage.setItem('token', 'someRandomToken');  // Simulate login (store token)
    setIsAuthenticated(true);  // Update the state immediately
  };

  // Function to handle logout (update the state)
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from local storage
    setIsAuthenticated(false);  // Update the state immediately
  };

  return (
    <nav className="navbar">
      <ul>
        {/* Home link */}
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>

        {/* Search link */}
        <li>
          <NavLink to="/Search" className={({ isActive }) => (isActive ? 'active' : '')}>
            Search
          </NavLink>
        </li>

        {/* My Greenhouse link (always shown) */}
        <li>
          <NavLink to="/greenhouse" className={({ isActive }) => (isActive ? 'active' : '')}>
            My Greenhouse
          </NavLink>
        </li>

        {/* Conditionally render Sign Out or Login/Register link */}
        <li>
          {isAuthenticated ? (
            <SignOutButton onSignOut={handleLogout} />  // Show SignOut button if authenticated
          ) : (
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              Login/Register  
            </NavLink>
          )}
        </li>

        {/* Sensor Data link */}
        <li>
          <NavLink to="/sensor-data" className={({ isActive }) => (isActive ? 'active' : '')}>
            Sensor Data
          </NavLink>
        </li>

        {/* Calendar link */}
        <li>
          <NavLink to="/calendar" className={({ isActive }) => (isActive ? 'active' : '')}>
            Calendar
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
