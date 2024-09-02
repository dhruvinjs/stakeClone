  import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Disclaimer = () => {
  return (
    <>
    <Box
      sx={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        backgroundColor: '#097779',
        p: 1,
        borderRadius: 1,
      }}
    >
      <Typography
        variant="h5"
        color="white"
        sx={{
          display: 'inline-block',
          animation: 'scroll 15s linear infinite',
        }}
      >
        **Disclaimer:** Gambling is addictive. Play responsibly and at your own risk.
      </Typography>
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </Box>
    </>
  );
};

export default Disclaimer;
