import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { 
  Container, Grid, Card, Typography, CircularProgress, 
  Button, ButtonGroup, Paper, Box, useTheme, Divider 
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import LiveDataCards from "../components/LiveDataCards";
import StatusAlert from "../components/StatusAlert";
import Link from "next/link";

import dynamic from 'next/dynamic';

// Dynamic import for LiveDataTable (if it contains any browser-specific code)
const LiveDataTable = dynamic(
  () => import('../components/LiveDataTable'),
  { ssr: false }
);

Chart.register(...registerables);

const API_URL = 'https://real-time-dashboard.onrender.com/data';
const WS_URL = 'wss://real-time-dashboard.onrender.com/data';
const MAX_POINTS = 30;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({
    pm25: null,
    temp: null,
    humidity: null,
    wind: null
  });
  const [activeChart, setActiveChart] = useState("pm25");
  const [activeView, setActiveView] = useState("charts");
  const theme = useTheme();

  useEffect(() => {
    // Check if we're on the client side before using WebSocket
    if (typeof window !== 'undefined') {
      axios.get(API_URL)
        .then((response) => {
          const initialData = processData(response.data.slice(-MAX_POINTS));
          setData(initialData);
          updateCharts(initialData);
        });

      const socket = new WebSocket(WS_URL);
      
      socket.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        if (typeof newData === "object" && newData.pm25 !== undefined) {
          setData(prevData => {
            const updatedData = processData([...prevData, newData].slice(-MAX_POINTS));
            updateCharts(updatedData);
            return updatedData;
          });
        }
      };

      return () => socket.close();
    }
  }, []);

  const processData = (rawData) => {
    return rawData.map(item => ({
      ...item,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      pm25: parseFloat(item.pm25),
      temp: parseFloat(item.temp),
      humidity: parseFloat(item.humidity),
      wind: parseFloat(item.wind),
      timestamp: `${item.date} ${item.time}`
    }));
  };

  const updateCharts = (data) => {
    const timestamps = data.map((d) => d.time);
    setChartData({
      pm25: createChartData(timestamps, data.map((d) => d.pm25), "PM2.5 (µg/m³)", "#e63946"),
      temp: createChartData(timestamps, data.map((d) => d.temp), "Temperature (°C)", "#1d3557"),
      humidity: createChartData(timestamps, data.map((d) => d.humidity), "Humidity (%)", "#457b9d"),
      wind: createChartData(timestamps, data.map((d) => d.wind), "Wind Speed (km/h)", "#a8dadc")
    });
  };

  const createChartData = (labels, data, label, color) => ({
    labels,
    datasets: [{ 
      label, 
      data, 
      borderColor: color,
      backgroundColor: `${color}33`,
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 6,
      fill: true
    }],
  });

  const currentData = data.length > 0 ? data[data.length - 1] : null;
  const aqiStatus = currentData?.pm25 > 100 ? "error" : 
                   currentData?.pm25 > 50 ? "warning" : "success";

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            sx={{ 
              mb: 1,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Air Quality Monitoring Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Real-time environmental data visualization
          </Typography>
        </motion.div>
      </Box>

      {/* Current Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <LiveDataCards data={currentData || {}} />
      </motion.div>

      {/* Main Content Area */}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Chart Selection */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ButtonGroup fullWidth>
                {["pm25", "temp", "humidity", "wind"].map((metric) => (
                  <Button
                    key={metric}
                    onClick={() => setActiveChart(metric)}
                    variant={activeChart === metric ? "contained" : "outlined"}
                    color="primary"
                    sx={{ py: 1.5 }}
                  >
                    {chartData[metric]?.datasets[0].label}
                  </Button>
                ))}
              </ButtonGroup>
            </motion.div>
          </Grid>

          {/* Animated Chart */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Card sx={{ 
                p: 3, 
                borderRadius: 3, 
                boxShadow: theme.shadows[2],
                minHeight: "400px",
                border: `1px solid ${theme.palette.divider}`
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChart}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {chartData[activeChart] ? (
                      <Line 
                        data={chartData[activeChart]} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          animation: {
                            duration: 1000,
                            easing: 'easeOutQuart'
                          },
                          plugins: {
                            legend: { display: false },
                            tooltip: {
                              backgroundColor: theme.palette.background.paper,
                              bodyColor: theme.palette.text.primary,
                              titleColor: theme.palette.primary.main,
                              borderColor: theme.palette.divider,
                              borderWidth: 1,
                              padding: 12,
                              boxShadow: theme.shadows[3],
                              cornerRadius: 8
                            }
                          },
                          scales: {
                            y: {
                              grid: { 
                                color: theme.palette.divider,
                                drawBorder: false
                              }
                            },
                            x: {
                              grid: { 
                                color: theme.palette.divider,
                                drawBorder: false
                              }
                            }
                          }
                        }}
                      />
                    ) : (
                      <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}>
                        <CircularProgress />
                      </Box>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Card>
            </motion.div>
          </Grid>

          {/* Data Table */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <LiveDataTable data={data} />
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;