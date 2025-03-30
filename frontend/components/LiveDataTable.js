import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, Stack } from "@mui/material";

const LiveDataTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography variant="h6" color="error" sx={{ textAlign: "center", mt: 2 }}>⚠️ No Data Available</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {/* ✅ Title with Buttons */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
            Historical Data
          </Typography>
          
          {/* ✅ Styled Buttons
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>Export CSV</Button>
            <Button variant="outlined" color="secondary" sx={{ borderRadius: 2 }}>Refresh Data</Button>
          </Stack> */}
        </Stack>

        {/* ✅ Table with Styled Header */}
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Time</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>PM2.5 (µg/m³)</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Temperature (°C)</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Humidity (%)</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Wind Speed (km/h)</TableCell>
              </TableRow>
            </TableHead>

            {/* ✅ Table Body with Striped Rows */}
            <TableBody>
              {data.slice(-10).map((row, index) => (
                <TableRow key={index} sx={{ "&:nth-of-type(odd)": { bgcolor: "#f4f6f8" }, "&:hover": { bgcolor: "#e0f7fa" } }}>
                  <TableCell>{row.time || "N/A"}</TableCell>
                  <TableCell>{row.pm25 || "N/A"}</TableCell>
                  <TableCell>{row.temp || "N/A"}</TableCell>
                  <TableCell>{row.humidity || "N/A"}</TableCell>
                  <TableCell>{row.wind || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default LiveDataTable;
