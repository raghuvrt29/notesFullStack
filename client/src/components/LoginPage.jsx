import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    const loginData = { email, password };
    console.log('Login data:', loginData);
    // Make API call or handle authentication
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <div className="userForm">
          <input
            className="loginInput"
            type="email"
            id="email"
            name="email"
            placeholder="Enter e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="loginInput"
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="loginButton"
            type="submit"
            value="Login"
          />
        </div>
      </form>
      <p>
        Do not have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default LoginPage;
