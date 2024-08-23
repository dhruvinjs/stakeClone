import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../Funds/EnterAmt.css';
import axios from "axios";


const EnterAmt=()=>{
        
    const [data,setData]=useState({
        amount:0,
        upiId:"",
    })

    const handleInput=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
        // const amount=parseInt(e.target.amount.value);
       
    }

    const addMoney=async()=>{
        const token=localStorage.getItem('accessToken');
        // const amount=parseInt(e.target.amount.value);
        const res=await axios.put('http://localhost:8000/api/users/Invest', { amount: data.amount},{
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${token}`
            }
        })
        if(res.status===200){
            navigate('/Request');
        }
    }
    



    const navigate=useNavigate();
            const handleSubmit=async(e)=>{
                e.preventDefault();
            addMoney()

        }
    return (

        <>
        <div className="form-container">
        <form  onSubmit={handleSubmit}>
        <p className="title">Enter the Amount</p>
      {/* {error && <p className='error'>{error}</p>}                */}
    
                <input
                    type="number"
                    placeholder="Enter amount"
                    name="amount"
                    value={data.amount}
                    onChange={handleInput}
                    required
                     className='amount input'
                />
                      <input
                    type="email"
                    placeholder="Enter Valid UPI ID"
                    name="upiId"
                    value={data.upiId}
                    onChange={handleInput}
                    required
                     className='upiId input'
                />
  <button className="btn" type="submit">
Invest
   </button>
            </form>
        </div>
        
        
        
        </>
    )
}
export default EnterAmt;