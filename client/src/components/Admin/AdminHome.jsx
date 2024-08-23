import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './AdminHome.css';
// import AdminSidebar from '../Sidebar/AdminSidebar.js';
import {AdminSidebar} from '../Sidebar/AdminSidebar.jsx';
import Revenue from './Revenue.jsx';

const Admin = () => {
//   const [profile, setProfile] = useState({ name: 'Admin', imageUrl: 'path_to_default_image.jpg' });
  const [data, setData] = useState({ profit: 0, loss: 0, bets: 0, users: 0 });
  const [chartData, setChartData] = useState({});
  // const getGamesData=()=>{
  //   const response=axios.post
  // }


  return (
    <div className="Admin">
    <AdminSidebar />
    <div className="content">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>
      <nav className="admin-nav">
        <ul>
          <li>Home</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </nav>
      <div className="grid">
        <div className="grid-item">Loss: </div>
        <div className="grid-item">Profit: </div>
        <Revenue/>
        <div className="grid-item">Total Bets:</div>
        <div className="grid-item">Total Users:</div>
      </div>
      <div className="chart-container">
        {/* <Bar data={chartData} options={{ responsive: true }} /> */}
      </div>
    </div>
  </div>
);
}
export default Admin;