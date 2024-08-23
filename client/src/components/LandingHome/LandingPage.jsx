import React from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Features from './Features.jsx';
import FirstImp from './FirstImp.jsx';
import { Review } from './Review.jsx';
import { useEffect } from 'react';
const LandingPage=()=>{
    const navigate=useNavigate();
    useEffect(() => {
        // Side effects can be placed here
      }, []);
    const goLogin=()=>{
        navigate("/login");
    }
return(
    <>
  
        <FirstImp/>

    <Features/>
<br/>
  <Review/>
    </>
)
}
export default LandingPage;