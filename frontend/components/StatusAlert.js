import { Alert } from "@mui/material";

const StatusAlert = ({ pm25 }) => {
  if (pm25 > 100) {
    return <Alert severity="error">⚠️ High Pollution Level! PM2.5: {pm25} µg/m³</Alert>;
  } else if (pm25 > 50) {
    return <Alert severity="warning">⚠️ Moderate Pollution! PM2.5: {pm25} µg/m³</Alert>;
  }
  return <Alert severity="success">✅ Air Quality is Good!</Alert>;
};


export default StatusAlert;