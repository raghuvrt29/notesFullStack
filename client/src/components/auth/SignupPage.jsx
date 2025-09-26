import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/authSlice';
import api from '../../axios/api';
import './auth.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const signupData = { name, email, password };
    
    try {
        const response = await api.post('/signup', signupData);
        if (response.status === 201 || response.status === 200) {
            navigate('/login');
        }
    } catch (error) {
        console.error('Signup failed:', error);
        setError(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <div className="userForm">
          <input
            className="loginInput"
            type="text"
            id="name"
            name="name"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <div style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          <button
            className="loginButton"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;
