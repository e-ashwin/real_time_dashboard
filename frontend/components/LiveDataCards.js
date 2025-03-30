import React, { useEffect, useState } from "react";
import { Card, Typography, Grid, CircularProgress } from "@mui/material";

const LiveDataCards = ({ data }) => {
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    if (data.lat && data.lon) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.lat}&lon=${data.lon}`)
        .then((res) => res.json())
        .then((geoData) => {
          if (geoData && geoData.display_name) {
            setLocation(geoData.display_name);
          } else {
            setLocation("Location not found");
          }
        })
        .catch(() => setLocation("Failed to fetch location"));
    }
  }, [data.lat, data.lon]);

  if (!data || Object.keys(data).length === 0) {
    return <Typography variant="h6" color="error">⚠️ No Data Available</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {/* ✅ Location Card */}
      <Grid item xs={12}>
        <Card sx={{ textAlign: "center", p: 2, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" color="textSecondary">Location</Typography>
          <Typography variant="h5" color="primary">
            {location || <CircularProgress size={20} />}
          </Typography>
        </Card>
      </Grid>

      {/* ✅ PM2.5 Card */}
      <Grid item xs={12} md={3}>
        <Card sx={{ textAlign: "center", p: 2, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" color="textSecondary">PM2.5</Typography>
          <Typography variant="h4" color="primary">{data.pm25 || "N/A"} µg/m³</Typography>
        </Card>
      </Grid>

      {/* ✅ Temperature Card */}
      <Grid item xs={12} md={3}>
        <Card sx={{ textAlign: "center", p: 2, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" color="textSecondary">Temperature</Typography>
          <Typography variant="h4" color="secondary">{data.temp || "N/A"} °C</Typography>
        </Card>
      </Grid>

      {/* ✅ Humidity Card */}
      <Grid item xs={12} md={3}>
        <Card sx={{ textAlign: "center", p: 2, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" color="textSecondary">Humidity</Typography>
          <Typography variant="h4" color="green">{data.humidity || "N/A"} %</Typography>
        </Card>
      </Grid>

      {/* ✅ Wind Speed Card */}
      <Grid item xs={12} md={3}>
        <Card sx={{ textAlign: "center", p: 2, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" color="textSecondary">Wind Speed</Typography>
          <Typography variant="h4" color="blue">{data.wind || "N/A"} km/h</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LiveDataCards;
