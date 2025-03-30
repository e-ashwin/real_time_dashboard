import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import * as d3 from "d3-ease";

// Animate map movements
const MapAutoZoom = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (data.length > 0) {
      const bounds = data.map((d) => [d.lat, d.lon]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
    }
  }, [data, map]);

  return null;
};

const WindHumidityMap = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    ws.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);

        const lat = parseFloat(newData.lat);
        const lon = parseFloat(newData.lon);
        const humidity = parseFloat(newData.humidity);
        const wind = parseFloat(newData.wind);
        const pm25 = parseFloat(newData.pm25);
        const temp = parseFloat(newData.temp);

        if (isNaN(lat) || isNaN(lon)) return;

        setSensorData((prev) => [
          ...prev.slice(-100), // Keep last 100 data points
          { lat, lon, humidity, wind, pm25, temp },
        ]);
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <MapContainer
      center={[20.5937, 78.9629]} // India-centered
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

      <MapAutoZoom data={sensorData} />

      {sensorData.map((data, index) => (
        <motion.div
          key={index}
          animate={{ scale: [0.5, 1, 0.5], opacity: [0.8, 1, 0.8] }} // Smooth transitions
          transition={{ duration: 2, ease: d3.easeCubic, repeat: Infinity }}
        >
          {/* Wind Layer (Blue) */}
          <CircleMarker
            center={[data.lat, data.lon]}
            radius={data.wind * 0.4}
            color="blue"
            fillOpacity={0.6}
            weight={1}
          >
            <Popup>💨 Wind: {data.wind} km/h</Popup>
          </CircleMarker>

          {/* Humidity Layer (Green) */}
          <CircleMarker
            center={[data.lat, data.lon]}
            radius={data.humidity * 0.3}
            color="green"
            fillOpacity={0.5}
            weight={1}
          >
            <Popup>💧 Humidity: {data.humidity}%</Popup>
          </CircleMarker>

          {/* PM 2.5 Layer (Red) */}
          <CircleMarker
            center={[data.lat, data.lon]}
            radius={data.pm25 * 0.2}
            color="red"
            fillOpacity={0.4}
            weight={1}
          >
            <Popup>🌫️ PM 2.5: {data.pm25}</Popup>
          </CircleMarker>

          {/* Temperature Layer (Orange) */}
          <CircleMarker
            center={[data.lat, data.lon]}
            radius={data.temp * 0.3}
            color="orange"
            fillOpacity={0.5}
            weight={1}
          >
            <Popup>🌡️ Temp: {data.temp}°C</Popup>
          </CircleMarker>
        </motion.div>
      ))}
    </MapContainer>
  );
};

export default WindHumidityMap;
