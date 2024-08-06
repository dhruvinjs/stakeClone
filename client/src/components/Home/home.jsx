import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home/home.css';

import axios from 'axios';
import ChangePass from  "../changePassword/ChangePass.jsx"
import { useState } from 'react';
import { useEffect } from 'react';
import Sidebar from "../Sidebar/Sidebar.jsx";



const Home = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const[showPrompt,setPrompt]=useState(null);
  const [user, setUser] = useState(null);
  // const [success,setSuccess]=useState(null);
  const [betAmount,setBetAmount]=useState('');
  
    const goProfile=()=>{
    navigate('/Profile');
  }
const withdrawAmt=()=>{
navigate('/Withdraw')
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

const openPrompt=()=>{
  setPrompt(true)
}
const closePrompt=()=>{
  setPrompt(false);
}


//   const handleLogOutWithFetch = async () => {
//   try {
//     const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

//     if (!accessToken) {
//       throw new Error('No access token found');
//     }

//     const response = await fetch('http://localhost:8000/api/users/logOut', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`,
//       },
//       credentials: 'include', // Important for sending cookies
//     });

//     const responseData = await response.json();

//     console.log('Response status:', response.status);
//     console.log('Response data:', responseData);

//     if (response.ok) {
//       console.log('Logged out successfully');
//       Cookies.remove('accessToken');
//       Cookies.remove('refreshToken');
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//       navigate('/login');
//     } else {
//       console.error('Logout failed:', responseData);
//     }
//   } catch (error) {
//     console.error('Logout error:', error);
//   }
// };

const deductBetUnits=async(amt)=>{
  // var money=player.data?.invested;
  const actoken=localStorage.getItem('accessToken');
if(!actoken){
  setError("token not found")
}
try {
  const res=await axios.put('/api/users/Betunits',{amt},{
  headers:{
    'Authorization':`Bearer ${actoken}`
  }
  })
  if(res.status===200){
console.log("money deducted go to guess");
// console.log(player.data?.invested)
return true; 
  }
 
} catch (error) {
 console.log(error) 
}
}
 
const goGuess=async()=>{
console.log(user.data.invested)
let balance=user.data.invested;
if(balance>=600){
  const success=await deductBetUnits(betAmount)
  if (success) {
    navigate('/Guessnum', { state: { betAmount } });
  } 
} else {
  alert("Insufficient balance! Can't play this game")
}

}

const handleBet=(e)=>{
  setBetAmount(e.target.value);
}

  return (

    <div className="home-container">
    <Sidebar />
    <div className="main-content">
        <span className="title">
          Welcome {user ? `${user.data?.name} `: 'Loading...'}
        </span>
        <span className="title">
          Balance {user ? `${user.data?.invested}`:'Loading...'}
          </span>
      <div className="box">
        <div className="card">
 <div className="image"></div>

    <a href="#">
      <span className="content">
       Guesss the num and win lottery 
      </span>
    </a>

    <p className="desc">
    Test your luck and skill in the ultimate number guessing game! 
    <br></br>
    Choose your bet multiplier—2x, 3x, or 5x
    <br></br>
    and Guess the secret number between 1 and 100. 
    <br></br>
    Use hints wisely, but remember, each hint costs $20!
    <br></br> 
    Win big by guessing correctly and climb the leaderboards.
    <br></br>
    With fast-paced rounds and endless challenges,
    <br></br>
    GuessMaster 100 will keep you hooked!
    </p>
    <span className='content'>
      Notice-Minimum 600 units req for this game
    </span>
    <button className="buttn" onClick={openPrompt} >
     Play
   </button>
   {showPrompt && 
 <div className="prompt-overlay">
 <div className="prompt-box">
   <h3>Enter your bet amount</h3>
   <input
   placeholder='Min Bal=600'
   type="number"
   value={betAmount}
   onChange={handleBet}
   min="600"
 />
   <button  onClick={goGuess}>Play Now</button>
   <button  onClick={closePrompt}>Cancel</button>
    </div>
    </div>
   }
  </div>
</div>
      </div>
      {/* <button onClick={goProfile} className='btn'>PROFILE</button>  */}
      {/* <button onClick={handleLogOutWithFetch} className='btn'>Logout with API</button> */}
    </div>
  

);
}
export default Home;
