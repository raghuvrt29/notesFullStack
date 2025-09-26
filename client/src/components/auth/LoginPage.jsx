import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/authSlice';
import api from '../../axios/api';
import './auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };
    try{
      const response = await api.post('/login', loginData);
      if(response.status === 200){
        dispatch(setUser({username: email, token: response.data.token}));
        navigate('/');
      }
    }
    catch(error){
      console.error('Login failed:', error);
    }
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
