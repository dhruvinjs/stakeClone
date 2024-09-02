import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import ProductHeroLayout from './ProductHeroLayout';
import casino from './casino.jpg'
import CasinoImgLayout from './CasinoImg';
import Disclaimer from './Disclaimer';

const backgroundImage =
 casino

export default function FirstImg() {
  return (
    <>  
    <Disclaimer/>
    <CasinoImgLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
   
        {/* Increase the network loading priority of the background image. */}
      
  
      <Typography color="inherit" align="center" variant="h2" marked="center">
      "Play Smart, Win Big, Live Large."
      </Typography>
      <Typography
        color='inherit'
        align="center"
        variant="h3"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
       Don't miss out on massive rewards ! Play now and make every game count!
      </Typography>
     
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>
  </CasinoImgLayout>
      </>
      
    
  );
}