import React, { useState } from 'react';
import '../Sidebar/sidebar.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Sidebar = () => {
  // Create a state variable 'isOpen' and a function 'setIsOpen' to update it.
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOutWithFetch = async () => {
    try {
      const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch('http://localhost:8000/api/users/logOut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include', // Important for sending cookies
      });

      const responseData = await response.json();

      console.log('Response status:', response.status);
      console.log('Response data:', responseData);

      if (response.ok) {
        console.log('Logged out successfully');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      } else {
        console.error('Logout failed:', responseData);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Function to toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the state between true and false
  };

  const goProfile=()=>{
    navigate('/Profile');
  }

const goFunds=()=>{
navigate('/Funds')
}


  return (
    <div>
      {/* Hamburger icon to toggle sidebar */}
      <FaBars className={`hamburger-icon ${isOpen ? 'transparent' : ''}`}  onClick={toggleSidebar} />
      
      {/* Sidebar with dynamic class names */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
          <div className="sidebar-item" onClick={goProfile}>Profile</div>
          <div className="sidebar-item" onClick={goFunds}>Funds</div>
          <div className="sidebar-item">Another Column</div>
        </div>
        <div className='btn-container'>
          <button className="btn" onClick={handleLogOutWithFetch}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
