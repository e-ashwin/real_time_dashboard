const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(cors());

// Serve API
app.get("/data", (req, res) => {
  const data = readCSV();
  res.json(data);
});

// WebSocket Server
const server = app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("✅ WebSocket Connected!");

  let index = 0;
  const data = readCSV();

  const sendUpdates = () => {
    const updateInterval = setInterval(() => {
      if (index < data.length) {
        console.log("📡 Sending Full Data Entry:", data[index]); // ✅ Log full entry
        ws.send(JSON.stringify(data[index])); // ✅ Send entire entry
        index++;
      } else {
        index = 0; // ✅ Restart dataset when all data points are sent
      }
    }, 2000);

    ws.on("close", () => {
      clearInterval(updateInterval);
      console.log("⚠️ WebSocket Disconnected");
    });
  };

  sendUpdates();
});

// Read CSV Function
const readCSV = () => {
  const filePath = path.join(__dirname, "Hackathon_RealTime_Data.csv");
  if (!fs.existsSync(filePath)) return [];

  const content = fs.readFileSync(filePath, "utf-8");
  const rows = content.trim().split("\n").slice(1); // Skip header

  return rows.map((row) => {
    const [date, time, lat, lon, alt, pm25, pm10, temp, pressure, humidity, wind] = row.split(",");
    return { date, time, lat, lon, alt, pm25, pm10, temp, pressure, humidity, wind };
  });
};
