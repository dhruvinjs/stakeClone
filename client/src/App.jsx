import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from '../src/components/Login/login.jsx'
import Register from '../src/components/Signup/Register.jsx'
import Home from './components/Home/home.jsx';
import EnterAmt from './components/Funds/EnterAmt.jsx';
import ChangePass from './components/changePassword/ChangePass.jsx';
import Resetmail from './components/ResetPassword/Email.jsx';
import ShowReq from './components/Funds/Request.jsx';
import AdminData from './components/Admin/Admin.jsx';
import Landing from './components/LandingPg/Landing.jsx';
import GetProfile from './components/Profile/Profile.jsx';
import WithdrawAmt from './components/Funds/Withdraw.jsx';
import Funds from './components/Funds/Funds.jsx';
import Guessnum from './components/Games/GuessNum.jsx';
import Admin from './components/Admin/AdminHome.jsx';

function App() {
  // const user=localStorage.getItem("token");
  return (    
  <>
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path='/Withdraw' element={<WithdrawAmt/>}/>

    <Route path='/Profile' element={<GetProfile/>} />
    <Route path="/register" element={<Register />} />
  <Route path="/home" element={<Home />} />
    <Route path='/login' element={<Login/>}/>
    <Route path="/ChangePass" element={<ChangePass />} />
    <Route path="/Resetmail" element={<Resetmail />} />
    <Route path="/EnterAmt" element={<EnterAmt/>}/>
    <Route path='/Request' element={<ShowReq />}/>
    <Route path='/Admin/Users' element={<AdminData/>}/>
    <Route path='/Funds' element ={<Funds/>}/>
    <Route path='/GuessNum' element={<Guessnum/>}/>
    <Route path='/Adminhome' element={<Admin/>}/>




    </Routes>

    </>
  )
}

export default App;
