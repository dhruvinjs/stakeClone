import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Admin/Admin.css';

const AdminData = () => {
    const [users, setUsers] = useState([]);

    const showAllUsers = async () => {
        try {
            const response = await axios.get('/api/users/adminData');
            if (response.status === 200) {
                setUsers(response.data.data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        showAllUsers();
    }, []);

    return (
        <div className="admin-container">
            <div className="multi-container">
                <div className="card winners" draggable="true">
                    <h2>Winners</h2>
                    {/* Content for winners goes here */}
                </div>
                <div className="card losers" draggable="true">
                    <h2>Losers</h2>
                    {/* Content for losers goes here */}
                </div>
            </div>
            <div className="single-container">
                <span className="title">ALL users</span>
                <div className="all-users" draggable="true">
                    <div className="cell-header">
                        <div className="cell">Name</div>
                        <div className="cell">Invested</div>
                        <div className="cell">Age</div>
                        <div className="cell">Country</div>
                        <div className="cell">Email</div>
                    </div>
                    {
                        users.length > 0 ? (
                            users.map(user => (
                                <div key={user._id} className="row">
                                    <div className="cell">{user.name}</div>
                                    <div className="cell">{user.invested}</div>
                                    <div className="cell">{user.age}</div>
                                    <div className="cell">{user.country}</div>
                                    <div className="cell">{user.email}</div>
                                </div>
                            ))
                        ) : (
                            <p className="no-data">Loading...</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminData;
