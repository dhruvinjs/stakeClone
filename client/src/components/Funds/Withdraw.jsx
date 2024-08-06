import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const WithdrawAmt=()=>{
    const [data, setData] = useState(
        {
            amount:0,
            upiId:"",
        }
    );
    const navigate = useNavigate();
    const [error, setError] = useState("");


    const handleInput=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const [success,setSuccess]=useState(null)

    const withdraw=async()=>{
        const token=localStorage.getItem('accessToken')
        if(!token){
            setError("Please login first");
        }
        try {
            const res=await axios.patch('api/users/Withdraw',{amt:data.amount},{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            if(res.status===200){
                setSuccess("Amt withdrawn successfully")
            }
            
        } catch (error) {
            setError(error)
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        withdraw();
    }

    return (
        <>
        
        <div className="form-container">
        <p>Note=We are gonna deduct 20% from your withdrawal amount as a platform fee</p>
        <form  onSubmit={handleSubmit}>
           
        <p className="title">Enter the Amount</p>
      {error && <p className='error'>{error}</p>}               
    
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
                         <p>Withdraw!</p>
                            </button>
                 {success && <p className='success'>{success}</p>}         
            </form>
        </div>
        
        
        
        </>
    )
}
export default WithdrawAmt;
