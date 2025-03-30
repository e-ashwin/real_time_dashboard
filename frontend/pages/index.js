import React, { useState, useEffect, useCallback } from "react";
import { 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Chip,
  Box, 
  Divider,
  Grid,
  useTheme,
  Avatar,
  Stack
} from "@mui/material";
import Link from "next/link";
import LiveDataCards from "../components/LiveDataCards";

const API_URL = 'https://real-time-dashboard.onrender.com/data';
const WS_URL = 'wss://real-time-dashboard.onrender.com/data';

// AQI color scale matching aqi.in
const aqiColors = {
  good: '#07A092',       // Teal (Good)
  moderate: '#FFD700',   // Yellow (Moderate)
  unhealthy: '#FF8C00',  // Orange (Unhealthy)
  hazardous: '#8B0000'   // Dark Red (Hazardous)
};

export default function Home() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("New Delhi");
  const [socket, setSocket] = useState(null);
  const theme = useTheme();

  // Get AQI color based on PM2.5 value
  const getAqiColor = (pm25) => {
    const val = parseFloat(pm25);
    if (val <= 50) return aqiColors.good;
    if (val <= 100) return aqiColors.moderate;
    if (val <= 200) return aqiColors.unhealthy;
    return aqiColors.hazardous;
  };

  // Memoized reverse geocoding function
  const getLocationName = useCallback(async (lat, lon) => {
    if (!lat || !lon) return "New Delhi";
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const result = await response.json();
      return result.address?.city || result.address?.town || "New Delhi";
    } catch (error) {
      console.error("Geocoding error:", error);
      return "New Delhi";
    }
  }, []);

  // WebSocket connection management
  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(WS_URL);
      
      ws.onopen = () => {
        console.log("WebSocket connected");
        setSocket(ws);
      };

      ws.onmessage = async (event) => {
        const newData = JSON.parse(event.data);
        setData(prev => ({ ...prev, ...newData }));
        
        if (Math.abs(newData.lat - data.lat) > 0.01 || 
            Math.abs(newData.lon - data.lon) > 0.01) {
          const locationName = await getLocationName(newData.lat, newData.lon);
          setLocation(locationName);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setTimeout(connectWebSocket, 5000);
      };

      return ws;
    };

    const ws = connectWebSocket();

    // Initial data fetch
    const fetchInitialData = async () => {
      try {
        const response = await fetch(API_URL);
        const initialData = await response.json();
        const latestData = initialData[initialData.length - 1];
        setData(latestData);
        const locationName = await getLocationName(latestData.lat, latestData.lon);
        setLocation(locationName);
      } catch (error) {
        console.error("Initial data fetch error:", error);
      }
    };

    fetchInitialData();

    return () => {
      if (ws) ws.close();
    };
  }, [getLocationName]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section - Updated with AQI.in teal theme */}
      <Paper 
        elevation={0}
        sx={{
          p: { xs: 3, md: 6 },
          mb: 6,
          textAlign: "center",
          background: 'linear-gradient(135deg, #07A092 0%, #058377 100%)',
          color: 'white',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(7, 160, 146, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Typography 
          variant="h2" 
          fontWeight={700} 
          gutterBottom
          sx={{
            fontSize: { xs: '2.2rem', md: '3rem' },
            lineHeight: 1.2,
            letterSpacing: '0.5px'
          }}
        >
          Air Quality Monitoring Dashboard
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 4,
            opacity: 0.9,
            fontWeight: 400,
            fontFamily: '"Roboto", sans-serif'
          }}
        >
          Real-time environmental data for {location}
        </Typography>
        
        <Link href="/dashboard" passHref>
          <Button 
            variant="contained" 
            size="large" 
            sx={{
              px: 6,
              py: 1.5,
              fontSize: '1rem',
              borderRadius: 50,
              bgcolor: 'white',
              color: '#07A092',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontWeight: 600
            }}
          >
            View Live Dashboard
          </Button>
        </Link>
      </Paper>

      {/* Current Conditions Section - Updated card styling */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              height: '100%',
              border: `1px solid ${theme.palette.divider}`,
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                bgcolor: data.pm25 ? getAqiColor(data.pm25) : aqiColors.good
              }
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h4" fontWeight={600} sx={{ color: theme.palette.text.primary }}>
                Overview
              </Typography>
              <Chip 
                label={location} 
                size="medium" 
                sx={{ 
                  bgcolor: '#f5f5f5',
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  px: 1.5
                }} 
              />
            </Stack>
            <Divider sx={{ mb: 3 }} />
            <LiveDataCards data={data} aqiColors={aqiColors} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              height: '100%',
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography variant="h4" fontWeight={600} gutterBottom sx={{ mb: 3, color: theme.palette.text.primary }}>
              About This Dashboard
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography paragraph sx={{ mb: 3, color: theme.palette.text.secondary }}>
              This dashboard provides real-time monitoring of key air quality metrics:
            </Typography>
            <Box component="ul" sx={{ 
              pl: 2, 
              mb: 3,
              '& li': {
                mb: 1.5,
                color: theme.palette.text.secondary
              }
            }}>
              <li>PM2.5 and PM10 particulate levels</li>
              <li>Temperature</li>
              <li>Humidity </li>
              <li>Wind speed</li>
              <li>Air Quality Index (AQI) calculations</li>
            </Box>
            <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
              Real time data updates from a server.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Importance Section - Updated with AQI.in style cards */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h3" 
          fontWeight={700} 
          gutterBottom 
          align="center" 
          sx={{ 
            mb: 6,
            color: theme.palette.text.primary,
            position: 'relative',
            '&:after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              bgcolor: '#07A092',
              mx: 'auto',
              mt: 2,
              borderRadius: 2
            }
          }}
        >
          Why Air Quality Matters
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              title: "Health Protection",
              description: "Poor air quality leads to respiratory diseases and cardiovascular problems.",
              icon: "❤️",
              color: "#ef476f"
            },
            {
              title: "Environmental Impact",
              description: "Tracking helps identify pollution sources and their environmental effects.",
              icon: "🌳",
              color: "#06d6a0"
            },
            {
              title: "Public Awareness",
              description: "Real-time data empowers citizens to make informed decisions.",
              icon: "📢",
              color: "#118ab2"
            }
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Avatar sx={{ 
                  bgcolor: item.color, 
                  color: 'white', 
                  width: 56, 
                  height: 56,
                  mb: 3,
                  fontSize: '1.5rem'
                }}>
                  {item.icon}
                </Avatar>
                <Typography variant="h5" fontWeight={600} sx={{ mb: 2, color: theme.palette.text.primary }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
