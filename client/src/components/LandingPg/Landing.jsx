import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cash from '../LandingPg/cash.mp4'
// import '../LandingPg/landing.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import  Button  from "@mui/material/Button";

const Landing=()=>{

    const navigate=useNavigate();
    useEffect(() => {
        // Side effects can be placed here
      }, []);
    const goLogin=()=>{
        navigate("/login");
    }
    const goReg=()=>{
        navigate("/register")
    }
    // const bull = (
    //     <Box
    //       component="span"
    //       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    //     >
    //       •
    //     </Box>
    //   );

        return (
            <>
            <div style={{ backgroundColor: 'transparent' }}>
            <Card sx={{ maxWidth: 345, backgroundColor: 'white' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
               Hello User
              </Typography>
              <Typography variant="body2" color="text.primary">
              Welcome to Casino! 🎉

Get ready to play, bet, and win big. Your adventure starts now—let the games begin!

Good luck! 🍀
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" onClick={goLogin} >Existing User</Button>
              <Button size="medium" onClick={goReg}>New User</Button>
            </CardActions>
          </Card>
          </div>
          </>
        );
      }
    
export default Landing;