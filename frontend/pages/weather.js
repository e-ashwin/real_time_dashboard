import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography, Paper } from "@mui/material";

const WeatherPage = () => {
  const [data, setData] = useState([]);

  // Simulate fetching real-time weather data
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => [
        ...prevData.slice(-19), // Keep last 19 points
        {
          time: new Date().toLocaleTimeString(),
          temperature: Math.random() * 15 + 20, // Random temp between 20-35°C
          humidity: Math.random() * 40 + 30, // Random humidity 30-70%
          wind: Math.random() * 10 + 2, // Wind speed 2-12 m/s
          pm25: Math.random() * 120, // PM2.5 between 0-120 µg/m³
        },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Live Weather Data</Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#0088FE" name="Humidity (%)" />
            <Line type="monotone" dataKey="wind" stroke="#00C49F" name="Wind Speed (m/s)" />
            <Line type="monotone" dataKey="pm25" stroke="#FF4444" name="PM2.5 (µg/m³)" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default WeatherPage;
