import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Alert, 
  AlertTitle, 
  Divider, 
  Chip,
  CircularProgress,
  useTheme,
  Grid,
  Paper,
  Stack,
  Skeleton
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { format } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AirQualityMonitor = () => {
  const theme = useTheme();
  const [readings, setReadings] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const ws = useRef(null);
  const lastUpdateRef = useRef(Date.now());
  const dataBufferRef = useRef([]);

  // Calculate AQI from PM2.5
  const calculateAQI = (pm25) => {
    const val = parseFloat(pm25);
    if (val <= 12) return { value: Math.round((50/12)*val), level: 'Good', color: '#4CAF50' };
    if (val <= 35.4) return { value: Math.round(50 + (49/(35.4-12))*(val-12)), level: 'Moderate', color: '#FFEB3B' };
    if (val <= 55.4) return { value: Math.round(100 + (49/(55.4-35.4))*(val-35.4)), level: 'Unhealthy for Sensitive', color: '#FF9800' };
    if (val <= 150.4) return { value: Math.round(150 + (99/(150.4-55.4))*(val-55.4)), level: 'Unhealthy', color: '#F44336' };
    if (val <= 250.4) return { value: Math.round(200 + (99/(250.4-150.4))*(val-150.4)), level: 'Very Unhealthy', color: '#9C27B0' };
    return { value: Math.round(300 + (199/(500-250.4))*(val-250.4)), level: 'Hazardous', color: '#673AB7' };
  };

  // Process and update data every 10 seconds
  const processDataBuffer = useMemo(() => {
    return () => {
      if (dataBufferRef.current.length > 0) {
        const newData = dataBufferRef.current[dataBufferRef.current.length - 1];
        const aqi = calculateAQI(newData.pm25);
        
        setCurrentData({
          ...newData,
          aqi,
          timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        });

        setReadings(prev => {
          const updated = [...prev, {
            ...newData,
            aqi,
            timestamp: format(new Date(), 'HH:mm:ss')
          }];
          return updated.slice(-30); // Keep last 30 readings
        });

        dataBufferRef.current = [];
        lastUpdateRef.current = Date.now();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(processDataBuffer, 5000); // 10-second updates
    return () => clearInterval(interval);
  }, [processDataBuffer]);

  useEffect(() => {
    // Connect to WebSocket
    ws.current = new WebSocket('ws://localhost:8000');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setConnectionStatus('connected');
      setLoading(false);
    };

    ws.current.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      dataBufferRef.current.push(newData); // Buffer incoming data
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('error');
      setLoading(false);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setConnectionStatus('disconnected');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Chart data configuration
  const chartData = useMemo(() => ({
    labels: readings.map(r => r.time),
    datasets: [
      {
        label: 'PM2.5 (µg/m³)',
        data: readings.map(r => r.pm25),
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(63, 81, 181, 0.1)',
        tension: 0.3,
        fill: true,
        yAxisID: 'y',
        borderWidth: 2,
        pointRadius: 3
      },
      {
        label: 'Temperature (°C)',
        data: readings.map(r => r.temp),
        borderColor: theme.palette.secondary.main,
        backgroundColor: 'rgba(245, 0, 87, 0.1)',
        tension: 0.3,
        yAxisID: 'y1',
        borderWidth: 2,
        pointRadius: 3
      }
    ]
  }), [readings, theme]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'PM2.5 (µg/m³)',
          color: theme.palette.text.secondary
        },
        grid: {
          color: theme.palette.divider
        },
        ticks: {
          color: theme.palette.text.secondary
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: theme.palette.text.secondary
        },
        ticks: {
          color: theme.palette.text.secondary
        }
      },
      x: {
        grid: {
          color: theme.palette.divider
        },
        ticks: {
          color: theme.palette.text.secondary
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.palette.text.primary,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}`;
          }
        }
      }
    }
  }), [theme]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>Connecting to real-time data...</Typography>
      </Box>
    );
  }

  if (connectionStatus === 'error') {
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        Failed to connect to the real-time data server. Please try again later.
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 700,
        mb: 4,
        color: theme.palette.text.primary
      }}>
        Real Time Air Quality Alert
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: theme.shadows[2],
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2
          }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Current Conditions
                </Typography>
                <Chip 
                  label={`Updated every 5s`} 
                  size="small" 
                  color="primary"
                  variant="outlined"
                />
              </Stack>
              <Divider sx={{ mb: 3 }} />
              
              {currentData ? (
                <>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: theme.palette.background.default
                  }}>
                    <Box sx={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: '50%', 
                      backgroundColor: currentData.aqi.color,
                      mr: 2
                    }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {currentData.aqi.level} (AQI: {currentData.aqi.value})
                    </Typography>
                  </Box>

                  {currentData.aqi.value > 100 && (
                    <Alert severity="warning" sx={{ mb: 3 }}>
                      <AlertTitle>Air Quality Alert</AlertTitle>
                      The current air quality is {currentData.aqi.level.toLowerCase()}. 
                      {currentData.aqi.value > 150 ? ' Consider limiting outdoor activities.' : ''}
                    </Alert>
                  )}

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={4}>
                      <MetricCard 
                        title="PM2.5" 
                        value={`${currentData.pm25} µg/m³`} 
                        color={theme.palette.primary.main}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MetricCard 
                        title="PM10" 
                        value={`${currentData.pm10} µg/m³`} 
                        color={theme.palette.secondary.main}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MetricCard 
                        title="Temperature" 
                        value={`${currentData.temp} °C`} 
                        color={theme.palette.error.main}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MetricCard 
                        title="Humidity" 
                        value={`${currentData.humidity}%`} 
                        color={theme.palette.info.main}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MetricCard 
                        title="Pressure" 
                        value={`${currentData.pressure} hPa`} 
                        color={theme.palette.warning.main}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <MetricCard 
                        title="Wind Speed" 
                        value={`${currentData.wind} km/h`} 
                        color={theme.palette.success.main}
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="caption" display="block" sx={{ 
                    mt: 2, 
                    color: 'text.secondary',
                    textAlign: 'right'
                  }}>
                    Last updated: {currentData.timestamp}
                  </Typography>
                </>
              ) : (
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: theme.shadows[2],
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Real-time Trends
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ height: 400 }}>
                <Line data={chartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
{/* 
      <Card sx={{ 
        boxShadow: theme.shadows[2],
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        height: "100%"
      }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Historical Data (Last 30 Readings)
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ height: 400 }}>
            <Line 
              data={{
                labels: readings.map(r => r.time),
                datasets: [
                  {
                    label: 'PM2.5',
                    data: readings.map(r => r.pm25),
                    borderColor: theme.palette.primary.main,
                    backgroundColor: 'rgba(63, 81, 181, 0.1)',
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 2
                  },
                  {
                    label: 'Temperature',
                    data: readings.map(r => r.temp),
                    borderColor: theme.palette.secondary.main,
                    backgroundColor: 'rgba(245, 0, 87, 0.1)',
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 2
                  },
                  {
                    label: 'Humidity',
                    data: readings.map(r => r.humidity),
                    borderColor: theme.palette.info.main,
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 2
                  }
                ]
              }} 
              options={chartOptions}
            />
          </Box>
        </CardContent>
      </Card> */}
    </Box>
  );
};

const MetricCard = ({ title, value, color }) => {
  return (
    <Paper sx={{ 
      p: 2,
      borderRadius: 1,
      height: '100%',
      borderLeft: `4px solid ${color}`
    }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Paper>
  );
};

export default AirQualityMonitor;