import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Link from '@mui/material/Link';

export default function CheckInternet() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Check your internet service
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please check your internet connection and try again.
        </Typography>
        <Link href="/" variant="body2">
          Back to Login
        </Link>
      </Box>
    </Container>
  );
}
