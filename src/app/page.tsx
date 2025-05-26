'use client';

import { Container, Typography, Button, Box } from '@mui/material';
import Header from '@/components/header/header';

export default function Home() {
  return (
      <>
          <Header />
    <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Main page
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary">
            START
          </Button>
        </Box>
      </Container>
      </>
  );
}
