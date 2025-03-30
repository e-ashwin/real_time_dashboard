import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const getAQIText = (pm25) => {
  if (pm25 < 50) return "Good";
  if (pm25 < 100) return "Moderate";
  return "Unhealthy";
};

const LiveMap = ({ lat, lon, pm25, temp, humidity, wind }) => {
  const mapUrl = `https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${lon},${lat}&z=10&l=map&size=650,400`;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "800px",
        height: "400px",
        margin: "auto",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "2px 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      {/* ✅ Static Map (No Overlay) */}
      <img src={mapUrl} alt="Static Map" style={{ width: "100%", height: "100%", objectFit: "cover" }} />


      {/* ✅ Additional Data Overlays */}
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 2,
          bgcolor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: "8px",
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="body2">🌡 Temp: {temp}°C</Typography>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Typography variant="body2">💧 Humidity: {humidity}%</Typography>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Typography variant="body2">💨 Wind: {wind} km/h</Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default LiveMap;
