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
  };

  const handleGuess = (e) => {
    e.preventDefault();

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

  // const deductBalUnits = async () => {
  //   const amt = deductedAmt;
  //   const atoken = localStorage.getItem('accessToken');
  //   if (!atoken) {
  //     setError("token not found");
  //   }
  //   try {
  //     const res = await axios.patch('/api/users/DeductLostAmt', { amt }, {
  //       headers: {
  //         'Authorization': `Bearer ${atoken}`
  //       }
  //     });
  //     if (res.status === 200) {
  //       setSuccess("money Lost " + deductedAmt);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const remUnits=async(amt)=>{
    // const amt = betAmount;
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
      const res = await axios.put('/api/users/Depositunits', { amt }, {
        headers: {
          'Authorization': `Bearer ${actoken}`
        }
      });
      if (res.status === 200) {
        setSuccess("remaining units " + amt);
        setBetAmount(0)    
        setUnitsTaken(true) 
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const Depositunits = async (betAmount) => {
    const amt = betAmount;
    const actoken = localStorage.getItem('accessToken');
    if (!actoken) {
      setError("token not found");
    }
    try {
      const res = await axios.put('/api/users/Depositunits', { amt }, {
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

  const goHome = () => {
    navigate('/home');
  };

  const checkMinUnits = async () => {
    if (player?.data?.invested < minUnits) {
      setError("You don't have enough units to play this game. Please add units.");
      setshowPrompt(true);
    }
  };

  const addUnits = async (amt) => {
    const actoken = localStorage.getItem('accessToken');
    if (!actoken) {
      setError("token not found");
    }
    try {
      const res = await axios.put('/api/users/Betunits', { amt }, {
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
    <div className="card-container">
      <div className="form-Container">
        {player && <p className="title">{player ? `${player.data?.name}` : 'Player data Not found'}
          {player ? `${player?.data?.invested}`:"Loading"}</p>}
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
            type="number"
            placeholder="Enter Guess Number"
            value={guess}
            onChange={handleInputChange}
            required
            className="guess-input"
            disabled={gameOver}
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
        <button onClick={goHome}>Go to Home</button>
        <button onClick={openPrompt}>Add Units</button>
        {showPrompt && (
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
         <button className="btn" onClick={()=>remUnits(betAmount)}>Take Remaining Units</button>
      </div>
    </div>
  );
};

export default Guessnum;
