import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../changePassword/ChangePass.css"

const ChangePass = () => {
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInput = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        });
    };

    const changePassword = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setError('No access token found. Please reset your password again.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8000/api/users/ChangePass', {
                newPassword: password.newPassword,
            }, {
                headers: { "Authorization": `Bearer ${accessToken}` },
                withCredentials: true
            });
    
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred while changing the password.');
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.newPassword !== password.confirmPassword) {
            setError('Password and Confirm Password must be the same');
            return;
        }
        changePassword();
    };

    return (
        <div>
      <form className="form-container" onSubmit={handleSubmit}>
      <p className="title">Enter the new password</p>
      {error && <p className='error'>{error}</p>}               
      
                <input
                    type="password"
                    placeholder="New Password"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={handleInput}
                    required
                     className='newPassword input'
                />
          
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={password.confirmPassword}
                    onChange={handleInput}
                    required
                     className='confirmPass input'
                />
                
               
            <button type="submit" className='btnn' onClick={handleSubmit}>Change Password</button>
        </form>
       
    </div>
    );
};



export default ChangePass;
