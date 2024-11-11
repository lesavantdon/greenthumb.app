import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login with:', username, password);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      console.log('Login response:', res.data);
      
      if (res.status === 200 && res.data.token) {
        // On success, store username in local storage or context for access across the app
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        console.log("Token and username stored:", res.data.token, res.data.username);

        // Redirect to the greenhouse page
        navigate('/greenhouse');
      } else {
        setError('Login failed. No token received.');
      }
      
    } catch (err) {
      console.error("Login error:", err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
