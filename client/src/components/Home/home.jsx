import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home/home.css';
// import { makeStyles } from '@mui/styles';
import axios from 'axios';
// import ChangePass from  "../changePassword/ChangePass.jsx"
import { useState } from 'react';
import { useEffect } from 'react';
import Sidebar from "../Sidebar/Sidebar.jsx";
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';




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



const deductBetUnits=async(amt)=>{
  // var money=player.data?.invested;
  const id=1;//passing a default id assigned for the game 
  const actoken=localStorage.getItem('accessToken');
if(!actoken){
  setError("token not found")
}
try {
  const res=await axios.put('/api/users/Betunits',{amt ,id },{
  headers:{
    'Authorization':`Bearer ${actoken}`
  }
  })
  const gameToken=res.data?.gameToken;
  localStorage.setItem('gameToken',gameToken)
  if(res.status===200){
console.log("money deducted go to guess");

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

    <>    <Sidebar />
    <Typography variant="h4" component="div">
        Welcome {user ? user.data?.name : 'Loading'}
    </Typography>
    <br />
    <Typography variant="h4" component="div">
        Purse {user ? user.data?.invested : 'Loading'}
    </Typography>
    <Card sx={{ maxWidth: 450, backgroundColor: 'white', padding: '16px' }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                GuessMaster 100
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
                Guess the number between 1-100 and win the lottery
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Test your luck and skill in the ultimate number guessing game!  
                Choose your bet multiplier—2x, 3x, or 5x and guess the secret number between 1 and 100.  
                Use hints wisely, but remember, each hint costs $20!  
                Win big by guessing correctly and climb the leaderboards.  
                With fast-paced rounds and endless challenges, GuessMaster 100 will keep you hooked!
            </Typography>
        </CardContent>
        <Button
            size="medium"
            onClick={openPrompt}
            sx={{
                display: 'block',
                fontSize: '18px',
                margin: '16px auto 0',
                ":hover": { backgroundColor: 'purple' }
            }}
        >
            Play game
        </Button>
    </Card>
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
                <button onClick={goGuess}>Play Now</button>
                <button onClick={closePrompt}>Cancel</button>
            </div>
        </div>
    }

</>
      // {/* <button onClick={goProfile} className='btn'>PROFILE</button>  */}
      // {/* <button onClick={handleLogOutWithFetch} className='btn'>Logout with API</button> */}

  

);
}
export default Home;
