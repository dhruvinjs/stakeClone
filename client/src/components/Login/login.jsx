import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login/login.css';
import Cookies from 'js-cookie';
import starsVideo from '../Login/stars.mp4'


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('/api/users/login', { username, password });

      if (response.status !== 200) {
        throw new Error('Login failed. Check your credentials.');
      }

      if (!response.data) {
        throw new Error('No response data');
      }

      const refreshToken = response.data.refreshToken;
      const accessToken = response.data.accessToken;

      if (!accessToken || !refreshToken) {
        throw new Error('No tokens found in response');
      }

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Invalid credentials. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData.username, formData.password);
  };

  const changepass = (e) => {
    e.preventDefault();
    navigate('/Resetmail');
  };


    return (
      <div className="form-container">
        <video autoPlay muted loop className="background-video">
          <source src={starsVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <form className='form-container'onSubmit={handleSubmit}>
          <p className="title">Login Form</p>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="username input"
            aria-label="Username"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="password input"
            aria-label="Password"
          />
          <button type="submit" className="butn">
            Login
          </button>
          <button type="button" className="butn forgot-butn" onClick={changepass}>
            Forgot password
          </button>
        </form>
      </div>
    )
  };
    

export default Login;
