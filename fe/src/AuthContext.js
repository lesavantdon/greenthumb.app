import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from local storage (if token exists)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data or decode token
      axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setUser(response.data);
        setIsAuthenticated(true);
      }).catch(() => {
        // If token is invalid, clear it
        localStorage.removeItem('token');
      });
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
