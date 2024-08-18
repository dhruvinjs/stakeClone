import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const GetProfile=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState(null);
    const [error,setError]=useState(null);


    const changeCurrentPass=()=>{
        navigate('/ChangePass')
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
 
return(
  <Card sx={{ maxWidth: 345 }}>
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
    {error}
    </Typography>
    <Typography variant="body2" color="text.secondary">
    {user ? (
          <>
            <strong>Username: {user.data?.username}</strong>
            <p>Country: {user.data?.country}</p>
            <p>Balance: {user.data.invested} Units</p>
            <p>Total Winnings: {user.data.winnings}Units</p>
            <p>Total Money Lost: {user.data.lost}Units</p>
            </>
        ) : (
          <p>No user information available</p>
        )}
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="medium" onClick={changeCurrentPass}>Change Current Password</Button>
    {/* <Button size="medium">Learn More</Button> */}
  </CardActions>
</Card>
);

}
export default GetProfile;