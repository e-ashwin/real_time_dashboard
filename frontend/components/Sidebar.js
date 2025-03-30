import React, { useState } from "react"; 
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Divider, 
  Box,
  Tooltip,
  Avatar,
  Typography,
  useTheme
} from "@mui/material";
import { 
  Home, 
  Dashboard, 
  Menu, 
  Close,
  Settings,
  Notifications,
  BarChart,
  Map,
  Brightness4,
  Loyalty,
  Brightness7
} from "@mui/icons-material";
import StatusAlert from "./StatusAlert";
import { motion } from "framer-motion";

const Sidebar = ({ toggleDarkMode, darkMode, open, onToggle }) => {
  const [activeItem, setActiveItem] = useState("Dashboard"); 
  const theme = useTheme();


  const navItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Analytics", icon: <BarChart />, path: "/analytics" },
    { text: "Alerts", icon: <Notifications />, path: "/notifications" },
    { text: "Credits", icon: <Loyalty />, path: "/creditsPage" },    

  ];

  const sidebarStyles = {
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(195deg, #1A2038 0%, #1A237E 100%)' 
      : 'linear-gradient(195deg, #1976d2 0%, #2196F3 100%)',
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#ffffff'
  };

  const listItemStyles = {
    '&.Mui-selected': {
      bgcolor: theme.palette.mode === 'dark' 
        ? 'rgba(255,255,255,0.15)' 
        : 'rgba(255,255,255,0.25)',
      '&:hover': {
        bgcolor: theme.palette.mode === 'dark' 
          ? 'rgba(255,255,255,0.2)' 
          : 'rgba(255,255,255,0.3)'
      }
    },
    '&:hover': {
      bgcolor: theme.palette.mode === 'dark' 
        ? 'rgba(255,255,255,0.1)' 
        : 'rgba(255,255,255,0.2)'
    }
  };

  return (
    <>
      <Tooltip title={open ? "Collapse sidebar" : "Expand sidebar"} arrow>
        <IconButton
          onClick={onToggle}
          sx={{ 
            position: "fixed",
            top: 16,
            left: open ? 240 : 16,
            zIndex: 1300,
            color: "white",
            bgcolor: "primary.main",
            "&:hover": { 
              bgcolor: "primary.dark",
              transform: "scale(1.1)"
            },
            transition: "all 0.2s ease",
            boxShadow: 3
          }}
        >
          {open ? <Close /> : <Menu />}
        </IconButton>
      </Tooltip>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 0,
          flexShrink: 0,
          whiteSpace: "nowrap",
          '& .MuiDrawer-paper': {
            width: open ? 240 : 0,
            overflowX: "hidden",
            borderRight: "none",
            ...sidebarStyles,
            transition: "width 0.3s ease, background 0.3s ease",
            boxShadow: "4px 0 20px rgba(0,0,0,0.1)"
          },
        }}
      >
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          height: "100%",
          py: 2
        }}>
          <Box sx={{ 
            px: 3, 
            py: 2,
            display: "flex",
            alignItems: "center",
            gap: 2
          }}>
            <Avatar 
              src="/logo.png" 
              sx={{ 
                width: 40, 
                height: 40,
                bgcolor: "rgba(255,255,255,0.2)"
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
              transition={{ duration: 0.2 }}
            >
              <Typography variant="h6" noWrap>
                Real Time Dashboard
              </Typography>
            </motion.div>
          </Box>

          <Box sx={{ px: 2, mb: 2 }}>
            <StatusAlert pm25={50} />
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 1 }} />

          <List sx={{ flexGrow: 1 }}>
            {navItems.map((item) => (
              <ListItem 
                key={item.text} 
                disablePadding 
                sx={{ 
                  my: 0.5,
                  px: 1
                }}
              >
                <ListItemButton
                  href={item.path}
                  selected={activeItem === item.text}
                  onClick={() => setActiveItem(item.text)}
                  sx={listItemStyles}
                >
                  <Tooltip title={!open ? item.text : ""} placement="right">
                    <ListItemIcon sx={{ 
                      minWidth: 40,
                      color: "inherit"
                    }}>
                      {item.icon}
                    </ListItemIcon>
                  </Tooltip>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ 
                        fontWeight: activeItem === item.text ? 600 : 400 
                      }}
                    />
                  </motion.div>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ px: 2, py: 1 }}>
            <ListItemButton
              onClick={toggleDarkMode}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.1)' 
                    : 'rgba(255,255,255,0.2)'
                }
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </ListItemIcon>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
                transition={{ duration: 0.2 }}
              >
                <ListItemText 
                  primary={theme.palette.mode === 'dark' ? "Light Mode" : "Dark Mode"} 
                />
              </motion.div>
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;