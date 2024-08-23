import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import '../Games/guessnum.css';
import { useLocation } from "react-router-dom";
import axios from "axios";

const Guessnum = () => {
  const location = useLocation();
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [hint, setHint] = useState("");
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [error, setError] = useState("");
  const [chances, setChances] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [betMultiplier, setBetMultiplier] = useState(1);
  const [betAmount, setBetAmount] = useState(location.state?.betAmount);
  const [hintVisible, setHintVisible] = useState(false);
  const [player, setPlayerdata] = useState(null);
  const [deductedAmt, setdeductedAmt] = useState(0); // Initialize to 0
  const [minUnits, setminunits] = useState(600);
  const [newUnits, setNewUnits] = useState(null);
  const [showPrompt, setshowPrompt] = useState(false);
  const [unitsTaken,setUnitsTaken]=useState(false);


  const handleHint = (e) => {
    e.preventDefault();
    const hintCost=20
    if (betAmount >= 20) {
      setHintVisible(true);
      setBetAmount(betAmount - hintCost);
      setdeductedAmt(deductedAmt + hintCost);
      setHint(`The number is ${number > 50 ? "greater" : "less"} than 50`); // Example hint
    } else {
      setHint("Not enough money for a hint");
    }
  };

  const handleMultiplierChange = (e) => {
    setBetMultiplier(Number(e.target.value));
  };

  const checkGuess = () => {
    if (Number(guess) === number) {
      setSuccess(true);
      const wonAmount = betAmount * betMultiplier;
      setBetAmount(betAmount + wonAmount); // Add won amount to bet amount
      Depositunits(wonAmount);
      setResult(`Congrats! You won ${wonAmount} units!`);
    } else if (Number(guess) < number) {
      setHint("Guess is low");
    } else if (Number(guess) > number) {
      setHint("Guess is high");
    }

    setChances(chances - 1);
    const guessDeduction = 100;
    setBetAmount(betAmount - guessDeduction);
    setdeductedAmt(deductedAmt + guessDeduction);

    if (chances <= 1) {
      setResult(`Game over! The number was ${number}`);
      setSuccess(false);
      setHint("");
      setGameOver(true);
      console.log(deductedAmt)
      // deductBalUnits();
    }
  };

  const newGame = () => {
    setGuess("");
    setSuccess(null);
    setHint("");
    setError("");
    setChances(5);
    setNumber(Math.floor(Math.random() * 100) + 1);
    setResult("");
    setHintVisible(false);
    setdeductedAmt(0); // Reset deducted amount
    setGameOver(false);
    checkMinUnits();
    addToProfit()
  };

  const handleGuess = (e) => {
    e.preventDefault();
   console.log(number)
      if(betAmount<=0){
        setError("You need to have at least 600 units to play");
        setshowPrompt(true);
      }
  
    if (Number(guess) < 1 || Number(guess) > 100) {
      setError("Number should be between 1 and 100");
      return;
    }

    checkGuess();
    setPrevGuess(guess);
  };

  const [prevGuess, setPrevGuess] = useState(null);

  const handleInputChange = (e) => {
    setGuess(e.target.value);
    setError("");
    setHintVisible(false); // Hide hint after each guess
    setHint(""); // Clear hint text
    console.log(`Deducted Amount: ${deductedAmt}`);
console.log(`Bet Amount: ${betAmount}`);
console.log(`Hint Visible: ${hintVisible}`);

  };

  const GetCurrentUser = async () => {
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
        setPlayerdata(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetCurrentUser();
  }, []);

const addToProfit=async()=>{
  const amt=deductedAmt;
const gameToken=localStorage.getItem('gameToken');
if(!gameToken){
  console.error("game token not found")
}

try {
  const resposne=await axios.put('http://localhost:8000/api/users/gameProfit',{amt},{
    headers:{
      'Authorization':`Bearer ${gameToken}`
    }
    });
    if(resposne.status===200){
      console.log('Profit Added');
    }
} catch (error) {
  console.log(error)
}
}

 

  const remUnits=async(amt,gameamt)=>{
    
    const id=1;
    if(amt>0){
      setError("The amount should be greater than 0");
    }
    if(unitsTaken)(
     setError("already taken remaining units")
    )
    const actoken = localStorage.getItem('accessToken');
    if (!actoken) {
      setError("token not found");
    }
    try {
      const res = await axios.put('/api/users/TakeRemUnits', { amt ,gameamt, id}, {
        headers: {
          'Authorization': `Bearer ${actoken}`
        }
      });
      if (res.status === 200) {
        
        setSuccess("Remaining units withdrawn " + amt);
        setSuccess("Are you sure? you can Win more")
        setBetAmount(0)
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const Depositunits = async (betAmount) => {
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
        setSuccess("Units Won " + amt);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goHome =async () => {
   const gameToken=localStorage.getItem('gameToken')
    try {
     const response=await axios.post('api/users/GameLogout',{},
      {
        headers:{
          'Authorization':`Bearer ${gameToken}`
        }
      }
     );
    
      if(response.status===200){
        localStorage.removeItem('gameToken')
     navigate('/home');}
    } catch (error) {
      console.log(error)
    }
  };

  const checkMinUnits = async () => {
    if (player?.data?.invested < minUnits) {
      setError("You don't have enough units to play this game. Please add units.");
      setshowPrompt(true);
    }
  };

  const addUnits = async (amt) => {
    const actoken = localStorage.getItem('accessToken');
    const id=1;
    if (!actoken) {
      setError("token not found");
    }
    try {
      const res = await axios.put('/api/users/Betunits', { amt ,id}, {
        headers: {
          'Authorization': `Bearer ${actoken}`
        }
      });
      if (res.status === 200) {
        console.log("money added can now play");
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const playGame = async () => {
    const balance = player?.data?.invested;
    
   if(newUnits<0){
    setError("You can't bet a negative amount of units.");
   }
   else if( balance<minUnits){
    alert("Failed to add units because balance is insufficient");
    return;
  
   }
   const res=await addUnits(newUnits)
   if(res){
    setshowPrompt(false);
    setBetAmount(newUnits);
   }};

  const handleNewUnits = (e) => {
    setNewUnits(e.target.value);
  };

  const openPrompt = () => {
    setshowPrompt(true);
  };
  return (
    <div >
      <div className="form-Container">
        {player && <p className="title">Username: {player ? `${player.data?.name}` : 'Player data Not found'}</p>}
            <p className="title">Purse:{player ? `${player?.data?.invested}`:"Loading"}</p>  
        <span className="title">Number Guessing Game</span>
        <div className="bet-options">
          <label>
            <input
              type="radio"
              name="multiplier"
              value={2}
              checked={betMultiplier === 2}
              onChange={handleMultiplierChange}
              disabled={gameOver}
            />
            2x
          </label>
          <label>
            <input
              type="radio"
              name="multiplier"
              value={3}
              checked={betMultiplier === 3}
              onChange={handleMultiplierChange}
              disabled={gameOver}
            />
            3x
          </label>
          <label>
            <input
              type="radio"
              name="multiplier"
              value={5}
              checked={betMultiplier === 5}
              onChange={handleMultiplierChange}
              disabled={gameOver}
            />
            5x
          </label>
        </div>
        <div className="guess-section">
        <input
          id="guessnum"
          name="guessnum`"
          type="number"
          value={guess}
          onChange={handleInputChange}
          placeholder="Enter guess num"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

          <br />
          <FontAwesomeIcon icon={faLightbulb} className="hint-icon" onClick={handleHint} />
          {hintVisible && <p className="hint">{hint}</p>}
          {prevGuess && <span className="prev-guess">Previous Guess: {prevGuess}</span>}
          <p className="chances">Chances remaining: {chances}</p>
          <p className="money">Money: {betAmount} UNITS</p>
          {result && <p className="result">{result}</p>}
          {success && <p className="result">{success}</p>}
          {!gameOver && (
            <button onClick={handleGuess} className="btn">
              Submit Guess
            </button>
          )}
        </div>
        {result && (
          <button onClick={newGame} className="btn new-game-btn">
            Start New Game
          </button>
        )}
        <button onClick={goHome} className="btn new-game-btn">Go to Home</button>
        <button onClick={openPrompt} className="btn new-game-btn">Add Units</button>
        {showPrompt && (//if showPrompt value is true then it will open and aks for money
          <div className="prompt-overlay">
            <div className="prompt-box">
              <h3>Enter your bet amount</h3>
              <input
                placeholder='Min Bal=600'
                type="number"
                value={newUnits}
                onChange={handleNewUnits}
                min="600"
              />
              <button onClick={playGame}>Add units</button>
              <button onClick={goHome}>Don't want to play</button>
            </div>
          </div>
        )}
         <button className="btn" onClick={()=>remUnits(betAmount,deductedAmt)}>Take Remaining Units</button>
      </div>
    </div>
  );
};

export default Guessnum;
