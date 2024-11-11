import React, { useState } from 'react';
import Login from '../components/Login';
import Registration from '../components/Registration';
import "../assets/styles/Registration.css"

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration

  return (
    <div className="login-registration-page">
      <div className="form-toggle-buttons">
        <button
          className={`toggle-button ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`toggle-button ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <div className="form-container">
        {isLogin ? <Login /> : <Registration />}
      </div>
    </div>
  );
};

export default LoginPage;
