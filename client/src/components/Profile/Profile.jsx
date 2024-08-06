import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const GetProfile=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState(null);
    const [error,setError]=useState(null);


    const changeCurrentPass=()=>{
        navigate('/ChangePass')
    }

    const getData=async()=>{
       try {
         var token=localStorage.getItem('accessToken');
         if(!token){
            setError("You are not logged in");
         }
         const response=await axios.get('/api/users/GetCurrentUser',{
             headers:{
                 'Authorization':`Bearer ${token}`
             }
         })
        if(response.status===200){
           
                      setUser(response.data);
                    } else {
                      setError('Failed to fetch user data');
                    }
                    console.log('Response data:', response.data);
        
       } catch (error) {
        setError(error)
       }
    }
    useEffect(() => {
        getData()
    },[]);
 
return(
    <div className="container">
    <div className="box">
      <span className="title">
        {error && <p> {error}</p>}
        {user ? `${user.data?.name} (${user.data?.email})` : 'Loading...'}
      </span>
      <div>
        {user ? (
          <>
            <strong>Username: {user.data?.username}</strong>
            <p>Country: {user.data?.country}</p>
            <p>Balance: ${user.data.invested}</p>
            <p>Total Winnings: ${user.data.winnings}</p>
            <p>Total Money Lost: ${user.data.lost}</p>
          </>
        ) : (
          <p>No user information available</p>
        )}
      </div>
    </div>
     <button onClick={changeCurrentPass} className='btn'>Change Current Password</button>
    
  </div>
);
}
export default GetProfile;