import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login/login.css';
import Cookies from 'js-cookie';
import starsVideo from '../Login/stars.mp4'


const Login = ({role,credentials}) => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const endpoint=role==='Admin'? "/api/users/Admin/Login" : 'api/users/login'
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const getData=()=>{
  if(role==='Admin'){
    return({
      email:formData.username,
      password:formData.password
    })
  
  }
  else{
    return({
      username:formData.username,
      password:formData.password
    })
  }
}


  const handleLogin = async () => {
    try {
      const data=getData();
      console.log(data)
      const response = await axios.post(endpoint, data);
      if (response.status !== 200) {
        throw new Error('Login failed. Check your credentials.');
      }

      if (!response.data) {
        throw new Error('No response data');
      }
    if(role==='Admin'){
      const adminRefToken=response.data?.token
      if(!adminRefToken){
        throw new Error('No refresh token of admin')
      }
      localStorage.setItem('adminRefToken', adminRefToken);
    }
    else{
      const refreshToken = response.data.refreshToken;
      const accessToken = response.data.accessToken;

      if (!accessToken || !refreshToken) {
        throw new Error('No tokens found in response');
      }
    
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);}
const destination=role==='Admin'?'/Adminhome' :'/home'
navigate(destination);
    } catch (error) {
      console.error(error);
      setError(error.message || 'Invalid credentials. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const changepass = (e) => {
    e.preventDefault();
    navigate('/Resetmail');
  };


    return (
      <div className="frcontainer">
      
        <form onSubmit={handleSubmit}>
          <p className="title">{role} Login Form</p>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            name="username"
            placeholder={credentials || "Username"}
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
