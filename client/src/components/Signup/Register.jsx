import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Signup/Reg.css'; // Adjust the path as needed
// import Login from '../Login/login.jsx';

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: '',
    age: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    country: '',
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled out
    if (!data.name || !data.username || !data.email || !data.password || !data.country) {
      alert('Please fill out all required fields.');
      return;
    }

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      setError('Password and Confirm Password must be the same');
      return;
    }

      try {
        const apiUrl = 'http://localhost:8000'; // Replace with your actual API URL
      const axiosInstance = axios.create({
        timeout: 12000, // Wait for 12 seconds before timing out
      });

      const response = await axiosInstance.post(`${apiUrl}/api/users/register`, data);
      console.log(response.data); // Log successful registration response

      // Redirect to login page after successful registration
      navigate('/Login');
    } catch (error) {
      console.error('Registration error:', error);

      // Handle specific server validation errors (e.g., duplicate username, invalid email format)
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // Display server error message
      } else {
        setError('Registration failed. Please try again.'); // Display generic error message
      }
    }
  };

  const gologin=()=>{
    navigate('/Login')
  }

  return (
    <div>
      <div className="container">
        <form className='form-container' onSubmit={handleSubmit}>
          <p className="title">Registration Form</p>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={handleInput}
            required
            className='name input'
          />
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={data.age}
            onChange={handleInput}
            required
            className='age input'
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleInput}
            required
            className='email input'
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={data.country}
            onChange={handleInput}
            required
            className='country input'
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={data.username}
            onChange={handleInput}
            required
            className='username input'
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleInput}
            required
            className='password input'
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleInput}
            required
            className='confirmPassword input'
          />
          <button className="btn" type="submit">Register</button>
          <button className="btn" type="submit" onClick={gologin}>Go to Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
