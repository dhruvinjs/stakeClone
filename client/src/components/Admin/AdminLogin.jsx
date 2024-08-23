import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/login';
import axios from 'axios';
const AdminLogin=()=>{
   const role="Admin"
   const credentials="Email"
//    const goSumbit=(e)=>{
//     e.preventDefault();
//     authLogin(email,password)
//    }

//    const navigate=useNavigate()

  
   const authLogin=(email,password)=>{
   try {
    console.log(data)
     const res=axios.post('/api/users/Admin/Login',{email,password})
     if(res.status===200){
         console.log(res.data)
         navigate('/AdminHome')
     }
   } catch (error) {
    console.log(error)
   }
   }


return(
    <>
    <Login role="Admin" credentials="Email"/>
    </>
)
}
export default AdminLogin