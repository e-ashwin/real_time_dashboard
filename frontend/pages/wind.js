import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import WindMap from "../components/WindMap";

const WindPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom textAlign="center">
        Wind and Humidity Visualization
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <WindMap />
      </Paper>
    </Container>
  );
};

export default WindPage;
