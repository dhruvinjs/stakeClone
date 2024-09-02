import React, { useState, useEffect,useCallback} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";




const NewGuess=()=>{
    const navigate=useNavigate()
    const location=useLocation();
    const [betAmount,setBetAmount]=useState(location.state?.betAmount);
    const [guessNumber,setGuessNumber]=useState("");
    const [deductedAmt,setdeductedAmt]=useState(0)
    const [balance,setBalance]=useState(location.state?.betAmount)
    const [lotteryNum,setNum]=useState(location.state?.genNum)
    const [hintVisible,setHintVisible]=useState(false)
    const [result, setResult] = useState("");
    const [chances,setChances]=useState(11)
    const[message,setMessage]=useState("All the best")
    const [multiplier,setBetMultiplier]=useState(2,3)//if the user selects 3x and if he loses then he will have to give 3x money
    const [hintCost,setHintCost]=useState(10)
    const [playerData,setPlayerData]=useState("")
    const [prevGuess,setPrevGuess]=useState([])
    const [hint,setHint]=useState("")
    const [gameOver,setGameOver]=useState(false)
    const [wonAmt,setWonAmt]=useState(0)
     const [internalCh,setInternalCh]=useState(chances-1)         

    const handleGuess=async(e)=>{
        e.preventDefault();
        console.log(lotteryNum)
        if(betAmount<=100){
            setMessage("Insufficient balance")
        }
        if (guessNumber ==="" ||guessNumber < 0 || guessNumber > 2000) 
          {
          setMessage("Enter a valid number between 1 and 2000");
          return;
        }
        console.log(guessNumber)
          checkGuess();
          setPrevGuess([...prevGuess, guessNumber]); // Keep track of previous guesses

        }



    const handleInputChange = (e) => {
        setGuessNumber(e.target.value);
      };
    
      const handleHint=(e)=>{
        e.preventDefault()
        if(betAmount>=20){
            setHintVisible(true)
            setBetAmount((prev)=>prev-20)
            setdeductedAmt((prev)=>prev+20)
        }
      }
  
    
    const GetCurrentUser = useCallback(async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError("token not found");
        }
        try {
          const res = await axios.get('/api/users/GetCurrentUser', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.status === 200) {
            setPlayerData(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      },[]);

      useEffect(()=>{
        GetCurrentUser();
      },[])
      
      const Dailybet = async (wonAmt) => {
        const token = localStorage.getItem('gameToken');
        const loss=wonAmt
        if (!token) {
            console.error("Token not found");
            return; // Exit function if token is not found
        }
        try {
            const res = await axios.post("/api/users/Dailybets", {
                lotterynum: lotteryNum,
                profit: deductedAmt,
                loss: loss,
                betted: balance
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.status === 200) {
               console.log("DOne")
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const checkGuess = useCallback(() => {
      if (Number(guessNumber) === lotteryNum) {
          setGameOver(true);
          const wonAmt = betAmount * multiplier;
          setWonAmt(wonAmt);
          setResult(`Congrats you won ${wonAmt}`);
          userWon(wonAmt)//admin face loss and user face profit
          Dailybet(wonAmt)
      } else {
          // Deduct 50 units on each wrong guess
          setdeductedAmt(prevDeductedAmt => prevDeductedAmt + 50);
          setBetAmount(prevBetAmount => prevBetAmount - 50);
          setInternalCh(prev=>prev-1)
          setChances(prevChances => prevChances - 1);
          setHint(guessNumber > lotteryNum ? "Guess is high, go low" : "Guess is low, go high");
          setHintVisible(false);
          console.log(deductedAmt)
          // Handle the last (11th) chance correctly
          if (internalCh<=1) {
              const remainingAmt = betAmount - 50;  // Remaining amount to be deducted on the last chance
              setdeductedAmt(prevDeductedAmt => prevDeductedAmt + remainingAmt);
              console.log(deductedAmt)
              setChances(prev=>prev-1);
             if (chances<=0) {
               setBetAmount(0);
                setChances(0)
               setGameOver(true);
               setMessage(`Game Over. The Number was ${lotteryNum}`);
               Dailybet(); // Call TakeProfit only once when the game is over
             }
          }
      }
  }, [lotteryNum, guessNumber, betAmount, multiplier, chances, gameOver, Dailybet]);
  
  

//********* */
const userWon=async(betAmount)=>{
  const token=localStorage.getItem('gameToken')
  const amt = betAmount;
  const id = 1;
  const actoken = localStorage.getItem('accessToken');
  if (!actoken) {
    setError("token not found");
  }
  try {
    const res = await axios.put('/api/users/Depositunits', { amt,id }, {
      headers: {
        'Authorization': `Bearer ${actoken}`
      }
    });
    if (res.status === 200) {
    console.log("loss added")
    }
  } catch (error) {
    console.log(error);
  }

}
// *********
//***** */
const newGame=()=>{
  // if(playGame)
  setGameOver(false)
  setGuessNumber()
  setChances(11);
  setInternalCh(10)
  setResult("");
  setHintVisible(false);
  setdeductedAmt(0); 

}

const goHome=async()=>{
    const token=localStorage.getItem('gameToken')
    if(!token){
        console.error("Token not found")
    }
    try {
        const response=await axios.post('api/users/GameLogout',{},
         {
           headers:{
             'Authorization':`Bearer ${token}`
           }
         }
        );
       
         if(response.status===200){
           localStorage.removeItem('gameToken')
        navigate('/home');}
       } catch (error) {
         console.log(error)
       }
}


return(
<div className="w-screen h-screen bg-gray-800 flex items-center justify-center text-white">
  <div className="flex flex-col items-center justify-center ">
    {message && (
      <div className="mt-6 text-center text-lg font-bold">
        {message} {lotteryNum}
      </div>
    )}
    <h1 className="text-4xl font-medium mb-4">Guess the Number</h1>
    <p className="text-lg mb-4 text-center">
      Purse {playerData.data?.invested}
    </p>
    <p className="text-lg mb-3 text-center">
      Guess a number between 1-2000. Place your bet and see if you win!
    </p>
    <p className="text-base font-serif text-center">
    "Note: If you select a multiplier (e.g., 2x or 3x), and win, you will receive the multiplied amount. 
    <br />
    If you lose, you will pay the multiplied amount."
    </p>
    {/* Radio buttons section */}

    <div className="flex flex-wrap justify-center">
    <div className="flex items-center me-4">
        <input id="red-radio" type="radio" value={multiplier}
        onClick={()=>setBetMultiplier(2)}
        name="2x" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        <label for="red-radio" className="ms-2 text-sm font-medium text-white dark:text-gray-300"
        >2x</label>
            
    </div>
    <div className="flex items-center me-4">
        <input id="green-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        <label for="green-radio" className="ms-2 text-sm font-medium text-white dark:text-gray-300">3x</label>
    </div>
  <br />
  <br />
    {/* Other components */}
    <div className="flex flex-col items-center w-full px-4">
      <input
        type="number"
        className="w-full p-3 mb-4 rounded-lg text-black"
        placeholder="Enter your guess"
        value={guessNumber || ""}
        onChange={handleInputChange}
        disabled={gameOver}
      />
      <div className="flex justify-center space-x-4 mb-4">
        <FontAwesomeIcon icon={faLightbulb} className="hint-icon" onClick={handleHint} />
        {hintVisible && (
          <p className="text-lg mb-6 text-center">
            Hint: {hint}
          </p>
        )}
      </div>
      <p className="text-lg mb-3 text-center">
        Chances {chances} Amt {betAmount} units
  Result={result}
</p>
{/* Display Previous Guesses Horizontally */}
<div className="flex flex-wrap justify-center space-x-4 mt-4">
  Prev guess: <br />
  {prevGuess.map((value, index) => (
    <p className="text-lg text-center" key={index}>
      {value}
    </p>
  ))}
</div>
   
    
      {/* <p className="text-lg  text-center">
      </p> */}
      <button
        className="w-full bg-green-600 text-white font-bold py-3 rounded-lg transition"
        onClick={handleGuess}
        disabled={gameOver}
      >
        Submit Guess
      </button>
      <br />
      <button className="bg-gray-700 w-96 text-white font-bold">
        New Game
      </button>
      <br />
      <button
        className="w-96 bg-blue-900 text-white font-bold py-3 rounded-lg transition"
        onClick={goHome}
      >
        Go home
      </button>
      <br />
      {/* <button
        className={`px-4 py-2 rounded-lg ${
          betAmount === 10 ? "bg-green-500" : "bg-green-700"
        } hover:bg-green-500 transition`}
      >
        Bet $10
      </button> */}
    </div>
  </div>
</div>
//   </div>
)
}
export default NewGuess;