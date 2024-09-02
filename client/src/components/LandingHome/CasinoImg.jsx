import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// Define the background style
const Background = styled('div')(({ sx }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -2,
  ...sx, // Allow passing custom styles through sx prop
}));

function CasinoImgLayout(props) {
  const { sxBackground, children } = props;

  return (
    <Container
      sx={{
        mt: 3,
        mb: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Ensure center alignment
        minHeight: '100vh', // Make sure it covers the full viewport height
        position: 'relative', // Relative positioning for overlay handling
        textAlign: 'center', // Center the text content
      }}
    >
      {children}

      {/* Overlay with slight opacity */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'common.black',
          opacity: 0.5,
          zIndex: -1,
        }}
      />

      {/* Background component with dynamic styling */}
      <Background sx={sxBackground} />
    </Container>
  );
}

CasinoImgLayout.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default CasinoImgLayout;
