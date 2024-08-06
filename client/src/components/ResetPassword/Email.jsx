import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../ResetPassword/Email.css";

const Resetmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({ email: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/Resetmail', email);
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.token);
        navigate('/ChangePass');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Enter email for resetting password</p>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email.email}
          onChange={handleChange}
          required
          className="email input"
          aria-label="email"
        />
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Resetmail;
