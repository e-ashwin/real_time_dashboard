import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  Typography,
  LinearProgress,
  Tabs,
  Tab,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  Chip,
  useTheme,
  Alert
} from "@mui/material";
import {
  CheckCircle as GoodIcon,
  Warning as ModerateIcon,
  Error as UnhealthyIcon,
  LocalHospital as HospitalIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";

Chart.register(...registerables);

const API_URL = 'https://real-time-dashboard.onrender.com/data';
const WS_URL = 'wss://real-time-dashboard.onrender.com/data';
const MAX_DATA_POINTS = 500;

const AnalyticsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wsError, setWsError] = useState(null);
  const theme = useTheme();

  // Process and validate incoming data
  const processIncomingData = useCallback((rawData) => {
    return rawData.map(item => ({
      ...item,
      timestamp: item.timestamp || new Date().toISOString(),
      pm25: parseFloat(item.pm25) || 0,
      temp: parseFloat(item.temp) || 0,
      humidity: parseFloat(item.humidity) || 0,
      wind: parseFloat(item.wind) || 0
    }));
  }, []);

  useEffect(() => {
    // Initial data load
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(processIncomingData(response.data).slice(-MAX_DATA_POINTS));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // WebSocket connection
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("WebSocket connected");
      setWsError(null);
    };

    socket.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        if (newData?.pm25 !== undefined) {
          setData(prev => {
            const processed = processIncomingData([newData]);
            const updated = [...prev, ...processed].slice(-MAX_DATA_POINTS);
            return updated;
          });
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setWsError("Disconnected from real-time updates. Trying to reconnect...");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setWsError("Disconnected from real-time updates. Refresh page to reconnect.");
    };

    return () => {
      socket.close();
    };
  }, [processIncomingData]);

  const currentData = data.length > 0 ? data[data.length - 1] : null;

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, textAlign: "center" }}>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {wsError && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {wsError}
        </Alert>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            mb: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2rem", md: "2.5rem" }
          }}
        >
          Advanced Air Quality Analytics
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TimeSeriesAnalysis data={data} />
        </Grid>

        <Grid item xs={12} md={4}>
          <HealthImpactAssessment pm25={currentData?.pm25 || 0} />
        </Grid>

        <Grid item xs={12}>
          <ForecastComponent historicalData={data} />
        </Grid>
      </Grid>
    </Container>
  );
};

const TimeSeriesAnalysis = ({ data }) => {
  const [timeRange, setTimeRange] = useState("24h");
  const [parameter, setParameter] = useState("pm25");
  const theme = useTheme();

  const filterDataByTimeRange = useCallback((data, range) => {
    const now = new Date();
    return data.filter(item => {
      const date = new Date(item.timestamp);
      const hoursDiff = (now - date) / (1000 * 60 * 60);
      return range === "24h" ? hoursDiff <= 24 : 
             range === "7d" ? hoursDiff <= 168 : true;
    });
  }, []);

  const groupData = useCallback((filteredData, range) => {
    const groups = {};
    filteredData.forEach(item => {
      const date = new Date(item.timestamp);
      let key;
      if (range === "24h") {
        key = `${String(date.getHours()).padStart(2, '0')}:00`;
      } else if (range === "7d") {
        key = date.toLocaleDateString([], { weekday: "short" });
      } else {
        key = date.toLocaleDateString([], { month: "short", day: "numeric" });
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return groups;
  }, []);

  const chartData = useMemo(() => {
    const filteredData = filterDataByTimeRange(data, timeRange);
    const groupedData = groupData(filteredData, timeRange);
    
    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData).map(group => {
      const validItems = group.filter(item => !isNaN(item[parameter]));
      if (validItems.length === 0) return 0;
      const sum = validItems.reduce((acc, item) => acc + item[parameter], 0);
      return sum / validItems.length;
    });

    return {
      labels,
      datasets: [{
        label: parameter.toUpperCase(),
        data: values,
        borderColor: theme.palette.primary.main,
        backgroundColor: `${theme.palette.primary.main}20`,
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 6
      }]
    };
  }, [data, timeRange, parameter, filterDataByTimeRange, groupData, theme]);

  return (
    <Card sx={{ p: 3, height: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Time Series Analysis</Typography>
        <Box display="flex" gap={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Parameter</InputLabel>
            <Select
              value={parameter}
              onChange={e => setParameter(e.target.value)}
              label="Parameter"
            >
              <MenuItem value="pm25">PM2.5</MenuItem>
              <MenuItem value="temp">Temperature</MenuItem>
              <MenuItem value="humidity">Humidity</MenuItem>
              <MenuItem value="wind">Wind Speed</MenuItem>
            </Select>
          </FormControl>
          <Tabs
            value={timeRange}
            onChange={(e, newValue) => setTimeRange(newValue)}
            size="small"
          >
            <Tab label="24h" value="24h" />
            <Tab label="7d" value="7d" />
            <Tab label="All" value="all" />
          </Tabs>
        </Box>
      </Box>

      <Box sx={{ height: "400px" }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.dataset.label}: ${context.parsed.y.toFixed(2)} ${getUnit(parameter)}`;
                  }
                }
              }
            },
            scales: {
              x: {
                title: { display: true, text: "Time" },
                ticks: {
                  maxRotation: 45,
                  minRotation: 45
                }
              },
              y: {
                title: { display: true, text: getUnit(parameter) },
                min: 0
              }
            }
          }}
        />
      </Box>
    </Card>
  );
};

const ForecastComponent = ({ historicalData }) => {
  const [forecastData, setForecastData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (historicalData?.length > 0) {
      // Use last 6 hours for more accurate short-term forecast
      const recentData = historicalData.slice(-6).map(d => d.pm25).filter(val => !isNaN(val));
      
      if (recentData.length < 2) {
        setForecastData(null);
        return;
      }

      // Calculate weighted moving average
      const weights = [0.1, 0.2, 0.3, 0.4]; // More weight to recent data
      const weightedSum = recentData.slice(-4).reduce((sum, val, i) => 
        sum + (val * (weights[i] || 0.1)), 0);
      const baseValue = weightedSum / Math.min(weights.slice(0, recentData.length).reduce((a, b) => a + b, 0));

      // Calculate trend based on recent changes
      const trend = recentData[recentData.length - 1] - recentData[0];
      
      // Generate forecast with some randomness
      const forecast = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        pm25: Math.max(0, baseValue + (trend * (i / 6)) + (Math.random() * 3 - 1.5))
      }));

      setForecastData(forecast);
    }
  }, [historicalData]);

  if (!forecastData) return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        24-Hour PM2.5 Forecast
      </Typography>
      <LinearProgress />
    </Card>
  );

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        24-Hour PM2.5 Forecast
      </Typography>
      <Box sx={{ height: "400px" }}>
        <Line
          data={{
            labels: forecastData.map(d => d.hour),
            datasets: [
              {
                label: 'Forecasted PM2.5',
                data: forecastData.map(d => d.pm25),
                borderColor: theme.palette.secondary.main,
                backgroundColor: `${theme.palette.secondary.main}20`,
                tension: 0.4,
                fill: true
              },
              {
                label: 'Safety Threshold',
                data: forecastData.map(() => 50),
                borderColor: theme.palette.error.main,
                borderDash: [5, 5],
                borderWidth: 1,
                pointRadius: 0
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              annotation: {
                annotations: {
                  thresholdLine: {
                    type: 'line',
                    yMin: 50,
                    yMax: 50,
                    borderColor: 'red',
                    borderWidth: 1,
                    borderDash: [6, 6]
                  }
                }
              }
            },
            scales: {
              y: {
                title: { display: true, text: 'PM2.5 (µg/m³)' },
                suggestedMin: Math.max(0, Math.min(...forecastData.map(d => d.pm25)) - 5),
                suggestedMax: Math.max(...forecastData.map(d => d.pm25)) + 5
              },
              x: {
                title: { display: true, text: 'Hour' }
              }
            }
          }}
        />
      </Box>
    </Card>
  );
};


const HealthImpactAssessment = ({ pm25 }) => {
  const getAqiCategory = (pm25) => {
    if (pm25 <= 50) return 'Good';
    if (pm25 <= 100) return 'Moderate';
    if (pm25 <= 150) return 'Unhealthy for Sensitive Groups';
    if (pm25 <= 200) return 'Unhealthy';
    if (pm25 <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getRecommendations = (category) => {
    switch(category) {
      case 'Good':
        return ['Ideal air quality', 'No restrictions on outdoor activities'];
      case 'Moderate':
        return [
          'Unusually sensitive people should consider reducing prolonged outdoor exertion',
          'Generally acceptable for most people'
        ];
      case 'Unhealthy for Sensitive Groups':
        return [
          'People with heart or lung disease, older adults, and children should reduce prolonged outdoor exertion',
          'Everyone else should limit prolonged outdoor exertion'
        ];
      case 'Unhealthy':
        return [
          'Everyone should reduce prolonged outdoor exertion',
          'Sensitive groups should avoid outdoor activities'
        ];
      default:
        return [
          'Avoid all outdoor activities',
          'Keep windows and doors closed',
          'Use air purifiers if available'
        ];
    }
  };

  const category = getAqiCategory(pm25);
  const recommendations = getRecommendations(category);

  const getCategoryColor = () => {
    switch(category) {
      case 'Good': return 'success';
      case 'Moderate': return 'warning';
      default: return 'error';
    }
  };

  const getCategoryIcon = () => {
    switch(category) {
      case 'Good': return <GoodIcon color="success" />;
      case 'Moderate': return <ModerateIcon color="warning" />;
      default: return <UnhealthyIcon color="error" />;
    }
  };

  return (
    <Card sx={{ p: 3, height: "100%" }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          Health Impact Assessment
        </Typography>
        <Chip 
          label={`AQI: ${category}`} 
          color={getCategoryColor()} 
          icon={getCategoryIcon()}
          variant="outlined"
        />
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        Current PM2.5: {pm25} µg/m³
      </Typography>

      <List>
        {recommendations.map((rec, index) => (
          <ListItem key={index} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <HospitalIcon color="action" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">{rec}</Typography>
          </ListItem>
        ))}
      </List>

      <Box mt={2}>
        <Typography variant="caption" color="text.secondary">
          Based on EPA Air Quality Index standards
        </Typography>
      </Box>
    </Card>
  );
};

const getUnit = (param) => {
  switch(param) {
    case 'pm25': return 'µg/m³';
    case 'temp': return '°C';
    case 'humidity': return '%';
    case 'wind': return 'km/h';
    default: return '';
  }
};

export default AnalyticsPage;