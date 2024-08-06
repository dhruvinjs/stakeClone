import React from "react";
import { useNavigate } from "react-router-dom";
import '../Funds/funds.css';
import EnterAmt from "./EnterAmt.jsx";


const Funds=()=>{
    const navigate=useNavigate();
    const withdrawAmt=()=>{
        navigate('/Withdraw')
        }
        const investAmount=(e)=>{
            e.preventDefault()
            navigate('/EnterAmt')
          }



    return(
        <div className="funds">
        <button onClick={investAmount} className='btn'>Invest Amount</button>
        <button onClick={withdrawAmt} className='btn'>Withdraw Amt</button>
        </div>
    )
};
export default Funds;