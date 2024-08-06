import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cash from '../LandingPg/cash.mp4'
import '../LandingPg/landing.css'

const Landing=()=>{

    const navigate=useNavigate();
    useEffect(() => {
        // Side effects can be placed here
      }, []);
    const goLogin=()=>{
        navigate("/login");
    }
    const goReg=()=>{
        navigate("/register")
    }

    return(
        <div className="form-container">
            <video autoPlay muted loop id="background-video">
      <source src={cash} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
            <h1 className="title">Welcome to our website</h1>
            <span className="title">Already have an account</span><button className="btn" onClick={goLogin}>Login</button>
            <span className="title">New user</span><button className='btn' onClick={goReg}>Register Here</button>
        </div>
    )
}
export default Landing;